import { initSchema, getDb } from "../src/lib/db";

console.log("Initializing database...");
initSchema();

const db = getDb();
const cities = db.prepare("SELECT COUNT(*) as count FROM cities").get() as { count: number };
const plants = db.prepare("SELECT COUNT(*) as count FROM plants").get() as { count: number };
const records = db.prepare("SELECT COUNT(*) as count FROM flowering_records").get() as { count: number };

console.log("Database initialized successfully.");
console.log(`  cities: ${cities.count}`);
console.log(`  plants: ${plants.count}`);
console.log(`  flowering_records: ${records.count}`);
