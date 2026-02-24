import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ValuesSection } from "./components/ValuesSection";
import { PartnersSection } from "./components/PartnersSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#081521]" style={{ fontFamily: "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
