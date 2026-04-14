import { NextRequest, NextResponse } from "next/server";
import { searchCitySuggestions } from "@/server/repositories";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";

  if (query.length < 1) {
    return NextResponse.json([]);
  }

  const cities = searchCitySuggestions(query);
  return NextResponse.json(cities);
}
