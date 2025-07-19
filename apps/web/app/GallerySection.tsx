import React from 'react';

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            旅を体験する
          </h2>
          <p className="text-xl text-gray-600">
            他の人々がどのようにビールの思い出を築いているかをご覧ください
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src="https://readdy.ai/api/search-image?query=craft%20beer%20tasting%20journal%20with%20handwritten%20notes%2C%20vintage%20leather%20bound%20notebook%2C%20amber%20colored%20beer%20glass%2C%20warm%20lighting%2C%20cozy%20atmosphere%2C%20personal%20memories%20documentation%2C%20artistic%20photography&width=400&height=300&seq=gallery001&orientation=landscape"
              alt="ビールジャーナル"
              className="w-full h-48 object-cover object-top"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                個人の物語
              </h3>
              <p className="text-gray-600">
                すべてのエントリーが、発見と味のユニークな物語を語ります。
              </p>
            </div>
          </div>

          <div
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src="https://readdy.ai/api/search-image?query=collection%20of%20colorful%20craft%20beer%20bottle%20labels%20arranged%20artistically%2C%20various%20brewery%20designs%2C%20vintage%20and%20modern%20styles%20mixed%2C%20warm%20lighting%2C%20collector%20display%2C%20beer%20enthusiast%20collection&width=400&height=300&seq=gallery002&orientation=landscape"
              alt="ビールコレクション"
              className="w-full h-48 object-cover object-top"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                増え続けるコレクション
              </h3>
              <p className="text-gray-600">
                新しい発見ごとに、あなたのビールライブラリーが拡大するのをご覧ください。
              </p>
            </div>
          </div>

          <div
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src="https://readdy.ai/api/search-image?query=friends%20sharing%20craft%20beers%20at%20brewery%20table%2C%20social%20gathering%2C%20laughing%20and%20talking%2C%20warm%20ambient%20lighting%2C%20beer%20glasses%20clinking%2C%20community%20atmosphere%2C%20memorable%20moments&width=400&height=300&seq=gallery003&orientation=landscape"
              alt="ソーシャル体験"
              className="w-full h-48 object-cover object-top"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                共有された瞬間
              </h3>
              <p className="text-gray-600">
                他のビール愛好家とつながり、思い出を作りましょう。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;