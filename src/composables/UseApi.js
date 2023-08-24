import useSupabase from "src/boot/supabase";
import useAuth from "./UseAuth";

export default function useApi() {
  const supabase = useSupabase();
  const { user } = useAuth();

  const get = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("user_id", user.value.id);

    if (error) {
      throw error;
    }

    return data;
  };

  const getById = async ({ table, id }) => {
    const { data, error } = await supabase.from(table).select("*").eq("id", id);

    if (error) {
      throw error;
    }

    return data[0];
  };

  const create = async ({ table, data }) => {
    const { error } = await supabase
      .from(table)
      .insert({ ...data, user_id: user.value.id });

    if (error) {
      throw error;
    }
  };

  const update = async ({ table, data, id }) => {
    const { error } = await supabase.from(table).update(data).match({ id });

    if (error) {
      throw error;
    }
  };

  const remove = async ({ table, id }) => {
    const { error } = await supabase.from(table).delete().match({ id });

    if (error) {
      throw error;
    }
  };

  return {
    get,
    getById,
    create,
    update,
    remove,
  };
}
