"use client";
import React, { useState } from "react";

const FloatingActionButton = () => {
  const [buttonStyle, setButtonStyle] = useState({
    transform: "scale(1)",
  });

  const handleButtonClick = () => {
    setButtonStyle({
      transform: "scale(1.05)",
    });
    setTimeout(() => {
      setButtonStyle({
        transform: "scale(1)",
      });
    }, 200);
  };
  return (
    // フローティングアクションボタン (FAB) のコンテナ
    // `fixed bottom-20 right-4`: 画面下から20、右から4の位置に固定
    // `z-40`: 他の要素の上に表示されるように重なり順序を設定
    <div className="fixed bottom-20 right-4 z-40">
      {/* FABボタン本体 */}
      {/* `w-14 h-14`: 幅と高さを14に設定し、大きな円形にする */}
      {/* `bg-primary text-white`: プライマリカラーの背景と白いテキスト */}
      {/* `rounded-full`: 完全な円形にする */}
      {/* `shadow-lg`: 大きな影を追加して浮き上がって見えるようにする */}
      {/* `flex items-center justify-center`: アイコンを中央揃え */}
      {/* `cursor-pointer`: カーソルをポインターに変更 */}
      {/* `!rounded-button`: Tailwind CSSの他のスタイルを上書きして、丸いボタンを強制するカスタムクラス（CSSで定義が必要かもしれません） */}
      <button
        className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer !rounded-button"
        style={buttonStyle}
        onClick={handleButtonClick}
      >
        {/* アイコンのコンテナ */}
        <div className="w-6 h-6 flex items-center justify-center">
          {/* 追加アイコン */}
          <i className="ri-add-fill text-2xl"></i>
        </div>
      </button>
    </div>
  );
};

export default FloatingActionButton;
