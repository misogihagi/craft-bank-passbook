import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { withMockContext } from "@repo/trpc";
import { appRouter } from "../utils";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/trpc",
    req,
    router: appRouter,
    createContext: withMockContext(),
  });
export { handler as GET, handler as POST };
