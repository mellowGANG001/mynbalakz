import { createClient } from "@/lib/supabase/client";

// Backward-compatible shared browser client.
export const supabase = createClient();
