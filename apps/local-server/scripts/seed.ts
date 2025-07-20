import { main } from "@repo/models";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import drizzleConfig from "../drizzle.config";

const sqlite = new Database("db.sqlite3");
const db = drizzle({ client: sqlite });

main(db)
  .then(() => {
    console.log("Seeding completed successfully.");
  })
  .catch((error) => {
    console.error("Error during seeding:", error);
  });
