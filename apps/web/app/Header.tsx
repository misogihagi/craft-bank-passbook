import React from 'react';

const Header = () => {
  return (
    <header className="bg-black text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="font-['Pacifico'] text-2xl">logo</div>
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#gallery" className="hover:text-primary transition-colors">
            Gallery
          </a>
          <a href="#download" className="hover:text-primary transition-colors">
            Download
          </a>
        </nav>
        <button className="md:hidden w-6 h-6 flex items-center justify-center">
          {/* Remixiconを使用している場合、iタグではなくspanやdivにclassNameを適用することが推奨されます */}
          <i className="ri-menu-line text-xl"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;