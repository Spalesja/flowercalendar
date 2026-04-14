import { NextRequest, NextResponse } from "next/server";
import { searchPlantSuggestions } from "@/server/repositories";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";

  if (query.length < 1) {
    return NextResponse.json([]);
  }

  const plants = searchPlantSuggestions(query);
  return NextResponse.json(plants);
}
