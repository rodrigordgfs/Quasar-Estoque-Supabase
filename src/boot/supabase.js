import { createClient } from "@supabase/supabase-js";
import userAuth from "src/composables/UseAuth";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = userAuth();

  user.value = session?.user ?? null;
});

export default function useSupabase() {
  return { supabase };
}
