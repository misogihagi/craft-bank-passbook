import React from 'react';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            単なる記録以上のもの
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            すべてのビールには物語があります。すべての物語は記憶されるに値します。「Craft Beer Passbook」があなたの飲酒体験を思い出の旅に変える方法をご覧ください。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <i className="ri-book-3-line text-2xl text-primary"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              思い出の収集
            </h3>
            <p className="text-gray-600 leading-relaxed">
              何を飲んだかだけでなく、どこで、いつ、誰と飲んだかを記録しましょう。それぞれのビールを特別なものにした雰囲気、会話、感情を捉えます。
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <i className="ri-trophy-line text-2xl text-primary"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              アチーブメントシステム
            </h3>
            <p className="text-gray-600 leading-relaxed">
              あなたのビール旅が貯蓄口座のように成長するのを見守りましょう。クラフトビール冒険の進捗を追跡し、アチーブメントをアンロックし、マイルストーンを祝います。
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <i className="ri-group-line text-2xl text-primary"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ソーシャルディスカバリー
            </h3>
            <p className="text-gray-600 leading-relaxed">
              あなたのパスブックは会話のきっかけになります。発見を共有し、おすすめを入手し、ビールの愛好家と自然につながりましょう。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;