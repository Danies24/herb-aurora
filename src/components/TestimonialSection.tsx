"use client";

import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";

type Testimonial = {
  _id: string;
  name: string;
  place: string;
  rating: number;
  text: string;
};

interface Props {
  testimonials: Testimonial[];
}

const TestimonialSection = ({ testimonials }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!testimonials.length) return;

    timeoutRef.current = setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setAnimating(false);
      }, 400);
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, testimonials.length]);

  const goToTestimonial = (index: number) => {
    if (index === currentIndex) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setAnimating(false);
    }, 400);
  };

  if (!testimonials.length) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center text-primary/60">
          Loading testimonials...
        </div>
      </section>
    );
  }

  const testimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary font-['Playfair_Display'] mb-4">
            Happy Customers
          </h2>
          <p className="text-lg text-primary/70">
            See what our customers say about their natural skincare journey
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-white shadow-xl rounded-2xl min-h-[280px] flex items-center overflow-hidden">
          <div
            className={`p-8 sm:p-16 text-center transition-all duration-500 ease-in-out ${
              animating
                ? "opacity-0 translate-x-10"
                : "opacity-100 translate-x-0"
            }`}
          >
            {/* Rating */}
            <div className="flex justify-center mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-accent fill-current" />
              ))}
            </div>

            {/* Text */}
            <blockquote className="text-lg text-primary/80 leading-relaxed mb-6 px-2 sm:px-12">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>

            {/* Author */}
            <cite className="block text-xl font-semibold text-primary font-['Playfair_Display']">
              - {testimonial.name} ({testimonial.place})
            </cite>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-3">
          {testimonials?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer shadow-md ${
                index === currentIndex
                  ? "bg-primary/80 scale-110 shadow-lg"
                  : "bg-primary/40 hover:bg-primary/60"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
