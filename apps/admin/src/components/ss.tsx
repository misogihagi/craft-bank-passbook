"use client";
import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { TRPCProvider, type AppRouter } from "../lib/trpc";

function App({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "/trpc",
        }),
      ],
    })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <div className="min-h-screen bg-gray-50">
          <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
        </div>
      </TRPCProvider>
    </QueryClientProvider>
  );
}
