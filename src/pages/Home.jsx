import React from 'react';
import Video from '../components/home/Video';
import HomeHeroText from '../components/home/HomeHeroText';
import HomeBottomText from '../components/home/HomeBottomText';

const Home = () => {
  return (
    <div>
      {/* 1. The background video remains fixed and behind everything */}
      <div className='h-screen w-screen fixed top-0 left-0 -z-10'>
        <Video />
      </div>

      {/* 2. This container holds all the scrollable content */}
      <div className='relative'>
        {/* The first section of your page */}
        <HomeHeroText />
        
        {/* The second section, which will now be visible on scroll */}
        <HomeBottomText />

        {/* The footer is the last item in the scrollable content */}
        <footer className="bg-amber-900 text-amber-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xl mb-4">Humble Bakery</p>
            <p className="mb-6">Fresh baked goods made with love</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-amber-200 hover:text-white">Instagram</a>
              <a href="#" className="text-amber-200 hover:text-white">Facebook</a>
              <a href="#" className="text-amber-200 hover:text-white">Twitter</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;

