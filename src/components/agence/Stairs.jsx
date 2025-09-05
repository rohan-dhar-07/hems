import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

const Stairs = (props) => {
    const stairParentRef = useRef(null);
    const pageRef = useRef(null);
    const location = useLocation();

    useGSAP(() => {
        const tl = gsap.timeline();

        // --- Transition OUT (Cover the old page) ---
        // Instantly make the overlay visible
        tl.set(stairParentRef.current, { display: 'block' });
        
        // Animate the stairs expanding from top to bottom
        tl.fromTo('.stair', 
            { height: '0%' }, 
            {
                height: '100%',
                duration: 0.4,
                ease: 'power2.inOut',
                stagger: {
                    amount: 0.2 // Left-to-right stagger
                }
            }
        );

        // --- Transition IN (Reveal the new page) ---
        // Wait a moment, then animate the stairs retracting
        tl.to('.stair', {
            height: '0%',
            duration: 0.4,
            ease: 'power2.inOut',
            stagger: {
                amount: -0.2 // Right-to-left stagger for a nice effect
            }
        }, "+=0.3"); // A brief pause before the reveal

        // Hide the overlay completely after the animation
        tl.set(stairParentRef.current, { display: 'none' });

        // --- Animate the new page content into view ---
        // This runs after the stairs have started to retract
        gsap.from(pageRef.current, {
            opacity: 0,
            duration: 0.5,
            delay: 0.7, // This delay should match the timing of the stair animation
            ease: 'power1.inOut'
        });

    }, [location.pathname]); // The animation re-runs on every route change

    return (
        // A single root div is needed to contain both the overlay and the page
        <div className="page-wrapper"> 
            
            {/* The transition overlay is fixed and will not affect page layout */}
            <div ref={stairParentRef} className='h-screen w-full fixed z-50 top-0 left-0 pointer-events-none hidden'>
                <div className='h-full w-full flex'>
                    {/* I've added different shades that match your bakery's theme */}
                    <div className='stair h-full w-1/5 bg-red-200'></div>
                    <div className='stair h-full w-1/5 bg-red-300'></div>
                    <div className='stair h-full w-1/5 bg-red-400'></div>
                    <div className='stair h-full w-1/5 bg-red-500'></div>
                    <div className='stair h-full w-1/5 bg-red-600'></div>
                </div>
            </div>

            {/* The page content. The key is essential for re-triggering animations on route change. */}
            <div ref={pageRef} key={location.pathname}>
                {props.children}
            </div>
        </div>
    );
};

export default Stairs;
