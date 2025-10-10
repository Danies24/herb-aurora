"use client";

import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in Herb Aurora's herbal skincare products. Please share more details."
    );
    window.open(`https://wa.me/+916363930412?text=${message}`, "_self");
  };

  return (
    <div className="fixed bottom-4 right-4 z-[1200] flex flex-col items-end pointer-events-none md:bottom-8 md:right-8">
      <button
        onClick={handleWhatsAppClick}
        className="pointer-events-auto flex items-center gap-2 bg-herb-green-light text-white rounded-full px-4 py-3 md:px-6 md:py-4 font-semibold text-base md:text-lg shadow-lg hover:bg-herb-green/90 hover:scale-105 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-xl md:text-2xl" />
      </button>
    </div>
  );
};

export default WhatsAppFloat;
