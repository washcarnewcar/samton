import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoHorizontal from "@/assets/Samton_logo_with_text.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const rafRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);

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
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.06)]" : "bg-transparent"
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
                activeSection === link.id ? "text-[#0a1f3c]" : "text-[#0a1f3c]/50 hover:text-[#0a1f3c]/80"
              }`}
              style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "0.02em" }}
              whileHover={{ backgroundColor: "rgba(10,31,60,0.04)" }}
              transition={{ duration: 0.2 }}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#0a1f3c] to-[#6b9fff] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="ml-3 px-5 py-2 bg-[#0a1f3c] text-white rounded-lg"
            style={{ fontSize: "14px", fontWeight: 600 }}
            whileHover={{ scale: 1.03, backgroundColor: "#133254" }}
            whileTap={{ scale: 0.97 }}
          >
            문의하기
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          className="md:hidden text-[#0a1f3c]/80 p-2"
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
            className="md:hidden bg-white/98 backdrop-blur-xl border-t border-[#0a1f3c]/5 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="block px-4 py-3 text-[#0a1f3c]/70 hover:text-[#0a1f3c] hover:bg-[#0a1f3c]/5 rounded-lg transition-colors"
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
                className="block mt-3 px-5 py-2.5 bg-[#0a1f3c] text-white rounded-lg text-center"
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
