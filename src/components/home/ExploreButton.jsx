import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// A mock map component. Replace this with a real map library if needed.
const MapView = () => (
    <div className="w-[80vw] h-[60vh] md:w-[60vw] md:h-[80vh] bg-gray-400 rounded-xl overflow-hidden shadow-2xl">
        {/* You can embed a real map here from a library or just use an image */}
        <img 
            src="/map-of-india.png" // Replace with your image path
            alt="Map of India showing various cities"
            className="w-full h-full object-cover"
        />
    </div>
);

const ExploreButton = () => {
    const container = useRef(null);
    const [isExploring, setIsExploring] = useState(false);

    useGSAP(() => {
        if (isExploring) {
            // Animation for when the button is clicked
            gsap.timeline()
                .to(".explore-button-text", {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                })
                .to(container.current, {
                    width: '60vw', // Animate width and height to match map
                    height: '80vh',
                    duration: 1,
                    ease: "power3.inOut",
                    onComplete: () => {
                        gsap.to(".map-view", { opacity: 1, duration: 0.5 });
                    },
                }, "-=0.3")
                .to(container.current, {
                    backgroundColor: "transparent",
                    duration: 0.5
                }, "<");
        }
    }, [isExploring], { scope: container });

    const handleExploreClick = () => {
        setIsExploring(true);
    };

    return (
        <div ref={container} 
             className={`relative w-96 h-20 bg-gray-700 rounded-full flex justify-center items-center cursor-pointer 
                        transition-all duration-1000 ease-in-out shadow-2xl overflow-hidden
                        ${isExploring ? 'is-exploring' : ''}`}
             onClick={!isExploring ? handleExploreClick : null}>
            
            <div className={`absolute explore-button-text text-2xl text-white font-bold transition-opacity duration-300 ${isExploring ? 'opacity-0' : 'opacity-100'}`}>
                Explore Destinations
            </div>
            
            {/* This will be the map view that appears */}
            <div className={`absolute map-view opacity-0 ${isExploring ? 'block' : 'hidden'}`}>
                <MapView />
            </div>
        </div>
    );
};

export default ExploreButton;