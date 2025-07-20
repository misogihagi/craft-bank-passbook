"use client";
import React, { useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { TRPCProvider, useTRPC, type AppRouter } from "../../trpc";
import { Link, useNavigate } from "react-router";
import type { UseQueryResult } from "@tanstack/react-query";

// プロフィールフォームコンポーネント
export function ProfileForm({
  nickname,
  setNickname,
}: {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [bio, setBio] = useState(
    "Craft beer enthusiast exploring flavors from around the world. Always on the hunt for the perfect IPA and love discovering hidden gem breweries. Cheers to new adventures! 🍺"
  );
  const [email, setEmail] = useState("ginga.sakata@email.com");
  const [location, setLocation] = useState("Portland, Oregon");

  return (
    <form className="space-y-6">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          ユーザー名
        </label>
        <input
          type="text"
          id="username"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 rounded-lg border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white" // Tailwindのprimaryをblue-600に仮定
        />
      </div>

      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          自己紹介
        </label>
        <textarea
          id="bio"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 rounded-lg border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white resize-none" // Tailwindのprimaryをblue-600に仮定
          placeholder="あなたのビールに関する旅について教えてください..."
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 rounded-lg border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white" // Tailwindのprimaryをblue-600に仮定
        />
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          所在地
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 rounded-lg border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white" // Tailwindのprimaryをblue-600に仮定
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            メンバー登録日
          </span>
          <span className="text-sm text-gray-600">2023年3月</span>
        </div>
      </div>
    </form>
  );
}

// アクションボタンコンポーネント
export function ActionButtons({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="mt-8 space-y-4">
      <button
        id="save-changes-button"
        className="w-full bg-blue-600 text-white py-3 rounded-full font-medium cursor-pointer" // Tailwindのprimaryをblue-600に仮定
        onClick={onSubmit}
      >
        変更を保存
      </button>
      <Link
        to="/passbook"
        className="block w-full text-center text-gray-600 py-3 cursor-pointer"
      >
        キャンセル
      </Link>
    </div>
  );
}

// メインのAppコンポーネント
export function Main<T, U>({ query }: { query: UseQueryResult<T, U> }) {
  const data = React.use(query.promise);
  const [nickname, setNickname] = useState(data?.nickname || "");
  const trpc = useTRPC();
  const userCreator = useMutation(trpc.setUserInfo.mutationOptions());
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    userCreator.mutate({ nickname });
    navigate("/passbook"); // 保存後にパスブックページへリダイレクト
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white min-h-screen font-inter">
      <main className="pt-16 pb-8 px-4">
        <ProfileForm nickname={nickname} setNickname={setNickname} />
        <ActionButtons onSubmit={onSubmit} />
      </main>
    </div>
  );
}

export function App() {
  const trpc = useTRPC();
  const userQuery = useQuery(trpc.getUserInfo.queryOptions());
  const userCreator = useMutation(trpc.setUserInfo.mutationOptions());

  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Main query={userQuery} />
      </React.Suspense>
    </>
  );
}

const AppWithQuery = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        experimental_prefetchInRender: true,
      },
    },
  });

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "http://localhost:3001/trpc",
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <App />
      </TRPCProvider>
    </QueryClientProvider>
  );
};

export default AppWithQuery;
