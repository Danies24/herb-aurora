"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-white px-6 py-12 overflow-hidden">
      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
        {/* Left: Logo & Links */}
        <div className="flex flex-col items-start gap-6 min-w-[220px]">
          {/* Logo */}
          <div className="text-3xl font-extrabold tracking-wide text-herb-green-light drop-shadow-md">
            Herb Aurora
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link
              href="/about"
              className="text-herb-green-light font-semibold px-4 py-1.5 rounded-full border border-transparent transition hover:bg-herb-green hover:text-white hover:border-herb-green"
            >
              About Us
            </Link>
            <Link
              href="/products"
              className="text-herb-green-light font-semibold px-4 py-1.5 rounded-full border border-transparent transition hover:bg-herb-green hover:text-white hover:border-herb-green"
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="text-herb-green-light font-semibold px-4 py-1.5 rounded-full border border-transparent transition hover:bg-herb-green hover:text-white hover:border-herb-green"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-herb-green-light font-semibold px-4 py-1.5 rounded-full border border-transparent transition hover:bg-herb-green hover:text-white hover:border-herb-green"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://www.instagram.com/herbauroraoffl"
              target="_self"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-glass text-herb-green shadow transition hover:bg-herb-green hover:text-white hover:shadow-lg"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/herbaurora"
              target="_self"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-glass text-herb-green shadow transition hover:bg-herb-green hover:text-white hover:shadow-lg"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-herb-green mt-4">
            © {new Date().getFullYear()} Herb Aurora. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
