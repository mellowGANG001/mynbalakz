import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Static export: middleware is not used, pass through
  return NextResponse.next({ request });
}
