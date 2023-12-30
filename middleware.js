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
}
export const config = {
  matcher: ["/", "/feed", "/feed/:path*", "/my-posts", "/search"],
};
