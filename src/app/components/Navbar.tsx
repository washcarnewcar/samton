import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoHorizontal from "@/assets/e4df91140cc74f1cc6988c323775ef7c795d43a6.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = ["contact", "partners", "values", "about"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "소개", href: "#about", id: "about" },
    { label: "핵심 가치", href: "#values", id: "values" },
    { label: "파트너", href: "#partners", id: "partners" },
    { label: "연락처", href: "#contact", id: "contact" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#081521]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2.5 group"
          onClick={(e) => handleSmoothScroll(e, "#")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <img
            src={logoHorizontal}
            alt="Samton"
            className="h-7 lg:h-8 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className={`relative px-4 py-2 rounded-lg transition-colors ${
                activeSection === link.id ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
              style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "0.02em" }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              transition={{ duration: 0.2 }}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#6b9fff] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="ml-3 px-5 py-2 bg-white/10 border border-white/20 text-white rounded-lg"
            style={{ fontSize: "14px", fontWeight: 600 }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.2)", scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            문의하기
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          className="md:hidden text-white/80 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#081521]/98 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  style={{ fontSize: "16px", fontWeight: 500 }}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="block mt-3 px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-lg text-center"
                style={{ fontSize: "14px", fontWeight: 600 }}
                onClick={(e) => handleSmoothScroll(e, "#contact")}
              >
                문의하기
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
