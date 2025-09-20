"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`relative w-[90%] max-w-lg rounded-lg bg-[#e9eef5] p-6 transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-5"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-herb-green-light text-xl p-2 rounded hover:bg-herb-green/10"
        >
          <FaTimes />
        </button>

        {/* Search form */}
        <div className="mt-8 flex flex-col sm:flex-row gap-2">
          <form onSubmit={handleSearch} className="flex flex-1">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-lg border border-herb-green-light px-4 py-3 text-herb-green focus:outline-none focus:ring-2 focus:ring-herb-green-light bg-white"
            />
          </form>
          <button
            type="submit"
            disabled={!searchQuery.trim()}
            onClick={handleSearch}
            className="flex items-center justify-center rounded-lg bg-herb-green-light px-5 py-3 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
          >
            <FaSearch className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
