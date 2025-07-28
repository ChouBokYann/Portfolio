"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const heroPhoto = "/images/hero-image.png";

export default function HeroSection() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 py-16 bg-[#454545]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Image and orange box */}
        <div className="relative flex items-center justify-center -mt-16">
          <div className="relative">
            {/* Orange rectangle behind the image */}
            <div className="absolute w-[600px] h-[160px] bg-[#FF6000] mx-auto left-1/2 transform -translate-x-1/2 bottom-0"></div>
            <Image 
              src={heroPhoto} 
              alt="Hero Photo" 
              width={500} 
              height={500}
              className="w-full h-auto max-w-md mx-auto relative z-10"
            />
          </div>
        </div>

        {/* Right side - Text content */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-7xl font-bold text-[#FFE6C7] mb-6 text-center font-headers">
            Hello! My name is Bok Yann. Welcome to my site. Feel free to find out more about me below!
          </h1>
          
          {/* Down Arrow Button */}
          <div className="text-center mt-8">
            <button 
              className="bg-[#FF6000] hover:bg-[#FFA559] text-[#FFE6C7] p-4 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-bounce-slow"
              onClick={() => {
                // Navigation logic will be added here
                console.log("Navigate to next page");
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


