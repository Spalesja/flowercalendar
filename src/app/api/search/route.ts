import { NextResponse } from "next/server";
import {
  searchPlantsByCity,
  searchCitiesByPlant,
} from "@/server/repositories";
import type { SearchMode, SearchResult } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") as SearchMode | null;
  const slug = searchParams.get("slug");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!mode || (mode !== "cities" && mode !== "plants")) {
    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  }
  if (!slug || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing slug, startDate or endDate" },
      { status: 400 }
    );
  }

  const result: SearchResult =
    mode === "cities"
      ? { mode: "plants", items: searchPlantsByCity(slug, startDate, endDate) }
      : { mode: "cities", items: searchCitiesByPlant(slug, startDate, endDate) };

  return NextResponse.json(result);
}
