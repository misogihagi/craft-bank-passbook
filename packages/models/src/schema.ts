import { sql } from "drizzle-orm";
import { check, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// untapped準拠
export const checkinsTable = sqliteTable("checkins", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  date: text().notNull(),
  amount: int().notNull(),

  image: text(),
  brewery: text(),
  location: text(),
  note: text(),

  userId: text("user_id").references(() => usersTable.id),
});

export const usersTable = sqliteTable("users", {
  id: text().primaryKey(),
  nickname: text().notNull(),
  watermark: int().notNull(),
});

export const jobsTable = sqliteTable(
  "jobs",
  {
    id: int().primaryKey({ autoIncrement: true }),
    date: text().notNull(),
    status: text().notNull(),
    userId: text("user_id")
      .references(() => usersTable.id)
      .unique(),
  },
  (table) => [
    check(
      "status",
      sql`${table.status} = 'Printing' OR ${table.status} = 'Queued' OR ${table.status} = 'Paused'`
    ),
  ]
);
