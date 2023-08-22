import { createClient } from "@supabase/supabase-js";
import userAuth from "src/composables/UseAuth";

const supabaseUrl = "https://jgdlxyxkvlmmvzabfhoe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZGx4eXhrdmxtbXZ6YWJmaG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2NjE2NjQsImV4cCI6MjAwODIzNzY2NH0.yiOfivh9SaaiyLHNCLnW_IuKDRsdw_3u2J8euT4Sw5o";
const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = userAuth();

  user.value = session?.user ?? null;
});

export default function useSupabase() {
  return { supabase };
}
