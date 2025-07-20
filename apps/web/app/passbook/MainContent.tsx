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
import { TRPCProvider, type AppRouter } from "../trpc";

const stastics = (
  <div className="px-4 mt-8">
    {/* クイック統計セクション */}
    {/* `px-4 mt-8`: 左右パディング、上部マージン */}
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
    {/* 統計カードのグリッド */}
    {/* `grid grid-cols-2 gap-4`: 2列グリッド、ギャップ4 */}
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-xl p-4 shadow-lg border border-amber-200">
        <div className="w-8 h-8 flex items-center justify-center mb-3">
          <i className="ri-trophy-line text-secondary text-xl"></i>
        </div>
        <div className="text-2xl font-bold text-gray-800 mb-1">12</div>
        <div className="text-sm text-gray-600">Achievements</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-lg border border-amber-200">
        <div className="w-8 h-8 flex items-center justify-center mb-3">
          <i className="ri-map-pin-line text-secondary text-xl"></i>
        </div>
        <div className="text-2xl font-bold text-gray-800 mb-1">15</div>
        <div className="text-sm text-gray-600">Cities Visited</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-lg border border-amber-200">
        <div className="w-8 h-8 flex items-center justify-center mb-3">
          <i className="ri-heart-line text-secondary text-xl"></i>
        </div>
        <div className="text-2xl font-bold text-gray-800 mb-1">IPA</div>
        <div className="text-sm text-gray-600">Favorite Style</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-lg border border-amber-200">
        <div className="w-8 h-8 flex items-center justify-center mb-3">
          <i className="ri-calendar-line text-secondary text-xl"></i>
        </div>
        <div className="text-2xl font-bold text-gray-800 mb-1">3.2</div>
        <div className="text-sm text-gray-600">Avg per Week</div>
      </div>
    </div>
  </div>
);

const beerLogs = [
  {
    month: "July 2025",
    totalEntries: 8,
    entries: [
      {
        id: 1,
        imgSrc:
          "https://readdy.ai/api/search-image?query=craft%20beer%20bottle%20IPA%20golden%20amber%20color%20isolated%20on%20white%20background%20product%20photography%20style%20high%20quality%20detailed&width=80&height=80&seq=beer1&orientation=squarish",
        alt: "Beer",
        name: "Hoppy Trails IPA",
        brewery: "Mountain Brew Co.",
        location: "Portland, OR",
        note: '"Perfect balance of citrus and pine. Shared with Emma at the rooftop bar - amazing sunset!"',
        date: "Dec 15, 2024",
        amount: "500",
      },
      {
        id: 2,
        imgSrc:
          "https://readdy.ai/api/search-image?query=dark%20stout%20beer%20bottle%20black%20creamy%20foam%20isolated%20on%20white%20background%20product%20photography%20style%20high%20quality%20detailed&width=80&height=80&seq=beer2&orientation=squarish",
        alt: "Beer",
        name: "Midnight Velvet Stout",
        rating: "★★★★☆",
        brewery: "Riverside Brewing",
        location: "Denver, CO",
        note: '"Rich chocolate notes with coffee undertones. Perfect for this snowy evening by the fireplace."',
        date: "Dec 12, 2024",
        amount: "500",
        tags: ["Stout", "Solo"],
        tagColors: [
          "bg-gray-100 text-gray-800",
          "bg-purple-100 text-purple-800",
        ],
      },
      {
        id: 3,
        imgSrc:
          "https://readdy.ai/api/search-image?query=wheat%20beer%20bottle%20light%20golden%20color%20with%20orange%20slice%20isolated%20on%20white%20background%20product%20photography%20style%20high%20quality%20detailed&width=80&height=80&seq=beer3&orientation=squarish",
        alt: "Beer",
        name: "Sunset Wheat",
        rating: "★★★☆☆",
        brewery: "Coastal Craft",
        location: "San Diego, CA",
        note: '"Light and refreshing with hints of orange. Great beach beer during our weekend getaway."',
        date: "Dec 8, 2024",
        amount: "500",
        tags: ["Wheat", "Travel"],
        tagColors: [
          "bg-yellow-100 text-yellow-800",
          "bg-green-100 text-green-800",
        ],
      },
    ],
  },
  {
    month: "June 2025",
    totalEntries: 12,
    entries: [
      {
        id: 4,
        imgSrc:
          "https://readdy.ai/api/search-image?query=belgian%20ale%20beer%20bottle%20rich%20amber%20color%20isolated%20on%20white%20background%20product%20photography%20style%20high%20quality%20detailed&width=80&height=80&seq=beer4&orientation=squarish",
        alt: "Beer",
        name: "Belgian Bliss",
        rating: "★★★★★",
        brewery: "Abbey Brewing",
        location: "Brussels, BE",
        note: '"Complex fruity notes with a spicy finish. A true Belgian masterpiece!"',
        date: "Jun 28, 2025",
        amount: "500",
        tags: ["Belgian", "Special"],
        tagColors: ["bg-orange-100 text-orange-800", "bg-red-100 text-red-800"],
      },
      {
        id: 5,
        imgSrc:
          "https://readdy.ai/api/search-image?query=pilsner%20beer%20bottle%20crystal%20clear%20golden%20color%20isolated%20on%20white%20background%20product%20photography%20style%20high%20quality%20detailed&width=80&height=80&seq=beer5&orientation=squarish",
        alt: "Beer",
        name: "Crystal Pilsner",
        rating: "★★★★☆",
        brewery: "Mountain Spring",
        location: "Munich, DE",
        note: '"Crisp and clean with subtle hop character. Perfect summer refreshment."',
        date: "Jun 15, 2025",
        amount: "500",
        tags: ["Pilsner", "Travel"],
        tagColors: [
          "bg-yellow-100 text-yellow-800",
          "bg-blue-100 text-blue-800",
        ],
      },
    ],
  },
];

