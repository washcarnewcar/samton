import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { useRef, useCallback } from "react";
import brandGuidelineImg from "@/assets/45c76256ebd52adb13536cfefb84d50791de9fe4.png";

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={className}
    >
      {/* Dynamic glow overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(400px circle at ${x} ${y}, rgba(107,159,255,0.06), transparent 70%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

const philosophyItems = [
  {
    title: "구조화된 문제 해결",
    desc: "고객의 복잡한 요구사항을 체계적으로 구조화하고, 데이터 기반의 소프트웨어와 전문가 팀으로 직접 해결합니다.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
  },
  {
    title: "높은 수준의 기준 충족",
    desc: "기업과 정부가 요구하는 높은 수준의 기준을 이해하고, 자체 기술 역량으로 신뢰 가능한 결과를 만들어냅니다.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "맞춤형 솔루션 제공",
    desc: "마르지 않는 기술적 창의성을 바탕으로, 각 고객의 상황과 니즈에 최적화된 맞춤형 기술 솔루션을 설계합니다.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative bg-[#0a1f3c] py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Animated line decoration */}
      <motion.div
        className="absolute top-20 left-0 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(107,159,255,0.15), transparent)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.div
            className="text-white/30 mb-4 tracking-widest"
            style={{ fontSize: "12px", fontWeight: 600 }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ABOUT SAMTON
          </motion.div>
          <h2
            className="text-white mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            지혜와 아이디어가
            <br />
            솟아나는{" "}
            <motion.span
              className="text-[#6b9fff] inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            >
              샘이 트다
            </motion.span>
          </h2>
          <p
            className="text-white/45 max-w-2xl"
            style={{ fontSize: "17px", lineHeight: 1.8, fontWeight: 400 }}
          >
            Samton이라는 이름은 '지혜와 아이디어가 솟아나는 샘이 트다'라는 의미에서 탄생했습니다.
            끊임없이 변화하는 IT 환경 속에서 마르지 않는 기술적 창의성을 바탕으로,
            고객의 비즈니스에 새로운 생명력을 불어넣는 맞춤형 솔루션을 제공합니다.
          </p>
        </motion.div>

        {/* Two column */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Philosophy cards with 3D tilt */}
          <div className="space-y-6">
            {philosophyItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
              >
                <TiltCard className="relative group flex gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 cursor-default">
                  <motion.div
                    className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#133254] flex items-center justify-center text-[#6b9fff]"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-white mb-2" style={{ fontSize: "17px", fontWeight: 700 }}>
                      {item.title}
                    </h3>
                    <p className="text-white/40" style={{ fontSize: "14px", lineHeight: 1.7, fontWeight: 400 }}>
                      {item.desc}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Right: Brand Guideline Image with hover float */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl"
              whileHover={{ y: -8, boxShadow: "0 30px 60px -12px rgba(0,0,0,0.5)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <img
                src={brandGuidelineImg}
                alt="Samton Brand Guideline"
                className="w-full h-auto"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-[#0a1f3c]/40 to-transparent"
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            {/* Animated decorative glow */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-[#133254] rounded-full blur-[60px]"
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#133254] rounded-full blur-[80px]"
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
