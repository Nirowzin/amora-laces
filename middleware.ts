import { NextRequest, NextResponse } from "next/server";

const ADMIN_SECRET_PATH = process.env.NEXT_PUBLIC_ADMIN_SECRET_PATH ?? "atelier-amora-privado";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${ADMIN_SECRET_PATH}`) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.rewrite(url);
  }

  if (pathname === "/admin") {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
