import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { usecases } from "@repo/usecases";
import { type AnyD1Database } from "drizzle-orm/d1";

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

export function init(client: AnyD1Database) {
  const {
    getCheckinList,
    insertCheckin,
    requestPrint,
    getUserInfo,
    setUserInfo,
  } = usecases(client);

  return t.router({
    getCheckinList: authedProcedure
      .input(
        z.object({
          limit: z.number(),
          offset: z.number(),
        })
      )
      .query(withUserId<{ limit: number; offset: number }>(getCheckinList)),
    insertCheckin: authedProcedure
      .input(
        z.object({
          name: z.string(),
          date: z.string(),
          amount: z.number(),
          image: z.string().optional(),
          brewery: z.string().optional(),
          location: z.string().optional(),
          note: z.string().optional(),
        })
      )
      .mutation(withUserId(insertCheckin)),

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

export type AppRouter = ReturnType<typeof init>;
