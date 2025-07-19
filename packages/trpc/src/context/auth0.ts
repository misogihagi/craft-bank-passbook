import { createRemoteJWKSet, jwtVerify } from "jose";

type Request = {
  headers: {
    authorization?: string;
  };
};

export function withContext(issuer: string) {
  const jwksURL = new URL(issuer + ".well-known/jwks.json");
  const jwks = createRemoteJWKSet(jwksURL);

  async function createContext({ req }: { req: Request }) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
      const result = await jwtVerify(
        req.headers.authorization.split(" ")[1] as string, // Extract the token from "Bearer
        jwks,
        {
          issuer,
        }
      );
      return result.payload;
    }
    return null;
  }
  return createContext;
}

export type Context = Awaited<ReturnType<ReturnType<typeof withContext>>>;
