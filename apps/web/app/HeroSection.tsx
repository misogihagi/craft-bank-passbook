import React from 'react';

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center w-full"
      style={{
        backgroundImage: 'url(\'https://readdy.ai/api/search-image?query=cozy%20craft%20beer%20bar%20interior%20with%20warm%20amber%20lighting%2C%20wooden%20tables%2C%20beer%20taps%20in%20background%2C%20soft%20golden%20glow%2C%20atmospheric%20mood%2C%20left%20side%20empty%20space%20for%20text%20overlay%2C%20right%20side%20showing%20beer%20bottles%20and%20brewing%20equipment%2C%20professional%20photography%20style%2C%20warm%20color%20palette&width=1920&height=1080&seq=hero001&orientation=landscape\')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Your Personal<br />
            <span className="text-primary">Beer Journey</span><br />
            Starts Here
          </h1>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Transform every craft beer experience into a treasured memory. The
            Craft Beer Passbook is your digital companion for collecting,
            recording, and reliving the stories behind every sip.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="bg-primary text-black px-8 py-4 !rounded-button font-semibold text-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Download Now
            </button>
            <button
              className="border-2 border-white text-white px-8 py-4 !rounded-button font-semibold text-lg hover:bg-white hover:text-black transition-colors whitespace-nowrap"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;