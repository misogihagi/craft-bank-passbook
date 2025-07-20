import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    // ナビゲーションバーのコンテナ
    // `fixed`: 画面上部に固定
    // `top-0`: 上端に配置
    // `w-full`: 幅を100%に設定
    // `bg-white/90`: 背景色を白（透明度90%）に設定
    // `backdrop-blur-sm`: 背景にぼかし効果を適用
    // `border-b border-amber-200`: 下部に琥珀色の細いボーダーを追加
    // `z-50`: 他の要素の上に表示されるように重なり順序を設定
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-amber-200 z-50">
      {/* ナビゲーションバーの内部コンテンツを配置するためのフレックスコンテナ */}
      {/* `flex`: フレックスボックスを有効化 */}
      {/* `items-center`: 垂直方向の中央揃え */}
      {/* `justify-between`: アイテムを両端に配置し、間に均等なスペースを空ける */}
      {/* `px-4 py-3`: 左右にパディングを4、上下にパディングを3適用 */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* 左側のセクション（アイコンとタイトル） */}
        {/* `flex`: フレックスボックスを有効化 */}
        {/* `items-center`: 垂直方向の中央揃え */}
        {/* `space-x-3`: 子要素間に水平方向のスペースを3追加 */}
        <div className="flex items-center space-x-3">
          {/* ブックアイコンのコンテナ */}
          {/* `w-8 h-8`: 幅と高さを8に設定 */}
          {/* `flex items-center justify-center`: アイコンを中央に配置 */}
          <div className="w-8 h-8 flex items-center justify-center">
            {/* リミックスアイコン（本のアイコン） */}
            {/* `ri-book-2-line`: アイコンの種類 */}
            {/* `text-primary`: プライマリカラーを適用 */}
            {/* `text-xl`: テキストサイズをxlに設定 */}
            <i className="ri-book-2-line text-primary text-xl"></i>
          </div>
          {/* アプリケーションタイトル */}
          {/* `font-['Pacifico']`: 'Pacifico'フォントを適用 */}
          {/* `text-xl`: テキストサイズをxlに設定 */}
          {/* `text-primary`: プライマリカラーを適用 */}
          <h1 className="font-['Pacifico'] text-xl text-primary">
            Craft Beer Passbook
          </h1>
        </div>
        {/* 右側のセクション（通知アイコン） */}
        {/* `w-8 h-8`: 幅と高さを8に設定 */}
        {/* `flex items-center justify-center`: アイコンを中央に配置 */}
        {/* `cursor-pointer`: カーソルをポインターに変更し、クリック可能であることを示す */}
        <Link
          href="/passbook/user"
          className="w-8 h-8 flex items-center justify-center cursor-pointer"
        >
          <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
            {/* リミックスアイコン（通知アイコン） */}
            {/* `text-gray-600`: グレーの色を適用 */}
            {/* `text-xl`: テキストサイズをxlに設定 */}
            <i className="ri-id-card-line text-gray-600 text-xl"></i>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
