import React from 'react';

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ご利用方法
          </h2>
          <p className="text-xl text-gray-600">
            あなたのビール旅を始めるための簡単なステップ
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div
                className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              >
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  発見とテイスティング
                </h3>
                <p className="text-gray-600">
                  醸造所、バー、イベントで新しいクラフトビールを見つけましょう。その体験をじっくり味わってみてください。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div
                className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              >
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  記録と思い出
                </h3>
                <p className="text-gray-600">
                  ビールラベルを記録し、体験を評価し、あなたの感想や思い出を書き留めましょう。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div
                className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              >
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  収集と成長
                </h3>
                <p className="text-gray-600">
                  個人のビール履歴が成長するのを見守りましょう。アチーブメントをアンロックし、ユニークなパスブックデザインを集めましょう。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div
                className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              >
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  共有とつながり
                </h3>
                <p className="text-gray-600">
                  あなたのパスブックが会話のきっかけとなり、他のビール愛好家とつながりましょう。
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://readdy.ai/api/search-image?query=modern%20smartphone%20displaying%20craft%20beer%20tracking%20app%20interface%2C%20clean%20UI%20design%20with%20warm%20amber%20and%20golden%20colors%2C%20beer%20bottle%20photos%20in%20grid%20layout%2C%20professional%20product%20photography%2C%20white%20background%2C%20high%20quality%20mobile%20app%20mockup&width=600&height=800&seq=app001&orientation=portrait"
              alt="App Interface"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;