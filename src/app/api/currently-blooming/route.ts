import { NextRequest, NextResponse } from "next/server";
import { getCurrentlyBloomingByCity } from "@/server/repositories";

export async function GET(request: NextRequest) {
  const citySlug = request.nextUrl.searchParams.get("city") ?? "minsk";
  const currentDate =
    request.nextUrl.searchParams.get("date") ??
    new Date().toISOString().split("T")[0];

  const results = getCurrentlyBloomingByCity(citySlug, currentDate);
  return NextResponse.json(results);
}
