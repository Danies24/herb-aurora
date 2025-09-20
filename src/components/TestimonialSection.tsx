"use client";

import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Nisha (Ettaiyapuram)",
    rating: 5,
    text: "Hi Herb Aurora 😇 unagaloda herbal bathing powder super ah irunthuchu face um nalla soft and clean ah aagiruchu. Ennoda boy baby kum use pannaen, soft ah glowing ah skin change aagiruchu. Really love this product 🫂",
  },
  {
    id: 2,
    name: "Jeeva (Sattur)",
    rating: 5,
    text: "Hi Herb Aurora bro, unga product first purchase pandra apa romba doubt iruthuchu... result tharuma nu... but nejama face avlo glow ahgirchu within a week. I can feel changes romba soft ah iruku kandipa re purchase panuven 👍👍👍",
  },
  {
    id: 3,
    name: "Karthika (Thanjavur)",
    rating: 5,
    text: "Hi pa I got the bath powder and it works really well. I’m really happy with it. Thanks for the free shipping on my first order too! I’ll definitely be ordering more soon 😊. Appreciate the quick delivery and smooth experience!",
  },
  {
    id: 4,
    name: "Prasana (Coimbatore)",
    rating: 5,
    text: "Herb Aurora bathing powder really good! Removes black spots within a week, brighten and softens my skin. Really I like these products 😍",
  },
  {
    id: 5,
    name: "Vada malar (Coimbatore)",
    rating: 5,
    text: "Product nalla irunthuchi pa.. Black spot la pothu konjam konjam ah and gud product pa. Thank you so much🤎🤩",
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide effect
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setAnimating(false);
      }, 400);
    }, 10000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  const goToTestimonial = (index: number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setAnimating(false);
    }, 400);
  };

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
        <div className="relative bg-background shadow-xl rounded-2xl min-h-[280px] flex items-center overflow-hidden">
          <div
            className={`p-8 sm:p-16 text-center transition-all duration-400 ease-in-out ${
              animating
                ? "opacity-0 translate-x-10"
                : "opacity-100 translate-x-0"
            }`}
          >
            {/* Rating */}
            <div className="flex justify-center mb-4">
              {Array.from({ length: testimonials[currentIndex].rating }).map(
                (_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                )
              )}
            </div>

            {/* Text */}
            <blockquote className="text-lg text-primary/80 leading-relaxed mb-6 px-2 sm:px-12">
              &ldquo;{testimonials[currentIndex].text}&rdquo;
            </blockquote>

            {/* Author */}
            <cite className="block text-xl font-semibold text-primary font-['Playfair_Display']">
              - {testimonials[currentIndex].name}
            </cite>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-4 h-4 rounded-full transition-all cursor-pointer shadow-md ${
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
