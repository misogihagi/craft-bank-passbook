import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { initTRPC } from "@trpc/server";
import { trpcServer } from "@hono/trpc-server";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { init, withMockContext } from "@repo/trpc";

const mockUser = {
  id: "sakataginga",
  nickname: "坂田銀河",
  watermark: 0,
};

const sqlite = new Database("../../db.sqlite3");

const appRouter = init(sqlite);

const app = new Hono();

app.use("*", cors());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    //    createContext: withMockContext(),
    createContext: (_opts, c) => {
      console.log("Context created:", c.req.header("authorization"));
      if (c.req.header("authorization") === "anonymous") {
        return {}; // Return null for anonymous requests
      } else return { user: mockUser };
    },
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
