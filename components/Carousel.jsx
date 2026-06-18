"use client";

import React, { useRef, useState, useEffect } from 'react';
import './Carousel.css';

// Mock Data structure for the demo
const SAMPLE_SLIDES = [
  { id: 1, title: 'First Canvas', caption: 'Eager Load Resource Focus', className: 'slide-1' },
  { id: 2, title: 'Second Canvas', caption: 'Fluid Layout System', className: 'slide-2' },
  { id: 3, title: 'Third Canvas', caption: 'Hardware Accelerated Snap', className: 'slide-3' },
];

export default function Carousel({ slides = SAMPLE_SLIDES }) {
  const trackRef = useRef(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  // Core Scroll handler monitoring native layout updates
  const updateButtonStates = () => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    const maxScroll = scrollWidth - clientWidth;

    // Use small subpixel safety margins (2px) to prevent zoom/rounding bugs
    setIsPrevDisabled(scrollLeft <= 2);
    setIsNextDisabled(scrollLeft >= maxScroll - 2);
  };

  // Attach event tracking using React lifecycles safely
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Initialize button states immediately on component mount
    updateButtonStates();

    // High performance listener configuration using passive flags
    track.addEventListener('scroll', updateButtonStates, { passive: true });
    window.addEventListener('resize', updateButtonStates);

    return () => {
      track.removeEventListener('scroll', updateButtonStates);
      window.removeEventListener('resize', updateButtonStates);
    };
  }, [slides]);

  // Click Action Interactions
  const handleScroll = (direction) => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return;

    const slideWidth = track.firstElementChild.getBoundingClientRect().width;
    const scrollAmount = direction === 'next' ? slideWidth : -slideWidth;

    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="carousel-wrapper" aria-label="Feature Showcase Gallery">
      {/* Dynamic Native Controls Mapping State Hook Targets */}
      <button 
        className="carousel-btn prev" 
        aria-label="Go to previous slide"
        onClick={() => handleScroll('prev')}
        disabled={isPrevDisabled}
      >
        &larr;
      </button>
      
      <button 
        className="carousel-btn next" 
        aria-label="Go to next slide"
        onClick={() => handleScroll('next')}
        disabled={isNextDisabled}
      >
        &rarr;
      </button>

      {/* Hardware-level Snap Scrolling Layout Element */}
      <ul className="carousel-track" ref={trackRef}>
        {slides.map((slide, index) => (
          <li key={slide.id} className="carousel-slide" tabIndex={0}>
            <div className={`placeholder-card ${slide.className}`}>
              <span>{slide.title}</span>
              <div className="slide-caption">{slide.caption}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
