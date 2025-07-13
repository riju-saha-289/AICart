import React, { useEffect, useState } from "react";
import clsx from "clsx";
import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';
import hero4 from '../assets/hero3.jpg';

const imageSlides = [hero1, hero2, hero3, hero4];

export default function HeroBackground() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imageSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative z-0 w-full min-h-screen bg-gradient-to-br from-purple-700 via-blue-700 to-indigo-800 text-white flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 py-10 gap-10">
      {/* Left Side - Heading and Dots */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-2xl">
          Discover, Shop, and Experience the Best Products
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl">
          Hand-picked images showcasing your collection. Click or wait to explore each slide.
        </p>
        <div className="flex justify-center lg:justify-start space-x-3">
          {imageSlides.map((_, index) => (
            <button
              key={index}
              className={clsx(
                "w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white transition-all duration-300",
                currentSlide === index
                  ? "bg-white scale-125 shadow-xl"
                  : "bg-white/30 hover:bg-white"
              )}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Single Image Slider */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/20 transform transition duration-700">
          <img
            src={imageSlides[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
