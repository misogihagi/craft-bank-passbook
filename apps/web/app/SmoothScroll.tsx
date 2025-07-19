"use client";
import { useEffect } from "react";

const SmoothScroll = () => {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId =(e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (!targetId) return; // hrefがない場合は何もしない
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // クリーンアップ関数（コンポーネントがアンマウントされたときにイベントリスナーを削除）
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", () => {}); // 適切なリスナーを削除する
      });
    };
  }, []); // 空の依存配列により、マウント時に一度だけ実行

  return null; // このコンポーネント自体は何もレンダリングしません
};

export default SmoothScroll;