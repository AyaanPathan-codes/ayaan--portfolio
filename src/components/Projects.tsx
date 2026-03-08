import React, { useEffect, useRef, useState } from "react";
import { motion, useInView as useFramerInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import TiltCard from "./TiltCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "WayFare-AI",
    desc: "AI-powered travel planner using Gemini API to generate personalized itineraries with Google OAuth, Firebase Firestore, and Google Maps integration.",
    tags: [
      { label: "React.js", color: "hsl(183 100% 50%)" },
      { label: "Firebase", color: "hsl(40 90% 55%)" },
      { label: "Gemini API", color: "hsl(263 90% 51%)" },
      { label: "TailwindCSS", color: "hsl(200 80% 50%)" },
    ],
    live: "https://wayfare-ai.vercel.app/",
    github: "https://github.com/AyaanPathan-codes/WayFare-AI",
    featured: true,
  },
  {
    title: "Insider Threat Detection",
    desc: "System to monitor and analyze user activity logs for identifying suspicious insider behavior using ML-based detection modules.",
    tags: [
      { label: "Python", color: "hsl(210 70% 55%)" },
      { label: "Flask", color: "hsl(0 0% 80%)" },
      { label: "ML", color: "hsl(142 70% 45%)" },
      { label: "REST APIs", color: "hsl(20 90% 55%)" },
    ],
    github: "https://github.com/AyaanPathan-codes/Insider_Threat_Detection",
    featured: true,
  },
  {
    title: "Real-Time Chat App",
    desc: "A real-time messaging application with instant communication, user authentication, and live chat functionality.",
    tags: [
      { label: "React.js", color: "hsl(183 100% 50%)" },
      { label: "Node.js", color: "hsl(142 70% 45%)" },
      { label: "Socket.io", color: "hsl(0 0% 80%)" },
      { label: "MongoDB", color: "hsl(142 50% 35%)" },
    ],
    github: "https://github.com/AyaanPathan-codes/realTimeChat-app",
    featured: false,
  },
  {
    title: "Order Management System",
    desc: "Full-stack order management application for tracking and managing orders with efficient backend processing.",
    tags: [
      { label: "Java", color: "hsl(20 90% 55%)" },
      { label: "Spring Boot", color: "hsl(142 70% 45%)" },
      { label: "REST APIs", color: "hsl(263 90% 51%)" },
    ],
    github: "https://github.com/AyaanPathan-codes?tab=repositories",
    featured: false,
  },
];


const MobileProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="proj-card-gsap relative glass rounded-2xl overflow-hidden"
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
        className="h-[2px] bg-gradient-to-r from-primary to-secondary origin-left"
      />
      <div className="p-5 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="flex items-center gap-3 mb-1"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
            className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
          >
            <span className="text-lg font-display font-bold text-primary">{index + 1}</span>
          </motion.div>
          <h3 className="text-base font-display font-semibold text-foreground">{project.title}</h3>
          {project.featured && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.4, type: "spring" }}
              className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-primary/20 text-primary border border-primary/30"
            >
              ★ Main
            </motion.span>
          )}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.35 }}
          className="text-xs font-body text-muted-foreground leading-relaxed"
        >
          {project.desc}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.45 }}
          className="flex flex-wrap gap-1.5"
        >
          {project.tags.map((tag, tagIdx) => (
            <motion.span
              key={tag.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.5 + tagIdx * 0.05 }}
              className="px-2 py-0.5 rounded-full text-[10px] font-mono"
              style={{ background: `${tag.color}20`, color: tag.color, border: `1px solid ${tag.color}40` }}
            >
              {tag.label}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.55 }}
          className="flex gap-3 pt-1"
        >
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-body font-medium">
              <ExternalLink className="w-3 h-3" /> Live Demo
            </a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-foreground text-xs font-body font-medium">
            <Github className="w-3 h-3" /> GitHub
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Projects = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".proj-title-gsap", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.fromTo(".proj-card-gsap",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".proj-grid", start: "top 85%" },
        }
      );

      gsap.fromTo(".proj-cta", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".proj-cta", start: "top 90%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const CardWrapper = isMobile ? React.Fragment : TiltCard;

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-40 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="proj-title-gsap inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-primary tracking-wider mb-4">
            Portfolio
          </span>
          <h2 className="proj-title-gsap text-[clamp(1.75rem,5vw,3.5rem)] font-display font-bold">
            Featured <span className="text-gradient-cyan">Projects</span>
          </h2>
        </div>

        <div className="proj-grid grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, i) => {
              if (isMobile) {
                return (
                  <MobileProjectCard key={i} project={project} index={i} />
                );
              }

              return (
                <TiltCard key={i} className="proj-card-gsap group relative glass rounded-2xl overflow-hidden">
                  <div className="relative aspect-video overflow-hidden bg-muted/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4 p-4">
                      <h3 className="text-lg font-display font-semibold text-foreground">{project.title}</h3>
                      <p className="text-xs font-body text-muted-foreground max-w-[200px] text-center">{project.desc}</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag.label} className="px-2 py-0.5 rounded-full text-[10px] font-mono" style={{
                            background: `${tag.color}20`, color: tag.color, border: `1px solid ${tag.color}40`,
                          }}>{tag.label}</span>
                        ))}
                      </div>
                      <div className="flex gap-3 mt-2">
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-body font-medium hover:opacity-90 transition-opacity">
                            <ExternalLink className="w-3 h-3" /> Live Demo
                          </a>
                        )}
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-foreground text-xs font-body font-medium hover:border-primary/50 transition-colors">
                          <Github className="w-3 h-3" /> GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-display font-semibold text-foreground mb-1">{project.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag.label} className="text-[10px] font-mono text-muted-foreground">{tag.label}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              );
          })}
        </div>

        <div className="proj-cta text-center mt-8 sm:mt-12">
          <motion.a
            href="https://github.com/AyaanPathan-codes"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-full border border-border text-foreground text-sm font-body font-medium hover:border-primary/50 transition-colors duration-300"
          >
            View All Projects
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";
export default Projects;
