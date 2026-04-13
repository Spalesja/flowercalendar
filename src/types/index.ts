// === Основные сущности ===

export type City = {
  id: string;
  slug: string;
  name: string;
  region: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
};

export type Plant = {
  id: string;
  slug: string;
  name: string;
  latinName?: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
};

export type FloweringRecord = {
  id: string;
  cityId: string;
  plantId: string;
  startDate: string; // ISO date, e.g. "2026-04-10"
  endDate: string; // ISO date, e.g. "2026-04-25"
};

export type Place = {
  id: string;
  cityId: string;
  slug: string;
  name: string;
  type: PlaceType;
  description: string;
  image?: string;
};

export type PlaceType =
  | "park"
  | "garden"
  | "reserve"
  | "alley"
  | "forest"
  | "botanical_garden";

export type PlantPlace = {
  id: string;
  plantId: string;
  placeId: string;
  notes?: string;
};

// === Поиск ===

export type SearchMode = "cities" | "plants";

export type SearchParams = {
  mode: SearchMode;
  query: string; // slug города или растения
  startDate: string; // ISO date
  endDate: string; // ISO date
};

export type SearchResult =
  | { mode: "cities"; items: CitySearchResult[] }
  | { mode: "plants"; items: PlantSearchResult[] };

export type PlantSearchResult = {
  plant: Plant;
  floweringStart: string;
  floweringEnd: string;
};

export type CitySearchResult = {
  city: City;
  floweringStart: string;
  floweringEnd: string;
};
