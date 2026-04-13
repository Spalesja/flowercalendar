import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "flower-calendar.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
  }
  return db;
}

export function initSchema(): void {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS cities (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      region TEXT NOT NULL,
      short_description TEXT NOT NULL DEFAULT '',
      full_description TEXT NOT NULL DEFAULT '',
      hero_image TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS plants (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      latin_name TEXT,
      short_description TEXT NOT NULL DEFAULT '',
      full_description TEXT NOT NULL DEFAULT '',
      hero_image TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS flowering_records (
      id TEXT PRIMARY KEY,
      city_id TEXT NOT NULL,
      plant_id TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      FOREIGN KEY (city_id) REFERENCES cities(id),
      FOREIGN KEY (plant_id) REFERENCES plants(id)
    );

    CREATE INDEX IF NOT EXISTS idx_flowering_city ON flowering_records(city_id);
    CREATE INDEX IF NOT EXISTS idx_flowering_plant ON flowering_records(plant_id);
    CREATE INDEX IF NOT EXISTS idx_flowering_dates ON flowering_records(start_date, end_date);
  `);
}
