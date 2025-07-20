import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="font-['Pacifico'] text-2xl mb-4">ロゴ</div>
            <p className="text-gray-400 leading-relaxed">
              あなた専用のビール旅の相棒として、あらゆるクラフトビール体験を大切な思い出に変えましょう。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">製品</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  機能
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  使い方
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  料金
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  よくある質問
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">企業情報</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  会社概要
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  ブログ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  採用情報
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">つながる</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <i className="ri-twitter-line"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <i className="ri-instagram-line"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <i className="ri-facebook-line"></i>
              </a>
            </div>
          </div>
        </div>

        <div
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2025 Craft Beer Passbook. 全ての権利を保有します。</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;