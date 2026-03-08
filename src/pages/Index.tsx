import React, { Suspense, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomCursor = React.lazy(() => import("@/components/CustomCursor"));
const Navbar = React.lazy(() => import("@/components/Navbar"));
const Hero = React.lazy(() => import("@/components/Hero"));
const About = React.lazy(() => import("@/components/About"));
const TechStack = React.lazy(() => import("@/components/TechStack"));
const Services = React.lazy(() => import("@/components/Services"));
const Experience = React.lazy(() => import("@/components/Experience"));
const Projects = React.lazy(() => import("@/components/Projects"));
const Education = React.lazy(() => import("@/components/Education"));
const Reviews = React.lazy(() => import("@/components/Reviews"));
const Contact = React.lazy(() => import("@/components/Contact"));
const Footer = React.lazy(() => import("@/components/Footer"));

const GlowDivider = () => (
  <div className="max-w-md mx-auto glow-divider" />
);

const Index = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Skip smooth scroll on mobile for better performance
    if (isMobile) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden max-w-[100vw]">
      {/* Global ambient orbs - hidden on mobile */}
      {!isMobile && (
        <>
          <div className="glow-orb glow-orb-violet w-[300px] h-[300px] top-[50vh] left-[-100px] breathe-slow fixed" style={{ opacity: 0.06 }} />
          <div className="glow-orb glow-orb-cyan w-[250px] h-[250px] top-[70vh] right-[-80px] breathe fixed" style={{ opacity: 0.05, animationDelay: "4s" }} />
        </>
      )}

      {/* Critical: Navbar + Hero load first */}
      <Suspense fallback={null}>
        {!isMobile && <CustomCursor />}
        <Navbar />
        <Hero />
      </Suspense>

      {/* Below-fold content loads after */}
      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <GlowDivider />
        <About />
        <GlowDivider />
        <TechStack />
        <GlowDivider />
        <Services />
        <GlowDivider />
        <Experience />
        <GlowDivider />
        <Projects />
        <GlowDivider />
        <Education />
        <GlowDivider />
        <Reviews />
        <GlowDivider />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
