export interface PublicRuntimeConfig {
  apiUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export function getPublicRuntimeConfig(): PublicRuntimeConfig {
  return {
    apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  };
}

export function hasSupabaseConfig(config = getPublicRuntimeConfig()): boolean {
  return Boolean(config.supabaseUrl && config.supabaseAnonKey);
}
