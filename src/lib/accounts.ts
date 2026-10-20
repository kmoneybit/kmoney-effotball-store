import {
  createSupabaseServerClient,
  normalizeAccount,
  type StoreAccount,
} from "@/lib/supabase";

export type { StoreAccount } from "@/lib/supabase";

export const defaultAccounts: StoreAccount[] = [];

const TABLE_NAME = "accounts";

export async function readAccounts(): Promise<StoreAccount[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("readAccounts error:", error.message);
    return [];
  }

  return Array.isArray(data) ? data.map((row) => normalizeAccount(row)) : [];
}

export async function createAccount(input: Partial<StoreAccount>) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const payload: StoreAccount = {
    id: Number(input.id ?? Date.now()),
    title: String(input.title ?? "New Account").trim(),
    status: input.status === "Sold" ? "Sold" : "Active",
    category: String(input.category ?? "Premium"),
    price: String(input.price ?? "0k"),
    added: input.added ?? new Date().toISOString().split("T")[0],
    imageDataUrl: input.imageDataUrl ?? "",
  };

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeAccount(data ?? payload);
}

export async function updateAccount(id: number, input: Partial<StoreAccount>) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({
      title: String(input.title ?? "Untitled account"),
      status: input.status === "Sold" ? "Sold" : "Active",
      category: String(input.category ?? "Premium"),
      price: String(input.price ?? "0k"),
      imageDataUrl: input.imageDataUrl ?? "",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeAccount(data);
}

export async function deleteAccount(id: number) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export async function writeAccounts(nextAccounts: StoreAccount[]) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return;
  }

  const { error: clearError } = await supabase
    .from(TABLE_NAME)
    .delete()
    .neq("id", 0);

  if (clearError) {
    throw new Error(clearError.message);
  }

  if (nextAccounts.length === 0) {
    return;
  }

  const { error } = await supabase.from(TABLE_NAME).insert(
    nextAccounts.map((account) => ({
      id: account.id,
      title: account.title,
      status: account.status,
      category: account.category,
      price: account.price,
      added: account.added,
      imageDataUrl: account.imageDataUrl ?? "",
    })),
  );

  if (error) {
    throw new Error(error.message);
  }
}
