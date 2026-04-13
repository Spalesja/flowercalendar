import path from "path";
import { initDatabaseFromJson } from "../src/lib/data-loader";
import { getDb } from "../src/lib/db";

const jsonPath = path.join(process.cwd(), "docs", "belarus_blooming_database_plus_forsythia.json");

console.log("Importing data from JSON...");
initDatabaseFromJson(jsonPath);

const db = getDb();
const cities = db.prepare("SELECT COUNT(*) as count FROM cities").get() as { count: number };
const plants = db.prepare("SELECT COUNT(*) as count FROM plants").get() as { count: number };
const records = db.prepare("SELECT COUNT(*) as count FROM flowering_records").get() as { count: number };

console.log("Database initialized successfully.");
console.log(`  cities: ${cities.count}`);
console.log(`  plants: ${plants.count}`);
console.log(`  flowering_records: ${records.count}`);

// Quick sanity check
const sample = db.prepare(`
  SELECT c.name as city, p.name as plant, fr.start_date, fr.end_date
  FROM flowering_records fr
  JOIN cities c ON c.id = fr.city_id
  JOIN plants p ON p.id = fr.plant_id
  LIMIT 3
`).all() as { city: string; plant: string; start_date: string; end_date: string }[];

console.log("\nSample records:");
for (const r of sample) {
  console.log(`  ${r.city} — ${r.plant}: ${r.start_date} → ${r.end_date}`);
}
