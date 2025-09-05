import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

const Stairs = (props) => {
    const transitionRef = useRef(null);
    const pageRef = useRef(null);
    const location = useLocation();

    useGSAP(() => {
        // --- Animate the new page content into view ---
        // 1. Immediately hide the new page content to prevent flashes
        gsap.set(pageRef.current, { opacity: 0 });

        const tl = gsap.timeline();

        // --- Transition OUT (Cover the old page) ---
        // 2. Animate the panels sliding up from the bottom
        tl.fromTo('.transition-panel', 
            { yPercent: 100 }, 
            { 
                yPercent: 0, 
                duration: 0.2, 
                stagger: 0.07, 
                ease: 'power2.inOut' 
            }
        );

        // 3. While the screen is covered, fade in the new page content underneath
        // This ensures it's ready to be revealed without any flicker
        tl.to(pageRef.current, { 
            opacity: 1, 
            duration: 0.2
        }, "-=0.2"); // Overlap with the end of the "in" animation

        // --- Transition IN (Reveal the new page) ---
        // 4. Animate the panels sliding away to the top
        tl.to('.transition-panel', {
            yPercent: -100,
            duration: 0.2,
            stagger: 0.07,
            ease: 'power2.inOut'
        });

    }, [location.pathname]); // The animation re-runs on every route change

    return (
        <div className="page-wrapper"> 
            {/* The transition overlay is fixed and will not affect page layout */}
            <div
                ref={transitionRef}
                className="h-screen w-full fixed z-50 top-0 left-0 pointer-events-none"
            >
                <div className='h-full w-full flex'>
                    <div className='transition-panel h-full w-1/5 bg-amber-200'></div>
                    <div className='transition-panel h-full w-1/5 bg-amber-300'></div>
                    <div className='transition-panel h-full w-1/5 bg-amber-400'></div>
                    <div className='transition-panel h-full w-1/5 bg-amber-500'></div>
                    <div className='transition-panel h-full w-1/5 bg-amber-600'></div>
                </div>
            </div>

            {/* The page content. The 'key' is essential for re-triggering animations on route change. */}
            <div ref={pageRef} key={location.pathname}>
                {props.children}
            </div>
        </div>
    );
};

export default Stairs;