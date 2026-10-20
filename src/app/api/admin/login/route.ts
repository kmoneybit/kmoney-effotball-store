import { NextResponse } from "next/server";

const ADMIN_ACCESS_ENV_KEYS = [
  "ADMIN_ACCESS_CODE",
  "NEXT_PUBLIC_ADMIN_ACCESS_CODE",
];

function getConfiguredAdminCode() {
  for (const key of ADMIN_ACCESS_ENV_KEYS) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return "";
}

export async function POST(request: Request) {
  const { code } = await request.json().catch(() => ({ code: "" }));
  const expectedCode = getConfiguredAdminCode();

  if (!expectedCode) {
    return NextResponse.json(
      { error: "Admin code is not configured." },
      { status: 500 },
    );
  }

  if (String(code).trim() !== expectedCode) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("kmoney-admin-session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
