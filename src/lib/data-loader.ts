import { getDb, initSchema } from "./db";
import fs from "fs";
import path from "path";

interface JsonCity {
  id: number;
  slug: string;
  name: string;
  region: string;
  short_description: string;
  full_description: string;
  hero_image: string;
}

interface JsonPlant {
  id: number;
  slug: string;
  name: string;
  latin_name: string;
  short_description: string;
  full_description: string;
  hero_image: string;
}

interface JsonFloweringRecord {
  id: number;
  city_id: number;
  plant_id: number;
  start_date: string;
  end_date: string;
}

interface JsonData {
  cities: JsonCity[];
  plants: JsonPlant[];
  floweringRecords: JsonFloweringRecord[];
}

export function initDatabaseFromJson(jsonPath: string): void {
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const data: JsonData = JSON.parse(raw);

  initSchema();
  const db = getDb();

  // Clear tables in correct order (FK constraints)
  db.exec("DELETE FROM flowering_records");
  db.exec("DELETE FROM plants");
  db.exec("DELETE FROM cities");

  // Insert cities
  const insertCity = db.prepare(`
    INSERT INTO cities (id, slug, name, region, short_description, full_description, hero_image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // Insert plants
  const insertPlant = db.prepare(`
    INSERT INTO plants (id, slug, name, latin_name, short_description, full_description, hero_image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // Insert flowering records
  const insertRecord = db.prepare(`
    INSERT INTO flowering_records (id, city_id, plant_id, start_date, end_date)
    VALUES (?, ?, ?, ?, ?)
  `);

  const importAll = db.transaction(() => {
    for (const c of data.cities) {
      insertCity.run(
        String(c.id), c.slug, c.name, c.region,
        c.short_description, c.full_description, c.hero_image
      );
    }

    for (const p of data.plants) {
      insertPlant.run(
        String(p.id), p.slug, p.name, p.latin_name,
        p.short_description, p.full_description, p.hero_image
      );
    }

    for (const r of data.floweringRecords) {
      insertRecord.run(
        String(r.id), String(r.city_id), String(r.plant_id),
        r.start_date, r.end_date
      );
    }
  });

  importAll();
}
