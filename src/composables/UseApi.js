import useSupabase from "src/boot/supabase";
import useAuth from "./UseAuth";
import { v4 as uuid } from "uuid";

export default function useApi() {
  const { supabase } = useSupabase();
  const { user } = useAuth();

  const get = async (table) => {
    const { data, error } = await supabase.from(table).select("*");

    if (error) {
      throw error;
    }

    return data;
  };

  const getPublic = async (userId, table) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return data;
  };

  const getById = async (id, table) => {
    const { data, error } = await supabase.from(table).select("*").eq("id", id);

    if (error) {
      throw error;
    }

    return data[0];
  };

  const create = async (table, data) => {
    const { error } = await supabase
      .from(table)
      .insert({ ...data, user_id: user.value.id });

    if (error) {
      throw error;
    }
  };

  const update = async (id, table, data) => {
    const { error } = await supabase.from(table).update(data).match({ id });

    if (error) {
      throw error;
    }
  };

  const remove = async (id, table) => {
    const { error } = await supabase.from(table).delete().match({ id });

    if (error) {
      throw error;
    }
  };

  const uploadImage = async (file, storage) => {
    const fileName = uuid();
    const { data, error } = await supabase.storage
      .from(storage)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });
    const publicUrl = await getUrlPublic(fileName, storage);
    if (error) throw error;
    return publicUrl;
  };

  const getUrlPublic = async (fileName, storage) => {
    const { data, error } = supabase.storage
      .from(storage)
      .getPublicUrl(fileName);
    if (error) throw error;
    return data.publicUrl;
  };

  return {
    get,
    getPublic,
    getById,
    create,
    update,
    remove,
    uploadImage,
  };
}
