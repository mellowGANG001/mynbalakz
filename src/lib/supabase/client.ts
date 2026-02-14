import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-key";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createClient(): ReturnType<typeof createBrowserClient<any>> {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
