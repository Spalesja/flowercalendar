import { getDb } from "@/lib/db";
import type { City, Plant, PlantSearchResult, CitySearchResult } from "@/types";

// === Row types from SQLite ===

interface CityRow {
  id: string;
  slug: string;
  name: string;
  region: string;
  short_description: string;
  full_description: string;
  hero_image: string;
}

interface PlantRow {
  id: string;
  slug: string;
  name: string;
  latin_name: string | null;
  short_description: string;
  full_description: string;
  hero_image: string;
}

interface PlantWithDatesRow extends PlantRow {
  start_date: string;
  end_date: string;
}

interface CityWithDatesRow extends CityRow {
  start_date: string;
  end_date: string;
}

// === Mappers ===

function toCity(row: CityRow): City {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    region: row.region,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    heroImage: row.hero_image,
  };
}

function toPlant(row: PlantRow): Plant {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    latinName: row.latin_name ?? undefined,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    heroImage: row.hero_image,
  };
}

// === Queries ===

export function getCities(): City[] {
  const rows = getDb()
    .prepare("SELECT * FROM cities ORDER BY name")
    .all() as CityRow[];
  return rows.map(toCity);
}

export function getPlants(): Plant[] {
  const rows = getDb()
    .prepare("SELECT * FROM plants ORDER BY name")
    .all() as PlantRow[];
  return rows.map(toPlant);
}

export function getCityBySlug(slug: string): City | null {
  const row = getDb()
    .prepare("SELECT * FROM cities WHERE slug = ?")
    .get(slug) as CityRow | undefined;
  return row ? toCity(row) : null;
}

export function getPlantBySlug(slug: string): Plant | null {
  const row = getDb()
    .prepare("SELECT * FROM plants WHERE slug = ?")
    .get(slug) as PlantRow | undefined;
  return row ? toPlant(row) : null;
}

/**
 * Поиск растений по городу и диапазону дат.
 * Правило пересечения: record.start_date <= selectedEnd AND record.end_date >= selectedStart
 */
export function searchPlantsByCity(
  citySlug: string,
  startDate: string,
  endDate: string
): PlantSearchResult[] {
  const rows = getDb()
    .prepare(
      `SELECT p.*, fr.start_date, fr.end_date
       FROM flowering_records fr
       JOIN plants p ON p.id = fr.plant_id
       JOIN cities c ON c.id = fr.city_id
       WHERE c.slug = ?
         AND fr.start_date <= ?
         AND fr.end_date >= ?
       ORDER BY fr.start_date`
    )
    .all(citySlug, endDate, startDate) as PlantWithDatesRow[];

  return rows.map((row) => ({
    plant: toPlant(row),
    floweringStart: row.start_date,
    floweringEnd: row.end_date,
  }));
}

/**
 * Поиск городов по растению и диапазону дат.
 */
export function searchCitiesByPlant(
  plantSlug: string,
  startDate: string,
  endDate: string
): CitySearchResult[] {
  const rows = getDb()
    .prepare(
      `SELECT c.*, fr.start_date, fr.end_date
       FROM flowering_records fr
       JOIN cities c ON c.id = fr.city_id
       JOIN plants p ON p.id = fr.plant_id
       WHERE p.slug = ?
         AND fr.start_date <= ?
         AND fr.end_date >= ?
       ORDER BY fr.start_date`
    )
    .all(plantSlug, endDate, startDate) as CityWithDatesRow[];

  return rows.map((row) => ({
    city: toCity(row),
    floweringStart: row.start_date,
    floweringEnd: row.end_date,
  }));
}

/**
 * Что цветёт в городе прямо сейчас (на конкретную дату).
 */
export function getCurrentlyBloomingByCity(
  citySlug: string,
  currentDate: string
): PlantSearchResult[] {
  const rows = getDb()
    .prepare(
      `SELECT p.*, fr.start_date, fr.end_date
       FROM flowering_records fr
       JOIN plants p ON p.id = fr.plant_id
       JOIN cities c ON c.id = fr.city_id
       WHERE c.slug = ?
         AND fr.start_date <= ?
         AND fr.end_date >= ?
       ORDER BY fr.start_date`
    )
    .all(citySlug, currentDate, currentDate) as PlantWithDatesRow[];

  return rows.map((row) => ({
    plant: toPlant(row),
    floweringStart: row.start_date,
    floweringEnd: row.end_date,
  }));
}

/**
 * Подсказки городов для autocomplete.
 */
export function searchCitySuggestions(query: string): City[] {
  const rows = getDb()
    .prepare(
      `SELECT * FROM cities
       WHERE name LIKE ? OR slug LIKE ?
       ORDER BY name
       LIMIT 10`
    )
    .all(`%${query}%`, `%${query}%`) as CityRow[];
  return rows.map(toCity);
}

/**
 * Подсказки растений для autocomplete.
 */
export function searchPlantSuggestions(query: string): Plant[] {
  const rows = getDb()
    .prepare(
      `SELECT * FROM plants
       WHERE name LIKE ? OR latin_name LIKE ? OR slug LIKE ?
       ORDER BY name
       LIMIT 10`
    )
    .all(`%${query}%`, `%${query}%`, `%${query}%`) as PlantRow[];
  return rows.map(toPlant);
}
