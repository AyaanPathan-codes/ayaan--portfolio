import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutFloaters } from "./FloatingElements";
import { useCountUp, useInView } from "@/hooks/useCountUp";

gsap.registerPlugin(ScrollTrigger);

const StatItem = React.memo(({ value, label, suffix, inView }: { value: number; label: string; suffix: string; inView: boolean }) => {
  const count = useCountUp(value, inView, 2000);
  return (
    <div className="about-stat text-center">
      <div className="text-3xl md:text-4xl font-display font-bold text-primary text-glow-cyan">
        {count}{suffix}
      </div>
      <div className="text-xs font-body text-muted-foreground mt-1">{label}</div>
    </div>
  );
});

StatItem.displayName = "StatItem";

const stats = [
  { value: 6, label: "Projects Built", suffix: "+" },
  { value: 3, label: "Clients Delivered", suffix: "+" },
];

const About = React.memo(() => {
  const { ref: statsRef, inView } = useInView(0.3);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-chip", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.fromTo(".about-heading", { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(".about-text", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
      gsap.fromTo(".about-stat", { scale: 0.5, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.6, stagger: 0.12, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
      });
      gsap.fromTo(".about-ctas", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".about-ctas", start: "top 90%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-40 px-5 sm:px-6 relative dot-grid overflow-hidden">
      <AboutFloaters />
      <div className="max-w-4xl mx-auto text-center">
        <span className="about-chip inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-primary tracking-wider mb-6">
          About Me
        </span>

        <h2 className="about-heading text-[clamp(1.75rem,5vw,3.5rem)] font-display font-bold leading-tight mb-4 sm:mb-6">
          A passionate fresher ready to build{" "}
          <span className="text-gradient-cyan">amazing things</span>
        </h2>

        <p className="about-text text-muted-foreground font-body leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          I just graduated and I've been coding non-stop — MERN stack, Java with Spring Boot, deploying stuff on AWS.
          I love figuring out how things work and building them from scratch. Looking for a team where I can grow, ship real products, and keep learning every day.
        </p>

        {/* Stats */}
        <div ref={statsRef} className="about-stats grid grid-cols-2 gap-6 sm:gap-8 max-w-sm mx-auto">
          {stats.map((stat, i) => (
            <StatItem key={i} value={stat.value} label={stat.label} suffix={stat.suffix} inView={inView} />
          ))}
        </div>

        {/* CTAs */}
        <div className="about-ctas flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-12">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-5 sm:px-7 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-body font-medium text-sm btn-glow"
          >
            Explore My Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-5 sm:px-7 py-3 rounded-full border border-border text-foreground font-body font-medium text-sm hover:border-primary/50 transition-colors duration-300 btn-glow"
          >
            Let's Talk
          </motion.button>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";
export default About;
