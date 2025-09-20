"use client";

import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const InstagramSection = () => {
  const instagramPosts = [
    {
      id: 1,
      image: "/images/instagram/reel1.jpg",
      link: "https://www.instagram.com/herbauroraoffl/",
    },
    {
      id: 2,
      image: "/images/instagram/reel1.jpg",
      link: "https://www.instagram.com/herbauroraoffl/",
    },
    {
      id: 3,
      image: "/images/instagram/reel1.jpg",
      link: "https://www.instagram.com/herbauroraoffl/",
    },
    {
      id: 4,
      image: "/images/instagram/reel1.jpg",
      link: "https://www.instagram.com/herbauroraoffl/",
    },
    {
      id: 5,
      image: "/images/instagram/reel1.jpg",
      link: "https://www.instagram.com/herbauroraoffl/",
    },
  ];

  return (
    <section className="py-16 bg-herb-cream">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-['Playfair_Display'] text-herb-green-light mb-4">
            Follow Our Journey
          </h2>
          <p className="text-lg text-herb-green-light/90">
            See how our products are making a difference in people&apos;s lives
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_self"
              rel="noopener noreferrer"
              className="relative group rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 hover:rotate-[-2deg]"
            >
              {/* Image */}
              <Image
                src={post.image}
                alt="Instagram Reel thumbnail"
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-herb-green/30 to-black/20 opacity-0 group-hover:opacity-100 transition duration-300" />
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="https://www.instagram.com/herbauroraoffl/"
            target="_self"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-herb-green-light text-white font-semibold text-lg px-8 py-3 rounded-full shadow-md transition transform hover:-translate-y-1 hover:scale-105 hover:bg-herb-green"
          >
            <Instagram className="mr-2" />
            Follow us on Instagram
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
