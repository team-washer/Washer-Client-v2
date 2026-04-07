import { type NextRequest, NextResponse } from "next/server";
import { COOKIE_KEYS } from "@/shared";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const tokenResponse = await fetch(`${baseUrl}/api/v2/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authCode: code }),
    });

    if (!tokenResponse.ok) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const tokenData = await tokenResponse.json();

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;

    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const targetPath = "/";
    const redirectUrl = new URL(targetPath, request.url);
    const response = NextResponse.redirect(redirectUrl);

    // 쿠키 설정
    response.cookies.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1시간
    });

    response.cookies.set(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30일
    });

    return response;
  } catch (error) {
    console.error("Error in callback route:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
