import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/app/utils/auth";
import { jwtDecrypt } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  //
  //
  const verifiedToken =
    token && (await verifyJwtToken(token).catch((err) => {}));

  if (!verifiedToken) {
    if (req.nextUrl.pathname !== "/")
      return NextResponse.redirect(new URL("/", req.url));
  } else if (req.nextUrl.pathname == "/") {
    return NextResponse.redirect(new URL("/feed", req.url));
  }

  // let cookie = req.cookies.get("token");
  //

  // // Setting cookies on the response using the `ResponseCookies` API
  // const response = NextResponse.next();

  // response.cookies.set("decode", "decode");

  //
  // // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.

  // return response;
}
export const config = {
  matcher: ["/", "/feed", "/feed/:path*", "/my-posts"],
};
