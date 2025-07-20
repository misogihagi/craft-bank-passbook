import React from 'react';

const DownloadSection = () => {
  return (
    <section id="download" className="py-20 bg-primary/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          今日からあなたのビール旅を始めましょう
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          クラフトビールパスブックをダウンロードして、一生残る思い出を作り始めましょう。あなた個人のビールヒストリーが待っています。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            className="bg-black text-white px-8 py-4 !rounded-button font-semibold text-lg hover:bg-gray-800 transition-colors whitespace-nowrap flex items-center justify-center space-x-2"
          >
            <i className="ri-apple-line text-xl"></i>
            <span>iOSでダウンロード</span>
          </button>
          <button
            className="bg-black text-white px-8 py-4 !rounded-button font-semibold text-lg hover:bg-gray-800 transition-colors whitespace-nowrap flex items-center justify-center space-x-2"
          >
            <i className="ri-google-play-line text-xl"></i>
            <span>Androidでダウンロード</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
            <div className="text-gray-600">アクティブユーザー</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-gray-600">記録されたビール</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
            <div className="text-gray-600">App Store評価</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;