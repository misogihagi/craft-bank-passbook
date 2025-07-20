import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { initTRPC } from "@trpc/server";
import { trpcServer } from "@hono/trpc-server";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { init, withMockContext } from "@repo/trpc";
import { z } from "zod";
import { userInfo } from "os";

const sqlite = new Database("db.sqlite3");
const db = drizzle({ client: sqlite });

const appRouter = init({
  db,
});

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    //    createContext: withMockContext(),
    createContext: (_opts, c) => {
      // c is the hono context
      console.log(c.header());
      return {
        user: {
          id: c.req.header("authorization") || "anonymous",
        },
      };
    },
  })
);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
