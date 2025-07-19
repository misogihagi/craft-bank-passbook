type Request = {
  headers: {
    authorization?: string;
  };
};

export function withContext() {
  async function createContext({ req }: { req: Request }) {
    if (!req.headers.authorization) return null;
    return { id: "mock-user-id" }; // Mock user context
  }
  return createContext;
}

export type Context = Awaited<ReturnType<ReturnType<typeof withContext>>>;
