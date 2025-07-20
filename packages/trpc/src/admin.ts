import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { usecases } from "@repo/usecases";
import { type AnyD1Database } from "drizzle-orm/d1";

const t = initTRPC.create();

export function initAdmin(client: AnyD1Database) {
  const { getJobCatalog, getJobById, print } = usecases(client);

  return t.router({
    getJobCatalog: t.procedure.query(getJobCatalog),
    getJobById: t.procedure
      .input(z.number())
      .query(({ input }) => getJobById(input)),
    print: t.procedure.input(z.number()).mutation(({ input }) => print(input)),
  });
}

export type AdminAppRouter = ReturnType<typeof initAdmin>;
