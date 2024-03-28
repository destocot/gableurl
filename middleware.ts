import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(
    new URL(`/preview/${request.nextUrl.pathname}`, request.nextUrl)
  );
}

export const config = {
  matcher: "/:hash([^/]+)",
};
