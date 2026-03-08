import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import TiltCard from "./TiltCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Java Developer Intern",
    company: "AB Infortech",
    period: "Present",
    current: true,
    points: [
      "Working on Java-based enterprise applications and backend services",
      "Building and maintaining scalable REST APIs using Spring Boot",
      "Collaborating with the team on production-level software solutions",
    ],
    tags: ["Java", "Spring Boot", "REST APIs"],
  },
  {
    role: "Front-End Developer Intern",
    company: "Unified Mentor",
    period: "Oct 2024 – Nov 2024",
    points: [
      "Built front-end architecture for a Gym Website delivering a responsive UI using React.js",
      "Improved load time by 20% through optimized component rendering",
      "Enhanced navigation and UX for smoother user experience",
    ],
    tags: ["React.js", "UI/UX", "Performance"],
  },
  {
    role: "Software Developer Intern",
    company: "IANT",
    period: "Jul 2022 – Aug 2022",
    points: [
      "Developed a cross-platform mobile app for real-time language translation",
      "Implemented user-centric design principles improving translation accuracy",
      "Delivered intuitive UI with seamless multilingual communication",
    ],
    tags: ["Mobile Dev", "UI Design", "Translation"],
  },
];

const Experience = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-title", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-40 px-5 sm:px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="exp-title inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-primary tracking-wider mb-4">
            Experience
          </span>
          <h2 className="exp-title text-[clamp(1.75rem,5vw,3.5rem)] font-display font-bold">
            Where I've <span className="text-gradient-violet">Worked</span>
          </h2>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="group relative"
            >
              {isMobile ? (
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="glass-glow rounded-2xl p-5 sm:p-8 relative overflow-hidden"
                >
                  <ExpCardContent exp={exp} />
                </motion.div>
              ) : (
                <TiltCard className="glass-glow rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, hsl(183 100% 50% / 0.15), hsl(263 90% 51% / 0.15))",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "xor",
                      WebkitMaskComposite: "xor",
                      padding: "1px",
                      borderRadius: "1rem",
                    }}
                  />
                  <ExpCardContent exp={exp} />
                </TiltCard>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

const ExpCardContent = ({ exp }: { exp: typeof experiences[0] }) => (
  <>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
      <div>
        <h3 className="text-lg sm:text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {exp.role}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <Briefcase className="w-3.5 h-3.5 text-primary" />
          <span className="text-sm font-body text-muted-foreground">{exp.company}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass text-xs font-mono text-primary shrink-0 w-fit">
        <Calendar className="w-3 h-3" />
        {exp.period}
      </div>
    </div>

    <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
      {exp.points.map((point, j) => (
        <li key={j} className="flex items-start gap-3">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          <span className="text-xs sm:text-sm font-body text-muted-foreground leading-relaxed">{point}</span>
        </li>
      ))}
    </ul>

    <div className="flex flex-wrap gap-2">
      {exp.tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 rounded-full text-[10px] font-mono bg-primary/10 text-primary border border-primary/20"
        >
          {tag}
        </span>
      ))}
    </div>
  </>
);

Experience.displayName = "Experience";
export default Experience;
