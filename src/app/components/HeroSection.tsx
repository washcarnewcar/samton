import { motion, useMotionValue, useTransform, useSpring, useInView, animate } from "motion/react";
import { useEffect, useRef, useCallback } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const isNumber = /^\d+$/.test(target);

  useEffect(() => {
    if (!isInView || !isNumber || !ref.current) return;
    const num = parseInt(target);
    const controls = animate(0, num, {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [isInView, target, suffix, isNumber]);

  if (!isNumber) return <span ref={ref}>{target}</span>;
  return <span ref={ref}>0{suffix}</span>;
}

// Floating particles (reduced count for performance)
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 10,
  dx: Math.random() * 40 - 20,
}));

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#6b9fff]/15"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, p.dx, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const bgX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const bgY = useTransform(springY, [-0.5, 0.5], [20, -20]);
  const glowX = useTransform(springX, [-0.5, 0.5], [-60, 60]);
  const glowY = useTransform(springY, [-0.5, 0.5], [-60, 60]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#f5f7fa] via-[#eef2f8] to-white"
    >
      {/* Parallax Background - subtle pattern */}
      <motion.div className="absolute inset-[-40px] opacity-[0.04]" style={{ x: bgX, y: bgY }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1489436969537-cf0c1dc69cba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwc2VydmVyJTIwcm9vbSUyMHRlY2hub2xvZ3klMjBpbmZyYXN0cnVjdHVyZXxlbnwxfHx8fDE3NzE5MTc2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Technology background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(10,31,60,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(10,31,60,.15) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Interactive glow that follows mouse */}
      <motion.div
        className="absolute w-[700px] h-[700px] bg-[#6b9fff] rounded-full blur-[250px] opacity-[0.06] pointer-events-none"
        style={{
          x: glowX,
          y: glowY,
          top: "20%",
          left: "40%",
          willChange: "transform",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0, 0, 0.2, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0a1f3c]/10 bg-white/60 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#0a1f3c]/50" style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.05em" }}>
              YOUR TRUSTED TECHNOLOGY PARTNER
            </span>
          </motion.div>

          {/* Headline with fade in */}
          <motion.h1
            className="text-[#0a1f3c] mb-6"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 2, ease: [0, 0, 0.2, 1] }}
          >
            복잡한 문제를
            <span className="block bg-gradient-to-r from-[#0a1f3c] via-[#3b6cb5] to-[#6b9fff] bg-clip-text text-transparent">
              기술로 해결합니다
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 1.2, ease: [0, 0, 0.2, 1] }}
            className="text-[#0a1f3c]/50 max-w-xl mb-10"
            style={{ fontSize: "clamp(16px, 1.5vw, 19px)", lineHeight: 1.7, fontWeight: 400 }}
          >
            빠르고, 정확하고, 요구사항에 맞춘 기술 파트너.
            <br className="hidden sm:block" />
            Samton은 데이터 기반의 소프트웨어와 전문가 팀으로
            <br className="hidden sm:block" />
            고객의 비즈니스에 새로운 생명력을 불어넣습니다.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.5, ease: [0, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(10,31,60,0.15)" }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              className="relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0a1f3c] text-white rounded-xl overflow-hidden group"
              style={{ fontSize: "15px", fontWeight: 700 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                프로젝트 문의
                <motion.svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="ml-1"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </motion.svg>
              </span>
              {/* Hover shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04, backgroundColor: "rgba(10,31,60,0.05)" }}
              whileTap={{ scale: 0.96 }}
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#0a1f3c]/20 text-[#0a1f3c]/70 rounded-xl hover:text-[#0a1f3c] transition-all"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              더 알아보기
            </motion.a>
          </motion.div>
        </div>

        {/* Stats with counter animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {[
            { number: "5", suffix: "+", label: "협업 파트너사" },
            { number: "99", suffix: "%", label: "프로젝트 달성률" },
            { number: "24", suffix: "h", label: "빠른 초기 응답" },
            { number: "∞", suffix: "", label: "기술적 창의성" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.15, duration:  0.6 }}
              className="text-center lg:text-left group"
            >
              <div
                className="text-[#0a1f3c] mb-1 tabular-nums text-center"
                style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                {/* TODO: 파트너사가 늘어나면 주석 해제 */}
                {/*<AnimatedCounter target={stat.number} suffix={stat.suffix} />*/}
                <span>{stat.number}{stat.suffix}</span>
              </div>
              <motion.div
                className="h-px bg-gradient-to-r from-[#0a1f3c]/0 via-[#6b9fff]/30 to-[#0a1f3c]/0 mb-2 origin-left mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 1, ease: [0, 0, 0.2, 1] }}
              />
              <div className="text-[#0a1f3c]/40" style={{ fontSize: "14px", fontWeight: 500 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll down arrow button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0, 0, 0.2, 1] }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 group cursor-pointer"
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[#0a1f3c]/35 group-hover:text-[#6b9fff] transition-colors" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em" }}>
            SCROLL
          </span>
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="text-[#0a1f3c]/35 group-hover:text-[#6b9fff] transition-colors"
          >
            <path d="M7 10l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  );
}
