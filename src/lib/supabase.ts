import { createClient } from "@supabase/supabase-js";

export type StoreAccount = {
  id: number;
  title: string;
  status: "Active" | "Sold";
  category: string;
  price: string;
  added: string;
  imageDataUrl?: string;
};

const getEnv = (key: string) => process.env[key]?.trim() ?? "";

export function getSupabaseUrl() {
  return getEnv("NEXT_PUBLIC_SUPABASE_URL") || getEnv("SUPABASE_URL");
}

export function getSupabaseAnonKey() {
  return (
    getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") || getEnv("SUPABASE_ANON_KEY")
  );
}

export function getSupabaseServiceRoleKey() {
  return getEnv("SUPABASE_SERVICE_ROLE_KEY");
}

export function createSupabaseServerClient() {
  const url = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export function createSupabasePublicClient() {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export function normalizeAccount(row: Record<string, unknown>): StoreAccount {
  const id = Number(row.id ?? 0);

  return {
    id: Number.isFinite(id) ? id : 0,
    title: String(row.title ?? "Untitled account"),
    status: row.status === "Sold" ? "Sold" : "Active",
    category: String(row.category ?? "Premium"),
    price: String(row.price ?? "0k"),
    added: String(row.added ?? new Date().toISOString().split("T")[0]),
    imageDataUrl:
      typeof row.imageDataUrl === "string" ? row.imageDataUrl : "",
  };
}
