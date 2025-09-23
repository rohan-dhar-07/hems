import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { Power3 } from 'gsap';

// --- NEW COMPONENT: The Animated Overlay ---
// This component contains the entire full-screen view and its animation.
const ExploreOverlay = ({ onClose, triggerRect }) => {
    const overlayRef = useRef(null);

    // This timeline controls the entire open/close sequence.
    useGSAP(() => {
        // We start the animation from the position of the button that was clicked.
        gsap.set(overlayRef.current, {
            top: triggerRect.top,
            left: triggerRect.left,
            width: triggerRect.width,
            height: triggerRect.height,
        });

        const tl = gsap.timeline();
        tl.to(overlayRef.current, {
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            borderRadius: 0,
            duration: 0.8,
            ease: Power3.easeInOut,
        })
        .fromTo('.explore-content-inner > *', {
            opacity: 0,
            y: 30,
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: Power3.easeOut,
        }, "-=0.3"); // Overlap animations for a smoother feel
    }, { dependencies: [triggerRect] });

    // This handles the closing animation.
    const handleClose = () => {
        gsap.timeline({ onComplete: onClose }) // Call the onClose prop when animation is done
            .to('.explore-content-inner > *', {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.4,
                ease: Power3.easeIn,
            })
            .to(overlayRef.current, {
                top: triggerRect.top,
                left: triggerRect.left,
                width: triggerRect.width,
                height: triggerRect.height,
                borderRadius: '9999px',
                duration: 0.7,
                ease: Power3.easeInOut,
            }, "-=0.2");
    };
    
    return (
        <div ref={overlayRef} className="fixed bg-black overflow-hidden z-50 rounded-full">
            <div className="relative w-full h-full flex flex-col justify-center items-center text-white p-8">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    src="https://videos.pexels.com/video-files/4692040/4692040-hd_1920_1080_25fps.mp4"
                    autoPlay loop muted playsInline
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
                
                <div className="explore-content-inner relative z-20 text-center flex flex-col items-center">
                    <h2 className="font-serif text-5xl md:text-7xl font-bold mb-4">Your Vision, Our Oven</h2>
                    <p className="max-w-xl text-lg md:text-xl mb-8">From elegant wedding cakes to whimsical birthday treats, we bake your dreams into reality.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/custom" className="bg-pink-600 hover:bg-pink-700 font-semibold py-3 px-8 rounded-full transition-colors shadow-lg">
                            Start Your Custom Order
                        </Link>
                        <Link to="/gallery" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm font-semibold py-3 px-8 rounded-full transition-colors">
                            View Past Creations
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleClose}
                    className="explore-content-inner absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors z-30"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        </div>
    );
};


// --- The Main Button Component ---
// This is now just a trigger. It's much simpler.
const ExploreCustomOrder = () => {
    const buttonRef = useRef(null);
    const [isExploring, setIsExploring] = useState(false);
    const [triggerRect, setTriggerRect] = useState(null);

    const handleExploreClick = () => {
        const rect = buttonRef.current.getBoundingClientRect();
        setTriggerRect(rect);
        setIsExploring(true);
    };

    const handleClose = () => {
        setIsExploring(false);
    };

    return (
        <>
            <button
                ref={buttonRef}
                className="relative w-72 h-20 bg-yellow-500 rounded-full flex justify-center items-center cursor-pointer shadow-2xl overflow-hidden text-2xl text-white font-bold"
                onClick={handleExploreClick}
            >
                Explore Custom Orders
            </button>

            {isExploring && <ExploreOverlay onClose={handleClose} triggerRect={triggerRect} />}
        </>
    );
};

export default ExploreCustomOrder;