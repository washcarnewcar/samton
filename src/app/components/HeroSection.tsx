import { motion, useMotionValue, useTransform, useSpring, useInView, animate } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";
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

// Floating particles
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/10"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
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

  // Staggered text reveal
  const headline1 = "복잡한 문제를";
  const headline2 = "기술로 해결합니다";

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#081521]"
    >
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-[-40px]" style={{ x: bgX, y: bgY }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1489436969537-cf0c1dc69cba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwc2VydmVyJTIwcm9vbSUyMHRlY2hub2xvZ3klMjBpbmZyYXN0cnVjdHVyZXxlbnwxfHx8fDE3NzE5MTc2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Technology background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#081521] via-[#081521]/70 to-[#081521]" />
      </motion.div>

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Interactive glow that follows mouse */}
      <motion.div
        className="absolute w-[700px] h-[700px] bg-[#133254] rounded-full blur-[250px] opacity-25 pointer-events-none"
        style={{
          x: glowX,
          y: glowY,
          top: "20%",
          left: "40%",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/60" style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.05em" }}>
              YOUR TRUSTED TECHNOLOGY PARTNER
            </span>
          </motion.div>

          {/* Headline with character stagger */}
          <h1
            className="text-white mb-6 overflow-hidden"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            <span className="block overflow-hidden">
              {headline1.split("").map((char, i) => (
                <motion.span
                  key={`h1-${i}`}
                  className="inline-block"
                  initial={{ y: 80, opacity: 0, rotateX: 90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.04,
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              {headline2.split("").map((char, i) => (
                <motion.span
                  key={`h2-${i}`}
                  className="inline-block"
                  initial={{ y: 80, opacity: 0, rotateX: 90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.04,
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subtitle with line reveal */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-white/50 max-w-xl mb-10"
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
            transition={{ delay: 1.6, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              className="relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#0a1f3c] rounded-xl overflow-hidden group"
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
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.96 }}
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white/80 rounded-xl hover:text-white transition-all"
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
              transition={{ delay: 2 + i * 0.15, duration: 0.6 }}
              className="text-center lg:text-left group"
            >
              <div
                className="text-white mb-1 tabular-nums"
                style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              <motion.div
                className="h-px bg-gradient-to-r from-[#6b9fff]/0 via-[#6b9fff]/30 to-[#6b9fff]/0 mb-2 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2.3 + i * 0.15, duration: 0.8 }}
              />
              <div className="text-white/40" style={{ fontSize: "14px", fontWeight: 500 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
            <motion.div
              className="w-1 h-2.5 bg-white/40 rounded-full"
              animate={{ opacity: [0.2, 0.8, 0.2], scaleY: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
