import { getPublicRuntimeConfig, hasSupabaseConfig } from "@adnelyq/config";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const config = getPublicRuntimeConfig();
  if (!hasSupabaseConfig(config)) return null;
  return createBrowserClient(config.supabaseUrl, config.supabasePublishableKey);
}
