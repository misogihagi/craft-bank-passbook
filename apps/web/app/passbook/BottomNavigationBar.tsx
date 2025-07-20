import React from "react";

const BottomNavigationBar = () => {
  return (
    // フッターナビゲーションバーのコンテナ
    // `fixed bottom-0`: 画面下部に固定
    // `w-full`: 幅を100%に設定
    // `bg-white`: 背景色を白に設定
    // `border-t border-amber-200`: 上部に琥珀色の細いボーダーを追加
    // `z-50`: 他の要素の上に表示されるように重なり順序を設定
    <div className="fixed bottom-0 w-full bg-white border-t border-amber-200 z-50">
      {/* ナビゲーションアイテムを配置するためのグリッドコンテナ */}
      {/* `grid grid-cols-5`: 5列のグリッドを定義 */}
      {/* `py-2`: 上下パディングを2に設定 */}
      <div className="grid grid-cols-5 py-2">
        {/* Passbook（手帳）ボタン */}
        {/* `flex flex-col items-center justify-center`: アイテムを中央揃えにして縦方向に並べる */}
        {/* `py-2`: 上下パディングを2に設定 */}
        {/* `text-primary`: プライマリカラーを適用（アクティブ状態を示すため） */}
        {/* `cursor-pointer`: カーソルをポインターに変更 */}
        <button className="flex flex-col items-center justify-center py-2 text-primary cursor-pointer">
          {/* アイコンのコンテナ */}
          <div className="w-6 h-6 flex items-center justify-center mb-1">
            {/* 手帳アイコン */}
            <i className="ri-book-open-line text-xl"></i>
          </div>
          {/* テキストラベル */}
          <span className="text-xs font-medium">Passbook</span>
        </button>

        {/* Add Entry（エントリを追加）ボタン */}
        {/* `text-gray-500`: 非アクティブ状態を示すグレーのテキスト */}
        <button className="flex flex-col items-center justify-center py-2 text-gray-500 cursor-pointer">
          {/* アイコンのコンテナ */}
          <div className="w-6 h-6 flex items-center justify-center mb-1">
            {/* 追加アイコン */}
            <i className="ri-add-circle-line text-xl"></i>
          </div>
          {/* テキストラベル */}
          <span className="text-xs">Add Entry</span>
        </button>

        {/* Memories（思い出）ボタン */}
        <button className="flex flex-col items-center justify-center py-2 text-gray-500 cursor-pointer">
          {/* アイコンのコンテナ */}
          <div className="w-6 h-6 flex items-center justify-center mb-1">
            {/* 画像アイコン */}
            <i className="ri-image-line text-xl"></i>
          </div>
          {/* テキストラベル */}
          <span className="text-xs">Memories</span>
        </button>

        {/* Profile（プロフィール）リンク */}
        {/* `a`タグを使用しており、`href`属性が指定されています */}
        {/* `no-underline`: アンダーラインを非表示にする */}
        <a
          href="https://readdy.ai/home/628d526b-798f-402d-9d1b-c9aa1a4fd8cc/57239c27-6154-41d7-a7ff-a43a6140ce45"
          data-readdy="true"
          className="flex flex-col items-center justify-center py-2 text-gray-500 no-underline"
        >
          {/* アイコンのコンテナ */}
          <div className="w-6 h-6 flex items-center justify-center mb-1">
            {/* ユーザーアイコン */}
            <i className="ri-user-line text-xl"></i>
          </div>
          {/* テキストラベル */}
          <span className="text-xs">Profile</span>
        </a>

        {/* Discover（発見）ボタン */}
        <button className="flex flex-col items-center justify-center py-2 text-gray-500 cursor-pointer">
          {/* アイコンのコンテナ */}
          <div className="w-6 h-6 flex items-center justify-center mb-1">
            {/* コンパスアイコン */}
            <i className="ri-compass-line text-xl"></i>
          </div>
          {/* テキストラベル */}
          <span className="text-xs">Discover</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigationBar;