const memoryGalleryImages = [
  {
    src: "https://readdy.ai/api/search-image?query=craft%20beer%20tasting%20flight%20wooden%20board%20multiple%20beer%20glasses%20brewery%20atmosphere%20warm%20lighting%20cozy%20interior&width=180&height=120&seq=memory1&orientation=landscape",
    alt: "Beer tasting",
  },
  {
    src: "https://readdy.ai/api/search-image?query=friends%20cheering%20with%20craft%20beer%20bottles%20outdoor%20patio%20sunset%20golden%20hour%20happy%20moments%20social%20gathering&width=180&height=120&seq=memory2&orientation=landscape",
    alt: "Friends with beer",
  },
  {
    src: "https://readdy.ai/api/search-image?query=brewery%20tour%20industrial%20equipment%20copper%20tanks%20beer%20production%20behind%20the%20scenes%20educational%20experience&width=180&height=120&seq=memory3&orientation=landscape",
    alt: "Brewery tour",
  },
  {
    src: "https://readdy.ai/api/search-image?query=craft%20beer%20festival%20outdoor%20event%20multiple%20booths%20tents%20people%20tasting%20beer%20sunny%20day%20community%20celebration&width=180&height=120&seq=memory4&orientation=landscape",
    alt: "Beer festival",
  },
];

const user = {
  nickname: "John",
  profileImage:
    "https://readdy.ai/api/search-image?query=profile%20picture%20of%20a%20man%20with%20short%20brown%20hair%20and%20a%20beard&width=80&height=80&seq=userProfile&orientation=squarish",
};

const checkins = {
  count: 150,
};

