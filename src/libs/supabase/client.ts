import { createClient } from "@supabase/supabase-js";

import { Database } from "../../types/db";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
  throw new Error('Please check your env of supabase');
}

export const supabaseClient = createClient<Database>(supabaseUrl, anonKey);
