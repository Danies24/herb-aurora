"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  Instagram,
  Youtube,
  MessageSquare,
  Send,
  MapPin,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(
      `mailto:support@herbaurora.in?subject=Message from ${form.name}&body=${form.message}`,
      "_self"
    );
  };

  return (
    <main className="bg-[#FFF9F2] text-herb-green">
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-3 mb-12">
            <h1 className="font-herbal text-4xl sm:text-5xl text-herb-green font-semibold">
              Contact Us
            </h1>
            <p className="text-herb-green/80 max-w-2xl mx-auto text-lg">
              Have a question or need help with your order? We’d love to hear
              from you.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Left: Contact Options */}
            <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
              <h2 className="font-herbal text-2xl text-herb-green mb-3 flex items-center gap-2">
                <MessageSquare className="text-herb-green w-6 h-6" /> Get in
                Touch
              </h2>
              <p className="text-herb-green/80">
                You can reach us through WhatsApp, email, or our social media
                channels below.
              </p>

              <div className="space-y-4">
                <a
                  href="https://wa.me/+916363930412?text=Hi! I need help with my order."
                  target="_self"
                  className="flex items-center gap-3 bg-herb-green text-white py-3 px-5 rounded-lg hover:bg-herb-green transition-all duration-300 font-semibold w-fit"
                >
                  <Phone className="w-5 h-5" />
                  Chat on WhatsApp
                </a>

                <a
                  href="mailto:support@herbaurora.in"
                  className="flex items-center gap-3 text-herb-green font-semibold hover:underline"
                >
                  <Mail className="w-5 h-5" />
                  support@herbaurora.in
                </a>

                <p className="flex items-center gap-3 text-herb-green/80">
                  <MapPin className="w-5 h-5 text-herb-green" />
                  Coimbatore, Tamil Nadu, India
                </p>
              </div>

              {/* Socials */}
              <div className="flex gap-5 pt-6">
                <a
                  href="https://instagram.com/herbaurora"
                  className="text-herb-green hover:text-herbGreenLight transition-colors"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-7 h-7" />
                </a>
                <a
                  href="https://youtube.com/@herbaurora"
                  className="text-herb-green hover:text-herbGreenLight transition-colors"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-7 h-7" />
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="font-herbal text-2xl text-herb-green mb-6 flex items-center gap-2">
                <Send className="text-herb-green w-6 h-6" /> Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-herb-green">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-herb-green/20 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-herb-green focus:border-herb-green"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-herb-green">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-herb-green/20 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-herb-green focus:border-herb-green"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-herb-green">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full border border-herb-green/20 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-herb-green focus:border-herb-green resize-none"
                    placeholder="Type your message here..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-herb-green text-white font-semibold py-3 rounded-lg hover:bg-herb-green transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
