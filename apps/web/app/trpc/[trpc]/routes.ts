import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { init, withMockContext } from "@repo/trpc";

const sqlite = new Database("db.sqlite3");
const db = drizzle({ client: sqlite });

const appRouter = init({
  db,
});

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/trpc",
    req,
    router: appRouter,
    createContext: withMockContext(),
  });
export { handler as GET, handler as POST };
