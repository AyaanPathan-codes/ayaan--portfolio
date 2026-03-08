import React, { useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Server, Cloud, Database, Palette } from "lucide-react";
import TiltCard from "./TiltCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    Icon: Globe,
    title: "Full Stack Web Apps",
    desc: "Building complete web applications from scratch using React, Node.js, and MongoDB — eager to create seamless user experiences with clean, maintainable code.",
  },
  {
    Icon: Server,
    title: "Java Backend Development",
    desc: "Crafting Spring Boot REST APIs with Hibernate ORM — focused on learning enterprise patterns and writing well-structured backend code.",
  },
  {
    Icon: Cloud,
    title: "AWS Cloud Deployment",
    desc: "Deploying applications on AWS using EC2, S3, and Lambda — actively expanding my cloud skills to build scalable infrastructure.",
  },
  {
    Icon: Database,
    title: "Database Design",
    desc: "Designing MongoDB schemas and writing optimized SQL queries — passionate about structuring data for performance and scalability.",
  },
  {
    Icon: Palette,
    title: "Web Design",
    desc: "Creating modern, responsive UI/UX with pixel-perfect attention to detail — bringing designs to life with smooth animations and intuitive interfaces.",
  },
];

const Services = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-title-gsap", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.fromTo(".svc-card-gsap", 
        { y: 60, opacity: 0 }, 
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".svc-grid", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLDivElement>(".svc-card-gsap");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  }, [isMobile]);

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-40 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="svc-title-gsap inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-primary tracking-wider mb-4">
            What I Do
          </span>
          <h2 className="svc-title-gsap text-[clamp(1.75rem,5vw,3.5rem)] font-display font-bold">
            My <span className="text-gradient-violet">Services</span>
          </h2>
        </div>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="svc-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {services.map((svc, i) => {
            const cardContent = (
              <>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(183 100% 50% / 0.06), transparent 60%)",
                  }}
                />
                {!isMobile && (
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    background: "linear-gradient(135deg, hsl(183 100% 50% / 0.2), hsl(263 90% 51% / 0.2))",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                    borderRadius: "1rem",
                  }} />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5">
                    <svc.Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-semibold text-foreground mb-2">{svc.title}</h3>
                  <p className="text-xs sm:text-sm font-body text-muted-foreground leading-relaxed">{svc.desc}</p>
                </div>
              </>
            );

            if (isMobile) {
              return (
                <motion.div
                  key={i}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`svc-card-gsap group relative glass rounded-2xl p-6 overflow-hidden ${i === 3 ? "sm:col-span-2 lg:col-span-2" : ""}`}
                >
                  {cardContent}
                </motion.div>
              );
            }

            return (
              <TiltCard
                key={i}
                className={`svc-card-gsap group relative glass rounded-2xl p-7 overflow-hidden ${i === 3 ? "lg:col-span-2" : ""}`}
              >
                {cardContent}
              </TiltCard>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8 sm:mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-5 sm:px-7 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-body font-medium text-sm"
          >
            Start a Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
});

Services.displayName = "Services";
export default Services;
