// HomeHeroText.jsx

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar from './Navbar';
import ExploreButton from './ExploreButton';


gsap.registerPlugin(ScrollTrigger);

const FlourishIcon = () => (
    <svg className="w-24 h-24 text-amber-100/10" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50,0 C60,20 80,30 100,50 C80,60 60,80 50,100 C40,80 20,60 0,50 C20,30 40,20 50,0 Z" />
    </svg>
);

const HomeHeroText = () => {
    const container = useRef(null);

    // [All your existing GSAP animations and handlers]
    // Note: You can add a new GSAP animation for '.anim-bakes-button' if you want it to animate in.

    return (
        <div ref={container} className='font-["font1"] relative min-h-screen w-full flex flex-col justify-center items-center text-amber-50 overflow-hidden' style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
            
            <div className="absolute top-0 left-0 w-full z-20">
                <Navbar />
            </div>

            <div className="absolute inset-0 z-0">
                <div className="parallax-layer floating-item absolute top-[20%] left-[15%]"><FlourishIcon/></div>
                <div className="parallax-layer floating-item absolute bottom-[15%] right-[20%] opacity-50"><FlourishIcon/></div>
            </div>
            
            <div className="hero-content relative z-10 flex flex-col items-center justify-center w-full">
                <div className="text-center parallax-layer">
                    <h1 className="text-[18vw] md:text-[15vw] font-bold tracking-tighter uppercase leading-none overflow-hidden py-4 md:py-8">
                        <span className="inline-block anim-letter">H</span>
                        <span className="inline-block anim-letter">E</span>
                        <span className="inline-block anim-letter">M</span>
                        <span className="inline-block anim-letter">S</span>
                    </h1>
                    <p className="anim-tagline text-2xl md:text-3xl font-['font2'] -mt-6 md:-mt-8 tracking-wide">
                        Humble Eats, Majestic Servings
                    </p>
                </div>
                
                {/* Your existing Explore button */}
                <div className="anim-order-button mt-12 flex justify-center parallax-layer">
                    <ExploreButton />
                </div>
                
                {/* --- NEW BUTTON ADDED BELOW --- */}
                <div className="anim-bakes-button mt-6 flex justify-center parallax-layer">
                    <Link to="/our-bakes" className="font-['font2'] text-lg bg-transparent border border-amber-100/50 text-amber-50 py-3 px-8 rounded-full hover:bg-amber-50 hover:text-stone-900 transition-all duration-300 ease-in-out">
                        Our Bakes
                    </Link>
                </div>
                {/* --- END OF NEW BUTTON --- */}

                <div className='anim-bottom-text mt-16 font-["font2"] text-center parallax-layer'>
                    <p className="text-lg md:text-xl tracking-wider px-4">
                        Baked daily with the finest ingredients and a touch of love.
                    </p>
                </div>
            </div>

            <div className="scroll-indicator absolute bottom-8 z-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </div>
        </div>
    );
};

export default HomeHeroText;