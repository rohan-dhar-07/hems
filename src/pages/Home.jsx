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

      {/* 2. A new container allows the content to scroll freely */}
      <div className='relative'>
        {/* The first section of your page */}
        <HomeHeroText />
        
        {/* The second section, which will now be visible on scroll */}
        <HomeBottomText />
      </div>
    </div>
  );
};

export default Home;

