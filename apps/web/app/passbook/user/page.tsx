"use client";
import Link from "next/link";
import React, { useState } from "react";
import "../../globals.css";

// プロフィールヘッダーコンポーネント
const ProfileHeader = () => {
  return (
    <header className="fixed top-0 w-full max-w-sm border-b border-gray-100 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/passbook" className="flex items-center">
          {/* Lucide Reactのアイコンを使用する場合、別途インストールが必要です。ここではシンプルなSVGを使用します。 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
        {/* タイトルと保存ボタン */}
        <h1 className="text-lg font-semibold text-gray-900">
          プロフィールを編集
        </h1>
        <button
          id="save-button"
          className="text-blue-600 font-medium cursor-pointer rounded-full px-4 py-2" // Tailwindのprimaryをblue-600に仮定
        >
          保存
        </button>
      </div>
    </header>
  );
};

// プロフィールアバターセクションコンポーネント
const ProfileAvatarSection = () => {
  const [profileImage, setProfileImage] = useState(
    "https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20friendly%20craft%20beer%20enthusiast%2C%20smiling%20person%20with%20casual%20style%2C%20warm%20lighting%2C%20high%20quality%20photography%2C%20natural%20expression%2C%20modern%20portrait%20style&width=96&height=96&seq=profile-avatar&orientation=squarish"
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === "string") {
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="text-center py-6 mb-6">
      <div className="relative w-24 h-24 mx-auto mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
          <img
            id="profile-image"
            src={profileImage}
            alt="プロフィールアバター"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <button
          id="photo-edit-button"
          className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg" // Tailwindのprimaryをblue-600に仮定
          onClick={() => document.getElementById("photo-input").click()}
          aria-label="写真を編集"
        >
          {/* カメラアイコンのSVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

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
          ニックネーム
        </label>
        <input
          type="text"
          id="full-name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 rounded-lg border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white" // Tailwindのprimaryをblue-600に仮定
        />
      </div>
    </form>
  );
};

// プライバシー設定コンポーネント
const PrivacySettings = () => {
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [activitySharing, setActivitySharing] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const ToggleSwitch = ({ id, label, description, checked, onChange }) => (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
      <div>
        <div className="font-medium text-gray-900">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id} className="flex items-center cursor-pointer">
          <div
            className={`w-11 h-6 rounded-full shadow-inner relative ${
              checked ? "bg-blue-600" : "bg-gray-300" // Tailwindのprimaryをblue-600に仮定
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow absolute top-1 transition-transform duration-200 ${
                checked ? "right-1" : "left-1"
              }`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );

  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        プライバシー設定
      </h3>
      <div className="space-y-4">
        <ToggleSwitch
          id="profile-visibility"
          label="プロフィール公開設定"
          description="他のユーザーにあなたのプロフィールを公開する"
          checked={profileVisibility}
          onChange={() => setProfileVisibility(!profileVisibility)}
        />
        <ToggleSwitch
          id="activity-sharing"
          label="アクティビティ共有"
          description="あなたのビールアクティビティを友人と共有する"
          checked={activitySharing}
          onChange={() => setActivitySharing(!activitySharing)}
        />
        <ToggleSwitch
          id="email-notifications"
          label="メール通知"
          description="あなたのビールに関する旅の最新情報を受け取る"
          checked={emailNotifications}
          onChange={() => setEmailNotifications(!emailNotifications)}
        />
      </div>
    </section>
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
      <Link
        href="/passbook"
        className="block w-full text-center text-gray-600 py-3 cursor-pointer"
      >
        キャンセル
      </Link>
    </div>
  );
};

// メインのAppコンポーネント
const App = () => {
  return (
    <div className="w-full max-w-sm mx-auto min-h-screen bg-amber-50 font-sans">
      {" "}
      {/* Tailwindのfont-interを仮定 */}
      <main className="pt-16 pb-8 px-4">
        <ProfileForm />
        <ActionButtons />
      </main>
    </div>
  );
};

export default App;
