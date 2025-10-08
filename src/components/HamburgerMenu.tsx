"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
  FaLeaf,
  FaPhone,
  FaFlask,
} from "react-icons/fa";
import SearchModal from "@/components/SearchModal";
import { useRouter } from "next/navigation";
// import { useLoginRequired } from "@/hooks/useLoginRequired";
import CartIcon from "@/components/CartIcon";
import { useDispatch } from "react-redux";
import { openCart } from "@/redux/slices/uiSlice";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi! I'd like to order from Herb Aurora. Please share the details."
    );
    window.open(`https://wa.me/+916363930412?text=${message}`, "_self");
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSearchOpen(true);
    closeMenu();
  };

  const router = useRouter();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(openCart());
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/profile");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-[1000]">
      <div className="max-w-[1200px] mx-auto p-4 flex justify-between items-center">
        {/* Hamburger button (mobile) */}
        <button
          className="md:hidden bg-herb-green-light text-white p-3 rounded-lg text-xl"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="font-sans text-2xl font-semibold text-herb-green-light"
        >
          Herb Aurora
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/products"
            className="text-herb-green-light font-medium hover:bg-herb-green/10 px-1"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-herb-green-light font-medium hover:bg-herb-green/10 px-1"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-herb-green-light font-medium hover:bg-herb-green/10 px-1"
          >
            Contact
          </Link>

          <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
            <button
              onClick={handleSearchClick}
              className="text-herb-green-light text-xl p-2 rounded hover:bg-herb-green/10"
            >
              <FaSearch />
            </button>
            <button
              onClick={handleCartClick}
              className="text-herb-green-light text-xl p-2 rounded hover:bg-herb-green/10"
            >
              <CartIcon />
            </button>
            <button
              onClick={handleProfileClick}
              className="text-herb-green-light text-xl p-2 rounded hover:bg-herb-green/10"
            >
              <FaUserCircle />
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="bg-herb-green-light text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-90"
            >
              <FaWhatsapp /> Chat
            </button>
          </div>
        </nav>

        {/* Mobile Cart Button */}
        <button
          onClick={handleCartClick}
          className="md:hidden bg-herb-green-light text-white p-3 rounded-lg text-xl"
        >
          <FaShoppingCart />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-[1001] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      >
        <nav
          className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white p-6 flex flex-col gap-4 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold text-herb-green-light">
              Menu
            </h2>
            <button
              onClick={closeMenu}
              className="text-herb-green-light text-2xl p-2 hover:bg-herb-green/10 rounded"
            >
              <FaTimes />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2 flex-1">
            <button
              onClick={handleProfileClick}
              className="flex items-center gap-3 text-herb-green-light text-lg p-2 rounded hover:bg-herb-green/10"
            >
              <FaUserCircle /> Profile
            </button>
            <Link
              href="/products"
              onClick={closeMenu}
              className="flex items-center gap-3 text-herb-green-light text-lg p-2 rounded hover:bg-herb-green/10"
            >
              <FaLeaf /> Products
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="flex items-center gap-3 text-herb-green-light text-lg p-2 rounded hover:bg-herb-green/10"
            >
              <FaFlask /> About
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="flex items-center gap-3 text-herb-green-light text-lg p-2 rounded hover:bg-herb-green/10"
            >
              <FaPhone /> Contact
            </Link>
            <button
              onClick={handleSearchClick}
              className="flex items-center gap-3 text-herb-green-light text-lg p-2 rounded hover:bg-herb-green/10"
            >
              <FaSearch /> Search
            </button>
          </div>

          {/* Footer */}
          <div className="border-t pt-4">
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-herb-green-light text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:opacity-90"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </button>
          </div>
        </nav>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
};

export default HamburgerMenu;
