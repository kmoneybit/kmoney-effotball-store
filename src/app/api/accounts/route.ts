import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createAccount,
  deleteAccount,
  readAccounts,
  updateAccount,
  type StoreAccount,
} from "@/lib/accounts";

async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("kmoney-admin-session")?.value === "authenticated";
}

export async function GET() {
  const accounts = await readAccounts();
  return NextResponse.json(accounts);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const createdAccount = await createAccount({
    id: Number(body.id ?? Date.now()),
    title: String(body.title ?? "New Account").trim(),
    status: body.status === "Sold" ? "Sold" : "Active",
    category: String(body.category ?? "Premium"),
    price: String(body.price ?? "0k"),
    added: body.added ?? new Date().toISOString().split("T")[0],
    imageDataUrl: body.imageDataUrl ?? "",
  } satisfies Partial<StoreAccount>);

  const nextAccounts = await readAccounts();
  return NextResponse.json(nextAccounts);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const id = Number(body.id);

  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const updatedAccount = await updateAccount(id, {
    title: String(body.title ?? "Untitled account"),
    status: body.status === "Sold" ? "Sold" : "Active",
    category: String(body.category ?? "Premium"),
    price: String(body.price ?? "0k"),
    imageDataUrl: body.imageDataUrl ?? "",
  });

  const nextAccounts = await readAccounts();
  return NextResponse.json(nextAccounts);
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await deleteAccount(id);
  const nextAccounts = await readAccounts();
  return NextResponse.json(nextAccounts);
}
