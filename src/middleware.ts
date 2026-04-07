import { type NextRequest, NextResponse } from "next/server";
import { COOKIE_KEYS } from "@/shared/constants/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;

  if (pathname.startsWith("/api/") || pathname === "/sign-in") {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
