/*
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

import { init } from "@repo/trpc";


*/
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { usecases } from "@repo/usecases";
import { type AnyD1Database } from "drizzle-orm/d1";
import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

export const userSchema = z.object({
  id: z.string(),
});

const t = initTRPC.create();

export const authedProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;

  const result = userSchema.safeParse((ctx as { user: unknown }).user);
  if (result.error) throw new TRPCError({ code: "UNAUTHORIZED" });
  else
    return opts.next({
      ctx: {
        user: result.data,
      },
    });
});

function withUserId<T>(fn: CallableFunction) {
  return async (opts: {
    ctx: { user: z.infer<typeof userSchema> };
    input: T;
  }) => {
    const { ctx, input } = opts;
    if (input) return fn(ctx.user.id, input);
    else return fn(ctx.user.id);
  };
}

export function init(client: AnyD1Database | BetterSQLite3Database) {
  const { getCheckinList, requestPrint, getUserInfo, setUserInfo } =
    usecases(client);

  return t.router({
    getCheckinList: authedProcedure
      .input(
        z.object({
          limit: z.number(),
          offset: z.number(),
        })
      )
      .query(withUserId<{ limit: number; offset: number }>(getCheckinList)),
    requestPrint: authedProcedure.mutation(withUserId(requestPrint)),
    getUserInfo: authedProcedure.query(withUserId(getUserInfo)),
    setUserInfo: authedProcedure
      .input(
        z.object({
          nickname: z.string(),
        })
      )
      .mutation(withUserId(setUserInfo)),
  });
}

const sqlite = new Database("db.sqlite3");
const db = drizzle({ client: sqlite });

export const appRouter = init({
  db,
});
export type AppRouter = typeof appRouter;

export const { useTRPC, useTRPCClient } = createTRPCContext<AppRouter>();
export const TRPCProvider = createTRPCContext<AppRouter>().TRPCProvider;
