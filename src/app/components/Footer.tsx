import { motion } from "motion/react";
import logoIcon from "@/assets/671be16143782e9cd942b827d8070b6f85c5497c.png";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-[#060f1a] py-12 border-t border-white/[0.05] relative overflow-hidden"
    >
      {/* Subtle moving gradient */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(107,159,255,0.1), transparent)" }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={logoIcon}
              alt="Samton"
              className="h-7 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="text-white/50" style={{ fontSize: "14px", fontWeight: 600 }}>
              Samton
            </span>
            <span className="text-white/20 ml-2" style={{ fontSize: "13px" }}>
              &copy; 2026 Samton. All rights reserved.
            </span>
          </motion.div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <motion.a
              href="mailto:sumin@samteon.com"
              className="text-white/30 hover:text-white/60 transition-colors"
              style={{ fontSize: "13px" }}
              whileHover={{ y: -1 }}
            >
              sumin@samteon.com
            </motion.a>
            <span className="text-white/10">|</span>
            <motion.a
              href="tel:070-4107-9524"
              className="text-white/30 hover:text-white/60 transition-colors"
              style={{ fontSize: "13px" }}
              whileHover={{ y: -1 }}
            >
              070-4107-9524
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
