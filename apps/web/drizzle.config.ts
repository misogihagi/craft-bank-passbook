import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./scripts/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "file:./db.sqlite3",
  },
});
