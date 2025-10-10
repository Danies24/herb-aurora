"use client";

import React from "react";
import {
  Leaf,
  FlaskConical,
  HeartHandshake,
  Sprout,
  Globe2,
  HandHeart,
  Recycle,
  Star,
} from "lucide-react";

const AboutPage = () => {
  return (
    <main className="bg-[#FFF9F2] text-herb-green">
      {/* Section 1 — Hero Text */}
      <section className="py-20 px-6 sm:px-10 text-center">
        <h1 className="font-herbal text-4xl sm:text-5xl text-herb-green font-semibold mb-4">
          About Herb Aurora
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-herb-green/80 leading-relaxed">
          At <span className="font-semibold text-herb-green">Herb Aurora</span>,
          we preserve ancient Tamil herbal wisdom through modern, effective
          skincare. Every product we craft is a blend of culture, care, and
          conscious innovation.
        </p>
      </section>

      {/* Section 2 — Our Story */}
      <section className="bg-white py-16 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-herbal text-3xl text-herb-green mb-2">
            Our Story
          </h2>
          <p className="text-herb-green/80 leading-relaxed text-lg">
            Born from a passion for Tamil traditional skincare, Herb Aurora
            began as a home experiment with natural ingredients and time-honored
            remedies. Today, we stand as a bridge between ancient herbal
            knowledge and the needs of modern skincare — providing authentic,
            chemical-free, and sustainable care for every skin type.
          </p>
        </div>
      </section>

      {/* Section 3 — Core Values */}
      <section className="py-20 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="font-herbal text-3xl text-herb-green mb-3">
            What We Stand For
          </h2>
          <p className="text-herb-green/80 max-w-2xl mx-auto">
            Our values reflect the foundation of who we are and what we believe
            in.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Leaf className="w-10 h-10 text-herb-green" />,
              title: "Natural Ingredients",
              desc: "We use only pure, plant-based ingredients sourced ethically from trusted local farmers.",
            },
            {
              icon: <HeartHandshake className="w-10 h-10 text-herb-green" />,
              title: "Cultural Wisdom",
              desc: "Every product honors Tamil herbal knowledge passed down through generations.",
            },
            {
              icon: <FlaskConical className="w-10 h-10 text-herb-green" />,
              title: "Modern Innovation",
              desc: "We balance ancient herbal formulas with clean, research-backed innovation.",
            },
            {
              icon: <Sprout className="w-10 h-10 text-herb-green" />,
              title: "Sustainable Practices",
              desc: "We are committed to eco-friendly packaging and a minimal carbon footprint.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 text-center flex flex-col items-center"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg text-herb-green mb-2">
                {item.title}
              </h3>
              <p className="text-herb-green/80 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Mission */}
      <section className="bg-herb-green/5 py-20 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="font-herbal text-3xl text-herb-green">Our Mission</h2>
          <p className="text-herb-green/80 text-lg leading-relaxed max-w-3xl mx-auto">
            Our mission is to revive traditional Tamil skincare by offering
            products that are natural, honest, and rooted in authenticity. We
            aim to empower every individual to experience the purity of ancient
            herbal rituals — through modern, accessible self-care routines.
          </p>
        </div>
      </section>

      {/* Section 5 — Ethical Promise */}
      <section className="py-20 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="font-herbal text-3xl text-herb-green mb-3">
            Our Ethical Promise
          </h2>
          <p className="text-herb-green/80 max-w-2xl mx-auto">
            Transparency, sustainability, and honesty define our process — from
            ingredient sourcing to packaging.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Globe2 className="w-8 h-8 text-herb-green" />,
              title: "Eco-Conscious Brand",
              desc: "We make environmentally responsible choices at every stage of production.",
            },
            {
              icon: <HandHeart className="w-8 h-8 text-herb-green" />,
              title: "Cruelty-Free & Safe",
              desc: "None of our products are tested on animals. Every formula is dermatologically safe.",
            },
            {
              icon: <Recycle className="w-8 h-8 text-herb-green" />,
              title: "Reusable Packaging",
              desc: "Our packaging is designed to be recyclable, reusable, and planet-friendly.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow text-center flex flex-col items-center"
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg text-herb-green mb-2">
                {item.title}
              </h3>
              <p className="text-herb-green/80 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6 — Vision */}
      <section className="bg-herb-green/10 py-20 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Star className="w-10 h-10 text-herb-green mx-auto" />
          <h2 className="font-herbal text-3xl text-herb-green">Our Vision</h2>
          <p className="text-herb-green/80 text-lg leading-relaxed">
            To make ancient Tamil herbal care accessible to every household —
            while inspiring a generation to embrace authenticity,
            sustainability, and self-love through nature.
          </p>
        </div>
      </section>

      {/* Section 7 — Closing Note */}
      <section className="py-16 px-6 sm:px-10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-herbal text-3xl text-herb-green">
            More Than Just Skincare
          </h2>
          <p className="text-herb-green/80 text-lg leading-relaxed">
            Herb Aurora is a journey — a commitment to purity, heritage, and
            mindful living. Every bottle, every blend, and every fragrance
            carries the essence of Tamil tradition, reimagined for today’s
            world.
          </p>
          <p className="text-herb-green font-semibold mt-4">
            🌿 Rooted in Tradition, Crafted for You.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
