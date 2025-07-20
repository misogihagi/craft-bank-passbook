import React, { useState } from "react";

// プロフィールフォームコンポーネント
const ProfileForm = () => {
  const [fullName, setFullName] = useState("Marcus Thompson");
  const [username, setUsername] = useState("@marcus_hops");
  const [bio, setBio] = useState(
    "Craft beer enthusiast exploring flavors from around the world. Always on the hunt for the perfect IPA and love discovering hidden gem breweries. Cheers to new adventures! 🍺"
  );
  const [email, setEmail] = useState("marcus.thompson@email.com");
  const [location, setLocation] = useState("Portland, Oregon");

  return (
    <form className="space-y-6">
      <div>
        <label
          htmlFor="full-name"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          フルネーム
        </label>
        <input
          type="text"
          id="full-name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 rounded-lg border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white" // Tailwindのprimaryをblue-600に仮定
        />
      </div>

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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
};

// アクションボタンコンポーネント
const ActionButtons = () => {
  return (
    <div className="mt-8 space-y-4">
      <button
        id="save-changes-button"
        className="w-full bg-blue-600 text-white py-3 rounded-full font-medium cursor-pointer" // Tailwindのprimaryをblue-600に仮定
      >
        変更を保存
      </button>
      <a
        href="https://readdy.ai/home/628d526b-798f-402d-9d1b-c9aa1a4fd8cc/57239c27-6154-41d7-a7ff-a43a6140ce45"
        data-readdy="true"
        className="block w-full text-center text-gray-600 py-3 cursor-pointer"
      >
        キャンセル
      </a>
    </div>
  );
};

// メインのAppコンポーネント
const App = () => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white min-h-screen font-inter">
      <main className="pt-16 pb-8 px-4">
        <ProfileForm />
        <ActionButtons />
      </main>
    </div>
  );
};

export default App;
