import { motion } from "motion/react";

const partners = [
  { name: "HIC", url: "hiconsulting.co.kr", desc: "컨설팅" },
  { name: "카카오 모빌리티", url: "kakaomobility.com", desc: "모빌리티" },
  { name: "KM 솔루션", url: "kmscorp.co.kr", desc: "솔루션" },
  { name: "검단청소년센터", url: "issi.or.kr", desc: "공공기관" },
  { name: "스위스관광", url: "bus1st.com", desc: "관광" },
];

// Duplicate for infinite scroll
const marqueePartners = [...partners, ...partners, ...partners];

function MarqueeRow({ direction = 1, speed = 30 }: { direction?: number; speed?: number }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex gap-6 shrink-0"
        animate={{ x: direction > 0 ? ["0%", "-33.333%"] : ["-33.333%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {marqueePartners.map((partner, i) => (
          <a
            key={`${partner.name}-${i}`}
            href={`https://${partner.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center w-52 h-40 shrink-0 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.18] transition-all duration-400 hover:scale-[1.05]"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6b9fff]/0 to-[#6b9fff]/0 group-hover:from-[#6b9fff]/[0.04] group-hover:to-transparent transition-all duration-500" />

            <div className="w-14 h-14 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-3 group-hover:bg-white/[0.1] group-hover:border-white/[0.15] group-hover:scale-110 transition-all duration-300">
              <span
                className="text-white/50 group-hover:text-white transition-colors duration-300"
                style={{ fontSize: "22px", fontWeight: 800 }}
              >
                {partner.name[0]}
              </span>
            </div>
            <h4
              className="text-white/70 text-center group-hover:text-white transition-colors duration-300"
              style={{ fontSize: "14px", fontWeight: 700 }}
            >
              {partner.name}
            </h4>
            <span className="text-white/25 group-hover:text-white/50 transition-colors duration-300" style={{ fontSize: "12px", fontWeight: 500 }}>
              {partner.desc}
            </span>

            {/* External link */}
            <svg
              className="absolute top-3 right-3 text-white/0 group-hover:text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        ))}
      </motion.div>
    </div>
  );
}

export function PartnersSection() {
  return (
    <section id="partners" className="relative bg-[#0a1f3c] py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div
            className="text-white/30 mb-4 tracking-widest"
            style={{ fontSize: "12px", fontWeight: 600 }}
          >
            PARTNERS
          </div>
          <h2
            className="text-white mb-5"
            style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            신뢰로 함께하는 파트너
          </h2>
          <motion.div
            className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#6b9fff]/50 to-transparent mb-5"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <p className="text-white/40 max-w-lg mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
            다양한 산업 분야의 파트너들과 함께 성장하고 있습니다
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="space-y-6"
      >
        <MarqueeRow direction={1} speed={35} />
      </motion.div>
    </section>
  );
}
