type Request = {
  headers: {
    authorization?: string;
  };
};

export function withContext() {
  async function createContext({
    req,
  }: {
    req: { headers: { authorization?: string } };
  }) {
    if (!req.headers.authorization) return null;
    return { id: "mock-user-id" }; // Mock user contexte
  }
  return createContext;
}

export type Context = Awaited<ReturnType<ReturnType<typeof withContext>>>;
