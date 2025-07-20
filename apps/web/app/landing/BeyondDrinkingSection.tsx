import React from 'react';

const BeyondDrinkingSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              ただ飲むだけじゃない
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              クラフトビールパスブックは、単なる「飲む」という行為を、意味のある発見の旅へと変えます。それは場所の雰囲気、人とのつながり、そして何よりも道中で作り出す思い出についてのものです。
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <i className="ri-check-line text-white text-sm"></i>
                </div>
                <span className="text-gray-700">
                  異なる場所ごとにユニークなパスブックデザインを集める
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <i className="ri-check-line text-white text-sm"></i>
                </div>
                <span className="text-gray-700">
                  成長する銀行口座のようにビール旅を記録する
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <i className="ri-check-line text-white text-sm"></i>
                </div>
                <span className="text-gray-700">
                  興味を持った人たちとの自然な会話を始める
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <i className="ri-check-line text-white text-sm"></i>
                </div>
                <span className="text-gray-700">
                  味覚を超えた思い出を保存する
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://readdy.ai/api/search-image?query=elegant%20craft%20beer%20passbook%20collection%2C%20multiple%20leather%20bound%20journals%20with%20different%20designs%2C%20brewery%20stamps%20and%20stickers%2C%20vintage%20aesthetic%2C%20warm%20golden%20lighting%2C%20collector%20items%20display%2C%20premium%20quality%20materials&width=600&height=600&seq=passbook001&orientation=squarish"
              alt="パスブックコレクション"
              className="w-full rounded-2xl shadow-xl object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeyondDrinkingSection;