import { HeroSection } from "@/components/home/HeroSection";
import { BannerSection } from "@/components/home/BannerSection";
import { ProductCard } from "@/components/shop/ProductCard";
import { DUMMY_PRODUCTS } from "@/lib/products";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-4 text-[#0a0a0a]">Signature Styles</h2>
          <div className="w-12 h-0.5 bg-[#0a0a0a] mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="relative aspect-[16/9] overflow-hidden group rounded-lg cursor-pointer">
                <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop" className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105" alt="Kaftan" />
                <div className="absolute inset-0 bg-[#0a0a0a]/20 transition-colors duration-500 group-hover:bg-[#0a0a0a]/40 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white uppercase tracking-widest">Kaftans</h3>
                </div>
             </div>
             <div className="relative aspect-[16/9] overflow-hidden group rounded-lg cursor-pointer">
                <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2000&auto=format&fit=crop" className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105" alt="Senator" />
                <div className="absolute inset-0 bg-[#0a0a0a]/20 transition-colors duration-500 group-hover:bg-[#0a0a0a]/40 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white uppercase tracking-widest">Senator Wears</h3>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-4 text-[#0a0a0a]">Featured Products</h2>
          <div className="w-12 h-0.5 bg-[#0a0a0a] mx-auto mb-16"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {DUMMY_PRODUCTS.slice(4, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Interstitial Banner */}
      <BannerSection 
        title="The Royal Collection"
        description="Experience native tailoring at its absolute peak. Impeccable cuts, premium fabrics, and handcrafted embroidery designed for the modern gentleman."
        image="https://images.unsplash.com/photo-1506634572416-48cdfe530110?q=80&w=1970&auto=format&fit=crop"
        buttonText="Discover Now"
        align="left"
      />

      {/* New Arrivals (Horizontal Swipe on Mobile) */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-4 text-[#0a0a0a]">New Arrivals</h2>
          <div className="w-12 h-0.5 bg-[#0a0a0a] mx-auto mb-16"></div>
          
          {/* Horizontal scroll container for mobile, standard grid for desktop */}
          <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0 gap-6 snap-x snap-mandatory hide-scrollbar">
            {DUMMY_PRODUCTS.map(product => (
              <div key={product.id} className="w-[75vw] sm:w-[45vw] md:w-auto flex-none snap-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

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
