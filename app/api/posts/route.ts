import { NextResponse } from "next/server";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = Number(searchParams.get("start") ?? 0);
  const requestedLimit = Number(searchParams.get("limit") ?? 5);

  const safeStart = Number.isInteger(start) && start >= 0 ? start : 0;
  const safeLimit = Number.isInteger(requestedLimit)
    ? Math.min(Math.max(requestedLimit, 1), 10)
    : 5;

  try {
    const posts = await getPosts(safeStart, safeLimit);
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json(
      { error: "The posts service is temporarily unavailable. Please try again." },
      { status: 503, headers: { "Retry-After": "5" } },
    );
  }
}
