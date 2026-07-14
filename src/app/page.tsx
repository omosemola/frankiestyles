import { HeroSection } from "@/components/home/HeroSection";
import { BannerSection } from "@/components/home/BannerSection";
import { ProductCard } from "@/components/shop/ProductCard";
import { SignatureStyles } from "@/components/home/SignatureStyles";
import { ScrollAnimate } from "@/components/ui/ScrollAnimate";
import { ContactSection } from "@/components/home/ContactSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProducts } from "@/actions/products";
import Link from 'next/link';

export default async function Home() {
  const products = await getProducts();
  const newArrivals = products.filter(product => product.isNew);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      {/* Featured Categories */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <SectionHeader title="Signature Styles" />
          
          <SignatureStyles />
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="pt-10 pb-24 bg-white border-t border-gray-100 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <SectionHeader title="Featured Products" />
          
          <FeaturedProductsSection initialProducts={products} />
        </div>
      </section>

      {/* Interstitial Banner */}
      <BannerSection 
        title="The Royal Collection"
        description="Experience native tailoring at its absolute peak. Impeccable cuts, premium fabrics, and handcrafted embroidery designed for the modern gentleman."
        image="/images/royal-banner.jpg"
        buttonText="Discover Now"
        align="left"
      />

      {/* New Arrivals (Horizontal Swipe on Mobile) */}
      <section className="py-24 bg-[#f8f8f8] overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <SectionHeader title="New Arrivals" />
          
          {/* Horizontal scroll container for mobile, standard grid for desktop */}
          <ScrollAnimate direction="up" amount={0.05}>
            <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0 gap-6 snap-x snap-mandatory hide-scrollbar">
              {newArrivals.map(product => (
                <div key={product.id} className="w-[75vw] sm:w-[45vw] md:w-auto flex-none snap-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Booking / Contact Consultation Form */}
      <ContactSection />

      {/* Newsletter Banner */}
      <BannerSection 
        title="Join The Elite"
        description="Sign up to receive early access to new collections, exclusive events, and styling tips from Frankie Styles."
        image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
        buttonText="Subscribe Now"
        align="center"
      />
    </div>
  );
}
