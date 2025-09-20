import React, { useState, useRef, useEffect } from 'react';
import Video from '../components/home/Video';
import HomeHeroText from '../components/home/HomeHeroText';
import HomeBottomText from '../components/home/HomeBottomText';

const Home = () => {
  // --- START: MUSIC PLAYER LOGIC ---
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // This function handles playing or pausing the music
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        // Handle cases where autoplay is blocked by the browser
        console.error("Audio playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  // This attempts to play music when the page loads
  useEffect(() => {
    // A short delay can help ensure the element is ready
    setTimeout(() => {
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(error => {
                // Autoplay was prevented. User will need to click the button.
                console.warn("Background music autoplay was prevented by the browser.");
                setIsPlaying(false);
            });
        }
    }, 100);

    // Cleanup: pause music if the user navigates away
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []); // The empty array ensures this runs only once on component mount

  // --- END: MUSIC PLAYER LOGIC ---

  return (
    <div>
      {/* --- AUDIO ELEMENT & CONTROL BUTTON --- */}
      <audio ref={audioRef} src="/sampa.mp3" loop />
      <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 p-3 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-transform hover:scale-110 active:scale-95"
          aria-label={isPlaying ? "Pause music" : "Play music"}
      >
          {isPlaying ? (
              // Pause Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
              // Play Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
      </button>

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