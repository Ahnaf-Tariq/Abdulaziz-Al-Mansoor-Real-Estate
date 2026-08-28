import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import MarqueeBar from "@/components/sections/marquee-stats-bar";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import PropertyTypes from "@/components/sections/property-types";
import WhyUs from "@/components/sections/why-us";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import WhatsAppFloat from "@/components/ui/whatsapp-float";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <MarqueeBar />
      <About />
      <div className="section-divider" />
      <Services />
      <div className="section-divider" />
      <PropertyTypes />
      <div className="section-divider" />
      <WhyUs />
      <div className="section-divider" />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
