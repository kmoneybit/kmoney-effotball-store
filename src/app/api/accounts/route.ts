import { NextResponse } from "next/server";
import { readAccounts, type StoreAccount, writeAccounts } from "@/lib/accounts";

export async function GET() {
  const accounts = await readAccounts();
  return NextResponse.json(accounts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const current = await readAccounts();

  const nextAccount: StoreAccount = {
    id: Number(body.id ?? Date.now()),
    title: String(body.title ?? "New Account").trim(),
    status: body.status === "Sold" ? "Sold" : "Active",
    category: String(body.category ?? "Premium"),
    price: String(body.price ?? "0k"),
    added: body.added ?? new Date().toISOString().split("T")[0],
    imageDataUrl: body.imageDataUrl ?? "",
  };

  const nextAccounts: StoreAccount[] = [nextAccount, ...current];
  await writeAccounts(nextAccounts);

  return NextResponse.json(nextAccounts);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const current = await readAccounts();

  const updated: StoreAccount[] = current.map((account) =>
    account.id === Number(body.id)
      ? {
          ...account,
          title: String(body.title ?? account.title),
          status: body.status === "Sold" ? "Sold" : "Active",
          category: String(body.category ?? account.category),
          price: String(body.price ?? account.price),
          imageDataUrl: body.imageDataUrl ?? account.imageDataUrl,
        }
      : account,
  );

  await writeAccounts(updated);
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const current = await readAccounts();
  const nextAccounts = current.filter((account) => account.id !== id);
  await writeAccounts(nextAccounts);

  return NextResponse.json(nextAccounts);
}
