"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const heroImages = [
  "/images/heroBanner/heroBanner1.png",
  "/images/heroBanner/heroBanner2.png",
  "/images/heroBanner/heroBanner3.png",
  "/images/heroBanner/heroBanner4.png",
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide effect
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        setAnimating(false);
      }, 400);
    }, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  const goToImage = (index: number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setAnimating(false);
    }, 400);
  };

  return (
    <section className="relative w-screen h-[60vh] mt-16 overflow-hidden bg-gradient-to-r from-herb-green to-secondary">
      {/* Carousel Container */}
      <div className="relative w-full h-full min-h-[60vh]">
        {heroImages.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-400 ${
              idx === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <Image
              src={img}
              alt={`Hero Banner ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}

        {/* Decorative dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              aria-label={`Go to banner ${index + 1}`}
              className={`relative w-3.5 h-3.5 rounded-full border-2 border-herb-turmeric shadow-md transition 
                ${
                  index === currentIndex
                    ? "bg-herb-turmeric shadow-[0_4px_16px] shadow-herb-turmeric-dark"
                    : "bg-herb-cream/50"
                }`}
            >
              {/* outer glow when active */}
              {index === currentIndex && (
                <span className="absolute inset-0 w-5 h-5 -translate-x-1 -translate-y-1 rounded-full bg-herb-turmeric opacity-20 scale-110" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
