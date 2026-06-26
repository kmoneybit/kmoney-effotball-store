import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "kmoney-admin";

function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
    },
  });
}

function verifyAuth(header: string | null) {
  if (!header?.startsWith("Basic ")) return false;

  try {
    const token = header.slice(6);
    const decoded = atob(token);
    const [, password] = decoded.split(":");
    return password === ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const authHeader = req.headers.get("authorization");
    if (!verifyAuth(authHeader)) {
      return unauthorized();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