const MainContent = () => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [cardStyle, setCardStyle] = useState({
    transform: "translateX(0)",
    transition: "transform 0.2s ease",
  });
  const [imageStyle, setImageStyle] = useState({
    transform: "scale(1.05)",
    transition: "transform 0.2s ease",
    zIndex: "10",
  });

  const handleCardClick = () => {
    setCardStyle({
      transform: "translateX(4px)",
      transition: "transform 0.2s ease",
    });
    setTimeout(() => {
      setCardStyle({
        transform: "translateX(0)",
        transition: "transform 0.2s ease",
      });
    }, 200);
  };

  const handleImageClick = () => {
    setImageStyle({
      transform: "scale(1.05)",
      transition: "transform 0.2s ease",
      zIndex: "10",
    });
    setTimeout(() => {
      setImageStyle({
        transform: "scale(1)",
        transition: "transform 0.2s ease",
        zIndex: "1",
      });
    }, 300);
  };
  // ビールログのエントリデータを定義
  // 実際のアプリケーションでは、これはAPIからフェッチされるデータになります

  return (
    // メインコンテンツエリアのコンテナ
    // `pt-16 pb-20`: 上部と下部にパディングを設定（ナビゲーションバーとの重なりを避けるため）
    <main className="pt-16 pb-20">
      {/* ウェルカムセクションと統計カード */}
      {/* `leather-texture`: カスタム背景テクスチャ（CSSで定義する必要があるかもしれません） */}
      {/* `mx-4 rounded-xl shadow-2xl overflow-hidden`: マージン、角丸、影、コンテンツの切り抜き */}
      <div className="leather-texture mx-4 rounded-xl shadow-2xl overflow-hidden">
        {/* カード内部のパディングとテキスト中央揃え */}
        <div className="p-6 text-center">
          {/* ウェルカムメッセージ */}
          <div className="text-white mb-4">
            <h2 className="text-2xl font-bold mb-2">
              おかえりなさい!{user.nickname}さん
            </h2>
          </div>
          {/* ユニークビール収集数の統計カード */}
          {/* `bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4`: 透明な背景、ぼかし、角丸、パディング、下部マージン */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
            <div className="text-white text-center">
              <div className="text-3xl font-bold">{checkins.count}</div>
              <div className="text-sm text-amber-100">
                今までに飲んだビールの数
              </div>
            </div>
          </div>
          {/* 月ごとの収集数、ブルワリー数、都市数の統計グリッド */}
          {/*           <div className="grid grid-cols-3 gap-3 text-white text-sm">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-bold">23</div>
              <div className="text-amber-100">This Month</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-bold">8</div>
              <div className="text-amber-100">Breweries</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-bold">15</div>
              <div className="text-amber-100">Cities</div>
            </div>
          </div>
 */}
        </div>
      </div>

      {/* ビールログエントリリスト */}
      {/* `px-4 mt-6`: 左右パディング、上部マージン */}
      <div className="px-4 mt-6">
        {/* 各月のログセクションをレンダリング */}
        {beerLogs.map((monthData) => (
          <div
            key={monthData.month}
            className="page-texture rounded-xl overflow-hidden shadow-lg border border-amber-200 mt-4"
          >
            {/* 月ヘッダー */}
            {/* `border-b border-amber-200 px-4 py-3 bg-amber-50/50`: 下部ボーダー、パディング、半透明の背景色 */}
            <div className="border-b border-amber-200 px-4 py-3 bg-amber-50/50">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-600">
                  {monthData.month}
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>Total: {monthData.totalEntries} Entries</span>
                </div>
              </div>
            </div>
            {/* 個々のビールログエントリ */}
            {/* `divide-y divide-amber-100`: 各エントリ間に水平線を追加 */}
            <div className="divide-y divide-amber-100">
              {monthData.entries.map((entry) => (
                <div
                  key={entry.id}
                  className="px-4 py-3 bg-white hover:bg-amber-50/30 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={entry.imgSrc}
                      alt={entry.alt}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {entry.name}
                        </h4>
                        <span className="text-lg text-blue-800">
                          + {entry.amount}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {entry.brewery} • {entry.location}
                      </p>
                      <p className="handwriting text-sm text-gray-700 italic">
                        {entry.note}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500">
                          {entry.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

const MainContentWithQuery = () => {
  const queryClient = new QueryClient();

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
        <MainContent />
      </TRPCProvider>
    </QueryClientProvider>
  );
};

export default MainContentWithQuery;
