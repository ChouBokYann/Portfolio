"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const photos = [
  "/images/fillerPhoto-1.jpg",
  "/images/fillerPhoto-2.jpg",
  // Add more placeholder images as needed
];

const skillsets = [
  { name: "Software Development", projects: 12 },
  { name: "Machine Learning", projects: 8 },
  { name: "Data Science", projects: 6 },
  { name: "Photography", projects: 3 },
];

// Sort skillsets by projects descending
const sortedSkillsets = [...skillsets].sort((a, b) => b.projects - a.projects);

export default function HeroSection() {
  // Accordion state
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const hoverTimeout = useRef(null);

  // Bubble animation state
  const [bubblePositions, setBubblePositions] = useState(
    sortedSkillsets.map((_, i) => ({ x: 50, y: 20 + i * 20 }))
  );

  // Bubble sway animation effect
  useEffect(() => {
    let animationFrame;
    const startRef = { current: performance.now() };
    function animate(now) {
      const elapsed = (now - startRef.current) / 1000; // seconds
      setBubblePositions(
        sortedSkillsets.map((_, i) => {
          // Each bubble has a phase offset for lag
          const phase = i * 0.7;
          // Sway between 30% and 70% horizontally
          const x = 50 + 20 * Math.sin(elapsed * 1.2 - phase);
          // Vertically stack: largest font at top
          const y = 20 + i * 20;
          return { x, y };
        })
      );
      animationFrame = requestAnimationFrame(animate);
    }
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [sortedSkillsets.length]);

  // Accordion hover handlers
  const handleEdgeHover = (direction) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setCurrentPhoto((prev) => {
        if (direction === "left") {
          return prev === 0 ? photos.length - 1 : prev - 1;
        } else {
          return prev === photos.length - 1 ? 0 : prev + 1;
        }
      });
    }, 600); // 600ms delay
  };

  const handleEdgeLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  };

  // Responsive number of photos to show
  const getVisiblePhotos = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1280) return 3; // xl
    if (window.innerWidth >= 768) return 2; // md
    return 1;
  };
  const [visiblePhotos, setVisiblePhotos] = useState(getVisiblePhotos());
  useEffect(() => {
    const handleResize = () => setVisiblePhotos(getVisiblePhotos());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate which photos to show
  const getPhotoIndexes = () => {
    if (visiblePhotos === 1) return [currentPhoto];
    const indexes = [currentPhoto];
    let left = currentPhoto - 1;
    let right = currentPhoto + 1;
    while (indexes.length < visiblePhotos) {
      if (left >= 0) indexes.unshift(left--);
      if (indexes.length < visiblePhotos && right < photos.length) indexes.push(right++);
      if (left < 0 && right >= photos.length) break;
    }
    return indexes;
  };

  // Responsive font size for skillsets
  const getBaseFontSize = () => {
    if (typeof window === 'undefined') return 24;
    // Use container width to determine base font size
    const width = window.innerWidth;
    if (width >= 1280) return 38; // xl
    if (width >= 1024) return 32; // lg
    if (width >= 768) return 26; // md
    return 18; // sm
  };
  const [baseFontSize, setBaseFontSize] = useState(getBaseFontSize());
  useEffect(() => {
    const handleResize = () => setBaseFontSize(getBaseFontSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper to calculate max font size for a skillset so it fits in one line
  const skillsetContainerRef = useRef(null);
  function getFittingFontSize(text, desiredFontSize, padding = 32) {
    if (!skillsetContainerRef.current) return desiredFontSize;
    const containerWidth = skillsetContainerRef.current.offsetWidth - padding;
    // Create a temporary span to measure text width
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.fontWeight = 'bold';
    span.style.fontSize = desiredFontSize + 'px';
    span.style.fontFamily = 'inherit';
    span.innerText = text;
    document.body.appendChild(span);
    let fontSize = desiredFontSize;
    while (span.offsetWidth > containerWidth && fontSize > 12) {
      fontSize -= 1;
      span.style.fontSize = fontSize + 'px';
    }
    document.body.removeChild(span);
    return fontSize;
  }

  // Calculate the max fitting font size for the largest skillset
  let maxFontSize = Math.min(120, baseFontSize + (sortedSkillsets.length - 1) * 10);
  if (typeof window !== 'undefined') {
    maxFontSize = getFittingFontSize(sortedSkillsets[0].name, maxFontSize);
  }
  // Calculate total height needed for all skillsets (add some spacing between)
  const skillsetSpacing = 12; // px between each skillset
  const totalSkillsetHeight = sortedSkillsets.reduce((acc, _, i) => acc + Math.max(12, maxFontSize - i * 10) + skillsetSpacing, 0);

  return (
    <section className="w-full max-w-6xl mx-auto min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-20 py-8 px-2 md:px-8 bg-base-100">
      {/* Left: Photo Accordion */}
      <div className="relative flex items-center justify-center rounded-3xl overflow-hidden bg-base-100 w-80 md:w-[28rem] xl:w-[36rem] h-96 transition-all duration-300 mb-8 md:mb-0">
        {/* Left edge hover */}
        <div
          className="absolute left-0 top-0 w-8 h-full z-10 cursor-w-resize"
          onMouseEnter={() => handleEdgeHover("left")}
          onMouseLeave={handleEdgeLeave}
        />
        {/* Right edge hover */}
        <div
          className="absolute right-0 top-0 w-8 h-full z-10 cursor-e-resize"
          onMouseEnter={() => handleEdgeHover("right")}
          onMouseLeave={handleEdgeLeave}
        />
        <div className={`flex gap-2 w-full h-full items-center justify-center transition-all duration-300`}>
          {getPhotoIndexes().map((idx, i) => (
            <Image
              key={idx}
              src={photos[idx]}
              alt={`Photo ${idx + 1}`}
              width={visiblePhotos === 1 ? 320 : visiblePhotos === 2 ? 220 : 160}
              height={visiblePhotos === 1 ? 400 : visiblePhotos === 2 ? 320 : 220}
              className={`object-cover rounded-2xl transition-all duration-300 ${i === Math.floor(visiblePhotos/2) ? 'ring-4 ring-primary' : ''}`}
              style={{ flex: '1 1 0%' }}
            />
          ))}
        </div>
      </div>

      {/* Right: Skillset Bubbles */}
      <div
        ref={skillsetContainerRef}
        className="relative flex flex-col justify-center w-full rounded-3xl overflow-hidden bg-base-100"
        id="skillset-bubble-area"
        style={{ height: totalSkillsetHeight }}
      >
        {sortedSkillsets.map((skill, i) => {
          // Each font size is proportional to the maxFontSize
          const fontSize = Math.max(12, maxFontSize - i * 10);
          // Calculate top position for each skillset
          let top = 0;
          for (let j = 0; j < i; j++) {
            top += Math.max(12, maxFontSize - j * 10) + skillsetSpacing;
          }
          return (
            <span
              key={skill.name}
              className="absolute font-bold text-base-content bg-base-100/2 rounded-2xl px-3 py-1 select-none pointer-events-none transition-all duration-300 text-left whitespace-nowrap overflow-hidden text-ellipsis"
              style={{
                left: 0,
                top: top,
                width: '100%',
                fontSize,
                maxWidth: '100%',
              }}
              title={skill.name}
            >
              {skill.name}
            </span>
          );
        })}
      </div>
    </section>
  );
}


