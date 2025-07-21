// AddBeerForm.jsx
import React, { useState, useEffect, useRef } from "react";
import "./page.module.css"; // カスタムCSSをインポート

import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "../../trpc";
import { Link, useNavigate } from "react-router";

const AddBeerForm = () => {
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");
  const [beerName, setBeerName] = useState("");
  const [breweryName, setBreweryName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState("Select beer style");
  const [beerDate, setBeerDate] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tastingNotes, setTastingNotes] = useState("");

  const trpc = useTRPC();
  const checkinCreator = useMutation(trpc.insertCheckin.mutationOptions());
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    checkinCreator.mutate({
      name: beerName,
      amount: 500,
      date: beerDate,
      image: "",
      brewery: breweryName,
      location,
      note: tastingNotes,
    });
    navigate("/passbook"); // 保存後にパスブックページへリダイレクト
  };

  // コンポーネントのマウント時に日付を初期化
  useEffect(() => {
    const today = new Date();
    const formattedDate =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");
    setBeerDate(formattedDate);
  }, []);

  const isFormValid = beerName.trim().length > 0;

  const saveEntry = () => {
    if (isFormValid) {
      const formData = {
        beerName,
        brewery: breweryName,
        location,
        rating,
        style: selectedStyle,
        date: beerDate,
        notes: tastingNotes,
        tags: selectedTags,
        photo: photoPreviewUrl, // 写真データを含む
      };
      // 実際のアプリケーションでは、これをAPIに送信するか、グローバルに状態を管理します
      console.log("フォームデータ:", formData);
      localStorage.setItem("newBeerEntry", JSON.stringify(formData));
      // ナビゲーションをシミュレート: window.location.href = "https://readdy.ai/home/...";
      alert("ビールのエントリーを保存しました！");
    } else {
      alert("ビール名を入力してください。");
    }
  };

  return (
    <div className="bg-amber-50 font-sans">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-amber-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <a
            href="https://readdy.ai/home/628d526b-798f-402d-9d1b-c9aa1a4fd8cc/98894706-0797-435f-9d0a-7260cb1ada8b"
            data-readdy="true"
            className="w-8 h-8 flex items-center justify-center cursor-pointer no-underline"
          >
            <i className="ri-arrow-left-line text-gray-600 text-xl"></i>
          </a>
          <h1 className="text-lg font-semibold text-gray-800">
            新しいビールを追加
          </h1>
          <button
            id="save-button"
            className={`text-primary font-medium cursor-pointer !rounded-button ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={saveEntry}
            disabled={!isFormValid}
          >
            保存
          </button>
        </div>
      </nav>

      <main className="pt-16 pb-24">
        <div className="px-4 py-6">
          <div className="page-texture rounded-xl overflow-hidden shadow-lg border border-amber-200">
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ビール名 *
                  </label>
                  <input
                    type="text"
                    id="beer-name"
                    className="form-input w-full px-4 py-3 rounded-lg text-sm"
                    placeholder="ビール名を入力"
                    value={beerName}
                    onChange={(e) => setBeerName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ブルワリー
                  </label>
                  <input
                    type="text"
                    id="brewery-name"
                    className="form-input w-full px-4 py-3 rounded-lg text-sm"
                    placeholder="ブルワリー名を入力"
                    value={breweryName}
                    onChange={(e) => setBreweryName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    場所
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="location"
                      className="form-input w-full px-4 py-3 pl-12 rounded-lg text-sm"
                      placeholder="市町村、州/国"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                      <i className="ri-map-pin-line text-gray-400"></i>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    日付
                  </label>
                  <input
                    type="date"
                    id="beer-date"
                    className="form-input w-full px-4 py-3 rounded-lg text-sm"
                    value={beerDate}
                    onChange={(e) => setBeerDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    テイスティングノート
                  </label>
                  <textarea
                    id="tasting-notes"
                    className="handwriting form-input w-full px-4 py-3 rounded-lg text-sm resize-none"
                    rows={4}
                    placeholder="テイスティング体験を記述してください…風味、香り、思い出、誰と共有したかなど…"
                    value={tastingNotes}
                    onChange={(e) => setTastingNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 w-full bg-white border-t border-amber-200 z-50">
        <div className="flex px-4 py-4 space-x-4">
          <Link
            to="/passbook"
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg text-center font-medium cursor-pointer !rounded-button no-underline"
          >
            キャンセル
          </Link>
          <button
            id="save-entry-button"
            className={`flex-1 bg-primary text-white py-3 rounded-lg text-center font-medium cursor-pointer !rounded-button ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={onSubmit}
            disabled={!isFormValid}
          >
            エントリーを保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBeerForm;
