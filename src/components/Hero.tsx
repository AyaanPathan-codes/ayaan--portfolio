import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, Download, Github, Linkedin, ChevronDown } from "lucide-react";
import XIcon from "./icons/XIcon";
import profileImg from "@/assets/profile.jpg";
import { useIsMobile } from "@/hooks/use-mobile";

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: "easeOut" },
  }),
};

const Hero = React.memo(() => {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex items-center px-5 sm:px-6 overflow-hidden dot-grid">
      {/* Ambient glow orbs */}
      <div className={`glow-orb glow-orb-cyan ${isMobile ? 'w-[200px] h-[200px]' : 'w-[400px] h-[400px]'} -top-40 -left-40 breathe`} />
      <div className={`glow-orb glow-orb-violet ${isMobile ? 'w-[150px] h-[150px]' : 'w-[350px] h-[350px]'} top-1/3 -right-32 breathe-slow`} />
      {!isMobile && (
        <div className="glow-orb glow-orb-cyan w-[250px] h-[250px] bottom-20 left-1/4 breathe-slow" style={{ animationDelay: "3s" }} />
      )}

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-20 items-center pt-20 pb-16 relative z-10">
        {/* LEFT */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4"
          >
            <span className="text-sm font-mono text-primary tracking-wider text-glow-cyan">{"<hello world />"}</span>
          </motion.div>

          <h1 className="text-[clamp(2rem,7vw,5rem)] font-display font-bold leading-[1.05] mb-4 sm:mb-6">
            {["Hi,", "I'm", "a"].map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-[0.3em] text-foreground"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              custom={3}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="inline-block text-gradient-cyan text-glow-cyan"
            >
              Ayaan
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="h-8 mb-4 sm:mb-6"
          >
            <TypeAnimation
              sequence={[
                "MERN Stack Developer",
                2000,
                "Java Backend Engineer",
                2000,
                "AWS Cloud Enthusiast",
                2000,
                "Full Stack Developer",
                2000,
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
              className="text-base sm:text-lg font-body text-primary font-medium"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-muted-foreground font-body text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed"
          >
            Fresh out of college, obsessed with building stuff that works and looks clean. Let's make something cool together.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-body font-medium text-sm btn-glow"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
            <motion.a
              href="/Ayaan_Pathan_Resume.pdf"
              download="Ayaan_Pathan_Resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full border border-border text-foreground font-body font-medium text-sm hover:border-primary/50 transition-colors duration-300 btn-glow"
            >
              Download CV
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
            </motion.a>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex justify-center lg:justify-start gap-4"
          >
            {[
              { Icon: Github, href: "https://github.com/AyaanPathan-codes" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/ayaan-pathan-15940b2a9/" },
              { Icon: XIcon, href: "https://x.com/AyaanPathan18", isCustom: true },
            ].map(({ Icon, href, isCustom }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="w-10 h-10 rounded-full glass-glow flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Icon className={isCustom ? "w-3.5 h-3.5" : "w-4 h-4"} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT - Profile image */}
        <div className="order-1 lg:order-2 flex justify-center overflow-visible">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Outer glow behind photo */}
            <div className="absolute -inset-8 rounded-full bg-primary/5 blur-2xl sm:blur-3xl" />

            <div className="absolute -inset-3 rounded-full spin-ring" style={{
              background: "conic-gradient(from 0deg, hsl(183 100% 50%), hsl(263 90% 51%), hsl(183 100% 50% / 0.2), hsl(183 100% 50%))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
            }} />

            <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden relative z-10 border-2 border-border glow-cyan-soft">
              <img src={profileImg} alt="Ayaan Pathan - Full Stack Developer" className="w-full h-full object-cover object-top" />
            </div>

            {/* Floating tech badges */}
            <div className="absolute -top-4 sm:-top-6 -right-2 sm:-right-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full glass-glow text-[10px] sm:text-xs font-mono text-primary float-1">React</div>
            <div className="absolute top-1/4 -left-8 sm:-left-12 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full glass-glow text-[10px] sm:text-xs font-mono text-secondary float-2">Java</div>
            <div className="absolute -bottom-2 sm:-bottom-4 -right-4 sm:-right-8 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full glass-glow text-[10px] sm:text-xs font-mono text-primary float-3">AWS</div>
            <div className="absolute bottom-1/4 -left-6 sm:-left-8 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full glass-glow text-[10px] sm:text-xs font-mono text-secondary float-4">MongoDB</div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 bounce-scroll">
        <span className="text-[10px] font-body tracking-[0.3em] uppercase text-muted-foreground pl-[0.3em]">Scroll</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
