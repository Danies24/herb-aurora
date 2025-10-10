"use client";

import React from "react";
import {
  ShieldCheck,
  Info,
  Lock,
  MessageSquare,
  RefreshCcw,
  Mail,
  Database,
} from "lucide-react";
import Footer from "@/components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <main className="bg-[#FFF9F2] text-herb-green">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="font-herbal text-4xl sm:text-5xl text-herb-green font-semibold">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-herb-green/80 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how{" "}
              <span className="font-semibold text-herb-green">Herb Aurora</span>
              collects, uses, and protects your personal data.
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 space-y-10">
            {/* Section 1 */}
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-herbal text-herb-green mb-2">
                <Info className="text-herb-green w-6 h-6" />
                Information We Collect
              </h2>
              <p className="text-herb-green/80 leading-relaxed">
                We may collect your name, email, phone number, address, and
                order details when you shop or contact us.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-herbal text-herb-green mb-2">
                <ShieldCheck className="text-herb-green w-6 h-6" />
                How We Use Your Data
              </h2>
              <ul className="space-y-2 pl-5 list-disc text-herb-green/80 leading-relaxed">
                <li>To process and deliver your orders</li>
                <li>To respond to your queries via WhatsApp or email</li>
                <li>To improve our products and website experience</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-herbal text-herb-green mb-2">
                <Lock className="text-herb-green w-6 h-6" />
                Data Security
              </h2>
              <p className="text-herb-green/80 leading-relaxed">
                We use standard security measures to keep your data safe and
                never sell or share your information with third parties.
              </p>
            </div>

            {/* Section 4 - WhatsApp Communication */}
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-herbal text-herb-green mb-2">
                <MessageSquare className="text-herb-green w-6 h-6" />
                WhatsApp Communication
              </h2>
              <p className="text-herb-green/80 leading-relaxed">
                By clicking{" "}
                <span className="font-semibold">
                  &quot;Order on WhatsApp&quot;
                </span>
                , you agree to receive order and product-related updates through
                WhatsApp messages.
              </p>
            </div>

            {/* Section 5 - Data Retention & Rights */}
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-herbal text-herb-green mb-2">
                <Database className="text-herb-green w-6 h-6" />
                Data Retention & Your Rights
              </h2>
              <p className="text-herb-green/80 leading-relaxed">
                We retain your data only as long as necessary for business or
                legal purposes. You can request to access, correct, or delete
                your personal data anytime by contacting us. Please note that we
                may retain limited information to comply with tax and legal
                obligations.
              </p>
            </div>

            {/* Section 6 - Policy Changes */}
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-herbal text-herb-green mb-2">
                <RefreshCcw className="text-herb-green w-6 h-6" />
                Changes to This Policy
              </h2>
              <p className="text-herb-green/80 leading-relaxed">
                This privacy policy may be updated periodically. Any changes
                will be posted here with the revised effective date.
              </p>
            </div>

            {/* Section 7 - Contact */}
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-herbal text-herb-green mb-2">
                <Mail className="text-herb-green w-6 h-6" />
                Contact Us
              </h2>
              <p className="text-herb-green/80 leading-relaxed">
                If you have questions or concerns about your data, please reach
                us at{" "}
                <a
                  href="mailto:herbaurora.in@gmail.com"
                  className="text-herb-green font-semibold hover:underline"
                >
                  herbaurora.in@gmail.com
                </a>{" "}
                or chat with us via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicyPage;
