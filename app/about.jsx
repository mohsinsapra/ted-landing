'use client'

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'; // Correct import for Next.js environment

// Register ScrollTrigger plugin once
if (typeof window !== 'undefined') { // Ensure it runs only on client-side
  gsap.registerPlugin(ScrollTrigger);
}

const AboutPage = () => {
  const cardRef = useRef(null); // Ref for the main card container

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    // Set initial state before animation
    gsap.set(cardRef.current, { scale: 0.8, opacity: 0 }); // Start smaller and invisible

    // Create the ScrollTrigger animation for the card
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%", // Start animation when the top of the card is 85% down the viewport
        end: "top 50%",   // End animation when the top of the card is 50% down the viewport
        scrub: true,      // Smoothly link animation to scroll position
        // markers: true, // Uncomment for debugging scroll trigger points
      }
    });

    tl.to(cardRef.current, {
      scale: 1,      // Animate to original size
      opacity: 1,    // Animate to fully visible
      ease: "power1.out"
    });

    // Cleanup function
    return () => {
      tl.kill(); // Kills the timeline and its associated ScrollTrigger
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 font-inter relative overflow-hidden">
      {/* Optional: Subtle dark gradient at top and bottom to match original page's feel */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-950 to-transparent opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-950 to-transparent opacity-50 z-0"></div>

      <div className="container mx-auto px-6 py-16 flex items-center justify-center min-h-screen relative z-10">
        {/* Main Content Card - Add ref here */}
        <div ref={cardRef} className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col lg:flex-row">
          {/* Left Side: Image */}
          <div className="lg:w-1/2 flex-shrink-0">
            <img
              src="https://placehold.co/800x600/D9D9D9/333333?text=Product+Crafting"
              alt="Hands crafting a metallic speaker component"
              className="w-full h-full object-cover lg:rounded-l-3xl lg:rounded-tr-none rounded-t-3xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/800x600/D9D9D9/333333?text=Image+Not+Found";
              }}
            />
          </div>

          {/* Right Side: Text Content */}
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
              A WORK OF UNREPEATABLE BEAUTY
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-6">
              Crafted in high-grade aluminium with incredible attention to detail. But our material choice go well beyond aesthetics.
            </p>
            <p className="text-sm md:text-base text-gray-600 mb-8">
              It also provides superior acoustic properties thanks to its material stiffness and seamless surfaces that eliminate any distortion of your sound.
            </p>
            <button className="bg-black text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800 transition duration-300 flex items-center justify-center lg:justify-start mx-auto lg:mx-0 w-max">
              LEARN MORE
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
