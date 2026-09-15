export interface PublicRuntimeConfig {
  apiUrl: string;
  supabaseUrl: string;
  supabasePublishableKey: string;
}

export function getPublicRuntimeConfig(): PublicRuntimeConfig {
  return {
    apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    supabasePublishableKey:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      ""
  };
}

export function hasSupabaseConfig(config = getPublicRuntimeConfig()): boolean {
  return Boolean(config.supabaseUrl && config.supabasePublishableKey);
}
