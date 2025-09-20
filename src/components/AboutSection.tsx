"use client";

import { CheckCircle } from "lucide-react";
import Image from "next/image";

const AboutSection = () => {
  const benefits = [
    "Natural skin glow",
    "Effective tan removal",
    "100% baby-safe",
    "Completely chemical-free",
  ];

  return (
    <section className="py-16 bg-herb-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
          {/* Content */}
          <div className="animate-fadeIn">
            <h2 className="text-4xl font-bold text-herb-green-light mb-6 leading-snug">
              Rooted in Tradition,{" "}
              <span className="text-herb-green">Made with Love</span>
            </h2>

            <p className="text-lg text-herb-green-light mb-8 leading-relaxed">
              Herb Aurora brings you the timeless wisdom of Tamil Paatti
              remedies in every handcrafted powder. Using pure ingredients like
              vetiver, rose, turmeric, and aavaram poo, we create skincare
              solutions that have been trusted for generations.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 animate-fadeIn"
                >
                  <CheckCircle className="w-5 h-5 text-herb-green flex-shrink-0" />
                  <span className="font-medium text-herb-green-light">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="animate-fadeIn delay-300">
            <div className="relative">
              <Image
                src="/images/random/aboutHomeBanner.png"
                alt="Natural herbs and flowers"
                width={800}
                height={484}
                className="w-full h-[32rem] object-cover rounded-xl shadow-2xl"
              />
              {/* Decorative Circle */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-herb-turmeric rounded-full flex items-center justify-center shadow-lg">
                <span className="font-serif text-xl text-white">🌿</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
