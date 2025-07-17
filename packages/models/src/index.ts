import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// untapped準拠
export const checkinsTable = sqliteTable("checkins", {
  id: int().primaryKey({ autoIncrement: true }),
  date: text().notNull(),
  amount: int().notNull(),
  userId: text("user_id").references(() => usersTable.id),
});

export const usersTable = sqliteTable("users", {
  id: text().primaryKey(),
  nickname: text().notNull(),
  watermark: int().notNull(),
});

export const jobsTable = sqliteTable("jobs", {
  id: int().primaryKey({ autoIncrement: true }),
  date: text().notNull(),
  userId: text("user_id").references(() => usersTable.id),
});
