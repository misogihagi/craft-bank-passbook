import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AdminAppRouter } from "@repo/trpc";
export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AdminAppRouter>();
export type { AdminAppRouter as AppRouter };
