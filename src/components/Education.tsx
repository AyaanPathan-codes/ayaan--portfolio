import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EducationFloaters } from "./FloatingElements";
import { useCountUp, useInView } from "@/hooks/useCountUp";

const milestones = [
  {
    institution: "VU University, Pune",
    degree: "B.Tech in Computer Engineering",
    year: "2023 – 2026 (Pursuing)",
    achievementNum: 8.44,
    achievementLabel: "CGPA",
    achievementSuffix: "/10",
    isDecimal: true,
  },
  {
    institution: "MSBTE",
    degree: "Diploma in Computer Engineering",
    year: "2020 – 2023",
    achievementNum: 79.4,
    achievementLabel: "CGPA",
    achievementSuffix: "",
    isDecimal: true,
  },
  {
    institution: "Secondary School",
    degree: "Class X",
    year: "2019 – 2020",
    achievementNum: 0,
    achievementLabel: "",
    achievementSuffix: "",
    isDecimal: false,
  },
];

const AchievementCounter = React.memo(({ num, label, suffix, isDecimal }: { num: number; label: string; suffix: string; isDecimal: boolean }) => {
  const { ref, inView } = useInView(0.5);
  const wholeNum = isDecimal ? Math.floor(num * 10) : num;
  const count = useCountUp(wholeNum, inView, 1500);
  const display = isDecimal ? (count / 10).toFixed(1) : count;

  return (
    <span ref={ref} className="text-xs font-mono text-secondary">
      {label}: <span className="text-sm font-bold text-primary text-glow-cyan">{display}{suffix}</span>
    </span>
  );
});
AchievementCounter.displayName = "AchievementCounter";

const Education = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="education" ref={sectionRef} className="py-20 md:py-40 px-5 sm:px-6 relative dot-grid overflow-hidden">
      <EducationFloaters />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-primary tracking-wider mb-4">
            Education
          </span>
          <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-display font-bold">
            My <span className="text-gradient-cyan">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* SVG Rope line - desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 32 600" preserveAspectRatio="none" fill="none">
              <motion.path
                d="M16 0 C16 0, 8 50, 16 100 C24 150, 8 200, 16 250 C24 300, 8 350, 16 400 C24 450, 8 500, 16 550 C20 575, 16 600, 16 600"
                stroke="url(#rope-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="rope-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(183 100% 50%)" />
                  <stop offset="100%" stopColor="hsl(263 90% 51%)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Mobile line */}
          <div className="absolute left-4 top-0 bottom-0 w-px md:hidden">
            <motion.div
              className="w-full h-full origin-top"
              style={{
                scaleY: pathLength,
                background: "linear-gradient(to bottom, hsl(183 100% 50%), hsl(263 90% 51%))",
              }}
            />
          </div>

          {/* Milestones */}
          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="relative">
                  {/* Dot on line */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary pulse-glow z-10"
                    style={{ top: "1.5rem" }}
                  />

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`ml-10 md:ml-0 md:w-[calc(50%-3rem)] ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
                  >
                    <div className="glass rounded-2xl p-5 sm:p-6">
                      <span className="text-xs font-mono text-primary mb-2 block">{m.year}</span>
                      <h3 className="text-base sm:text-lg font-display font-semibold text-foreground mb-1">{m.degree}</h3>
                      <p className="text-sm font-body text-muted-foreground mb-2">{m.institution}</p>
                      {m.achievementNum > 0 && (
                        <AchievementCounter
                          num={m.achievementNum}
                          label={m.achievementLabel}
                          suffix={m.achievementSuffix}
                          isDecimal={m.isDecimal}
                        />
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

Education.displayName = "Education";
export default Education;
