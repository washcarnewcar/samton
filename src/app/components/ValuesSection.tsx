import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { useRef, useCallback } from "react";
import { Zap, Target, Settings } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "속도",
    titleEn: "SPEED",
    description: "빠른 초기 대응과 민첩한 개발 프로세스로 시간 비용을 최소화합니다. 변화하는 요구에 즉각 반응하는 실행력을 갖추고 있습니다.",
    accent: "#22d3ee",
  },
  {
    icon: Target,
    title: "정확성",
    titleEn: "ACCURACY",
    description: "데이터 기반의 분석과 체계적인 QA 프로세스를 통해 높은 정확도의 결과물을 제공합니다. 요구사항 하나하나를 놓치지 않습니다.",
    accent: "#6b9fff",
  },
  {
    icon: Settings,
    title: "맞춤 대응",
    titleEn: "CUSTOMIZED",
    description: "획일화된 솔루션이 아닌, 각 고객의 비즈니스 환경과 목표에 최적화된 맞춤형 기술 솔루션을 설계하고 구현합니다.",
    accent: "#a78bfa",
  },
];

function ValueCard({ value, index }: { value: typeof values[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 200, damping: 30 });

  const spotlightBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(350px circle at ${(x as number) * 100}% ${(y as number) * 100}%, ${value.accent}10, transparent 70%)`
  );

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className="group relative p-8 lg:p-10 rounded-2xl bg-white border border-[#0a1f3c]/[0.06] hover:border-[#6b9fff]/20 hover:shadow-xl transition-all duration-500 cursor-default"
    >
      {/* Animated accent line top */}
      <motion.div
        className="absolute top-0 left-8 right-8 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${value.accent}, transparent)` }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
      />

      {/* Spotlight glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: spotlightBg }}
      />

      {/* Icon with animated background ring */}
      <div className="relative w-14 h-14 mb-7">
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ border: `1px solid ${value.accent}30` }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
        />
        <motion.div
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${value.accent}18, ${value.accent}08)` }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <value.icon size={24} style={{ color: value.accent }} strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Label */}
      <motion.div
        className="text-[#0a1f3c]/25 mb-2 tracking-widest"
        style={{ fontSize: "11px", fontWeight: 600 }}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
      >
        {value.titleEn}
      </motion.div>

      {/* Title */}
      <h3 className="text-[#0a1f3c] mb-4" style={{ fontSize: "22px", fontWeight: 800 }}>
        {value.title}
      </h3>

      {/* Description */}
      <p className="text-[#0a1f3c]/45" style={{ fontSize: "14px", lineHeight: 1.8, fontWeight: 400 }}>
        {value.description}
      </p>

      {/* Bottom accent bar on hover */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-[2px] rounded-full"
        style={{ backgroundColor: value.accent }}
        initial={{ width: 0, x: "-50%" }}
        whileHover={{ width: "40%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </motion.div>
  );
}

export function ValuesSection() {
  return (
    <section id="values" className="relative bg-[#f5f7fa] py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0a1f3c]/10 to-transparent" />

      {/* Animated background orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#6b9fff]/5 via-transparent to-[#a78bfa]/5 rounded-full blur-[200px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div
            className="text-[#6b9fff] mb-4 tracking-widest"
            style={{ fontSize: "12px", fontWeight: 600 }}
          >
            CORE VALUES
          </div>
          <h2
            className="text-[#0a1f3c] mb-5"
            style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            우리가 약속하는 핵심 가치
          </h2>
          <motion.div
            className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#6b9fff]/50 to-transparent mb-5"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <p className="text-[#0a1f3c]/45 max-w-lg mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
            빠르고, 정확하고, 요구사항에 맞춘 — Samton의 세 가지 핵심 약속
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8" style={{ perspective: 1000 }}>
          {values.map((value, i) => (
            <ValueCard key={value.titleEn} value={value} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
