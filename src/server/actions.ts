"use server";

import {
  searchPlantsByCity,
  searchCitiesByPlant,
} from "@/server/repositories";
import type { SearchMode, SearchResult } from "@/types";

export async function searchAction(
  mode: SearchMode,
  slug: string,
  startDate: string,
  endDate: string
): Promise<SearchResult> {
  if (mode === "cities") {
    const items = searchPlantsByCity(slug, startDate, endDate);
    return { mode: "plants", items };
  }

  const items = searchCitiesByPlant(slug, startDate, endDate);
  return { mode: "cities", items };
}
