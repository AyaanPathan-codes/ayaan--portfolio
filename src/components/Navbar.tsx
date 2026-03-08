import React, { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Navbar = React.memo(() => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY, scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const updateActive = useCallback(() => {
    const sections = links.map(l => l.href.slice(1));
    let current = "";
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) current = `#${id}`;
      }
    }
    setActive(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left animated-gradient-border"
        style={{ scaleX }}
      />

      <motion.div
        className="absolute inset-0 glass-strong"
        style={{ opacity: bgOpacity }}
      />

      <div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="relative w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-sm text-primary-foreground bg-primary pulse-glow"
        >
          AP
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className={`group relative text-xs font-body font-medium tracking-wider uppercase transition-colors duration-300 ${
                active === l.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1 left-0 w-full h-px bg-primary origin-left transition-transform duration-300 ${
                  active === l.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <button
            onClick={() => go("#contact")}
            className="relative px-5 py-2 rounded-full text-xs font-body font-medium uppercase tracking-wider text-foreground overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full shimmer-border opacity-60" />
            <span className="absolute inset-[1px] rounded-full bg-background" />
            <span className="relative">Hire Me</span>
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          className="lg:hidden glass-strong"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-6 py-6 space-y-4">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className={`block text-sm font-body transition-colors py-1 ${
                  active === l.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("#contact")}
              className="mt-4 w-full px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-body font-medium"
            >
              Hire Me
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
