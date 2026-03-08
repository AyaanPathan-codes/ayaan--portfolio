import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ArrowUp } from "lucide-react";
import XIcon from "./icons/XIcon";

const Footer = React.memo(() => {
  return (
    <footer className="relative border-t border-border">
      <div className="absolute top-0 left-0 right-0 h-px animated-gradient-border" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <span className="font-display font-bold text-lg text-foreground text-glow-cyan">AP</span>
            <p className="text-xs font-body text-muted-foreground mt-1">Ayaan Pathan — Building the future, one line at a time.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {["About", "Projects", "Services", "Contact"].map((l) => (
              <button
                key={l}
                onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                className="text-xs font-body text-muted-foreground hover:text-primary transition-all duration-300"
              >
                {l}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
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
                whileHover={{ y: -3 }}
                className="w-9 h-9 rounded-full glass-glow flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Icon className={isCustom ? "w-3.5 h-3.5" : "w-4 h-4"} />
              </motion.a>
            ))}

            <motion.button
              whileHover={{ y: -2 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-9 h-9 rounded-full glass-glow flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300 ml-2"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <span className="text-xs font-body text-muted-foreground/50">
            © {new Date().getFullYear()} — Designed & Built with passion
          </span>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
