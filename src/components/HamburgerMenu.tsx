"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShoppingCart,
  UserCircle,
  Leaf,
  Phone,
  FlaskConical,
  Search,
  MessageCircle,
} from "lucide-react";
import SearchModal from "@/components/SearchModal";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { openCart } from "@/redux/slices/uiSlice";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

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
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-100 z-[1000]">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex justify-between items-center">
        {/* Mobile Hamburger */}
        <button
          className="md:hidden bg-herb-green text-white p-2.5 rounded-lg flex items-center justify-center"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-semibold text-herb-green tracking-wide"
        >
          Herb Aurora
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/products"
            className="text-herb-green font-medium hover:text-herb-green-light transition"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-herb-green font-medium hover:text-herb-green-light transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-herb-green font-medium hover:text-herb-green-light transition"
          >
            Contact
          </Link>

          <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
            <button
              onClick={handleSearchClick}
              className="p-2 rounded-full hover:bg-herb-green/10 text-herb-green"
            >
              <Search size={20} />
            </button>

            <button
              onClick={handleCartClick}
              className="relative p-2 rounded-full hover:bg-herb-green/10 text-herb-green"
            >
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-herb-green text-white text-[10px] px-1.5 py-[1px] rounded-full font-medium">
                  {items.length}
                </span>
              )}
            </button>

            <button
              onClick={handleProfileClick}
              className="p-2 rounded-full hover:bg-herb-green/10 text-herb-green"
            >
              <UserCircle size={20} />
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="bg-herb-green text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition"
            >
              <MessageCircle size={18} /> Chat
            </button>
          </div>
        </nav>

        {/* Mobile Cart Button */}
        <button
          onClick={handleCartClick}
          className="md:hidden relative bg-herb-green text-white p-2.5 rounded-lg"
        >
          <ShoppingCart size={22} />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-herb-green text-[10px] font-semibold px-1.5 py-[1px] rounded-full">
              {items.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-[1001] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      >
        {/* Sliding Menu */}
        <nav
          className={`fixed top-0 left-0 w-[85vw] h-screen max-w-[400px] bg-white p-6 flex flex-col justify-between transform transition-transform duration-300 shadow-2xl overflow-y-auto ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-herb-green">Menu</h2>
            <button
              onClick={closeMenu}
              className="text-herb-green p-2 rounded-full hover:bg-herb-green/10"
            >
              <X size={22} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 text-herb-green font-medium text-base">
            <button
              onClick={handleProfileClick}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-herb-green/10 transition"
            >
              <UserCircle size={20} /> My Profile
            </button>

            <Link
              href="/products"
              onClick={closeMenu}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-herb-green/10 transition"
            >
              <Leaf size={20} /> Products
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-herb-green/10 transition"
            >
              <FlaskConical size={20} /> About
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-herb-green/10 transition"
            >
              <Phone size={20} /> Contact
            </Link>

            <button
              onClick={handleSearchClick}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-herb-green/10 transition"
            >
              <Search size={20} /> Search
            </button>

            <button
              onClick={handleCartClick}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-herb-green/10 transition relative"
            >
              <ShoppingCart size={20} /> My Cart
              {items.length > 0 && (
                <span className="ml-auto bg-herb-green text-white text-xs font-semibold px-2 py-[1px] rounded-full">
                  {items.length}
                </span>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t">
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-herb-green text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:opacity-90 transition"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
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
