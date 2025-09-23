import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TestimonialSection from "@/components/TestimonialSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ProductSection from "@/components/ProductSection";

export default async function Home() {
  const productRes = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products`,
    { cache: "no-store" }
  );
  const testimonialRes = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/testimonials`,
    { cache: "no-store" }
  );

  const products = await productRes.json();
  const testimonials = await testimonialRes.json();

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-herb-cream flex flex-col">
      <HeroSection />

      <ProductSection
        title="Best-Selling Herbal Bath Powders 🌿"
        subTitle="Loved by 1000+ families for pure, gentle skincare"
        products={products.slice(0, 4)}
        lazyLoading={false}
      />

      <TestimonialSection testimonials={testimonials.data} />

      <ProductSection
        title="Herbal Combo Packs for Every Family 👨‍👩‍👧‍👦"
        subTitle="Specially curated packs for couples, kids, and complete families"
        products={products.slice(4, 8)}
        lazyLoading={true}
      />

      <AboutSection />
      <InstagramSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
