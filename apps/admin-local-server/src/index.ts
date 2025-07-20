import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import Database from "better-sqlite3";
import { initAdmin } from "@repo/trpc";

const sqlite = new Database("../../db.sqlite3");

const appRouter = initAdmin(sqlite);

const app = new Hono();

app.use("*", cors());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  })
);

serve(
  {
    fetch: app.fetch,
    port: 3011,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
