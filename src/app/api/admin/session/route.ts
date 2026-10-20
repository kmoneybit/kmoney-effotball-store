import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const isAuthenticated =
    cookieStore.get("kmoney-admin-session")?.value === "authenticated";

  if (!isAuthenticated) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
