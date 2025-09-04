import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Video from './video2';
import Video2 from './Video3';
// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const HomeBottomText = () => {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 60%', // Start animation when the top of the section is 60% down the viewport
        toggleActions: 'play none none none'
      }
    });

    // Animation sequence for the entire section
    tl.from('.anim-reveal', {
      y: 70,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });
    
    // Parallax effect for the videos
    gsap.utils.toArray('.video-parallax').forEach(video => {
      gsap.to(video, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: video.parentElement,
          scrub: true,
          start: "top bottom",
          end: "bottom top",
        },
      });
    });

  }, { scope: container });

  return (
    <div className='py-50'>
    <div ref={container} className="relative w-full text-amber-50" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)' }}>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
           
          {/* Right Side: Video Grid */}
          <div className="grid grid-cols-2 gap-14">
            <div className="overflow-hidden rounded-2xl shadow-lg anim-reveal">
              {/* Vibrant Coca-Cola Video */}
              <Video 
                className="w-full h-full object-cover video-parallax" 
                autoPlay 
                loop 
                muted 
                playsInline
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg anim-reveal">
               {/* Vibrant Lifestyle Video */}
              <Video2 
                className="w-full h-full object-cover video-parallax"
                autoPlay 
                loop 
                muted 
                playsInline
              />
            </div>
          </div>

          {/* Left Side: Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-['font1'] font-bold leading-tight anim-reveal">
              Fresh Bakes &<br />Cool Sips
            </h2>
            <p className="mt-4 text-lg md:text-xl font-['font2'] anim-reveal">
              Every majestic serving deserves the perfect pairing. Enjoy the classic, refreshing taste of Coca-Cola with our delicious, humble eats. It's the perfect recipe for a happy moment.
            </p>
            <div className="mt-8 anim-reveal">
              <Link to="/order">
                <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105">
                  Explore Flavors
                </button>
              </Link>
            </div>
          </div>

          

        </div>
      </div>
    </div>
    </div>
  );
};

export default HomeBottomText;

