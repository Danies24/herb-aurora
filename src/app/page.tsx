import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
// import ProductSection from "@/components/ProductSection";
import TestimonialSection from "@/components/TestimonialSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
// import { products } from "@/constants/products";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-herb-cream flex flex-col">
      <HeroSection />
      <TestimonialSection />

      {/* <ProductSection
        title="Best-Selling Herbal Bath Powders 🌿"
        subTitle="Loved by 1000+ families for pure, gentle skincare"
        products={products.slice(0, 4)}
        lazyLoading={false}
      />


      <ProductSection
        title="Herbal Combo Packs for Every Family 👨‍👩‍👧‍👦"
        subTitle="Specially curated packs for couples, kids, and complete families"
        products={products.slice(4, 8)}
        lazyLoading={true}
      /> */}

      <AboutSection />
      <InstagramSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
