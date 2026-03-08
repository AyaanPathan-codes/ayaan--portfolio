import React from "react";
import { Code2, Terminal, Braces, Database, Cloud, Cpu, GitBranch, Layers } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FloatingIconProps {
  Icon: React.ElementType;
  className: string;
  delay?: string;
}

const FloatingIcon = ({ Icon, className, delay }: FloatingIconProps) => (
  <div
    className={`absolute pointer-events-none ${className}`}
    style={{ animationDelay: delay }}
  >
    <Icon className="w-full h-full" strokeWidth={1.5} />
  </div>
);

const FloatingOrb = ({ className, color = "cyan" }: { className: string; color?: "cyan" | "violet" }) => (
  <div
    className={`absolute pointer-events-none rounded-full ${
      color === "cyan" ? "bg-primary/30" : "bg-secondary/30"
    } ${className}`}
  />
);

export const AboutFloaters = React.memo(() => {
  const isMobile = useIsMobile();

  return (
    <>
      <FloatingIcon Icon={Code2} className={`${isMobile ? 'w-6 h-6' : 'w-10 h-10'} top-16 right-[10%] float-1 text-primary/50`} delay="0s" />
      <FloatingIcon Icon={Terminal} className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'} bottom-20 left-[8%] float-2 text-secondary/45`} delay="1s" />
      <FloatingIcon Icon={Braces} className={`${isMobile ? 'w-5 h-5' : 'w-9 h-9'} top-1/3 right-[5%] float-3 text-primary/40`} delay="2s" />
      {!isMobile && (
        <>
          <FloatingOrb className="w-32 h-32 -top-10 left-[15%] blur-2xl breathe" color="violet" />
          <FloatingOrb className="w-40 h-40 bottom-10 right-[12%] blur-3xl breathe-slow" color="cyan" />
        </>
      )}
    </>
  );
});
AboutFloaters.displayName = "AboutFloaters";

export const EducationFloaters = React.memo(() => {
  const isMobile = useIsMobile();

  return (
    <>
      <FloatingIcon Icon={GitBranch} className={`${isMobile ? 'w-5 h-5' : 'w-9 h-9'} top-20 right-[8%] float-2 text-primary/45`} delay="0.5s" />
      <FloatingIcon Icon={Layers} className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'} bottom-24 left-[6%] float-4 text-secondary/45`} delay="1.5s" />
      <FloatingIcon Icon={Cpu} className={`${isMobile ? 'w-6 h-6' : 'w-10 h-10'} top-1/2 left-[3%] float-1 text-primary/40`} delay="0s" />
      {!isMobile && (
        <>
          <FloatingOrb className="w-36 h-36 top-10 right-[5%] blur-3xl breathe-slow" color="violet" />
          <FloatingOrb className="w-28 h-28 bottom-16 left-[10%] blur-2xl breathe" color="cyan" />
        </>
      )}
    </>
  );
});
EducationFloaters.displayName = "EducationFloaters";

export const ContactFloaters = React.memo(() => {
  const isMobile = useIsMobile();

  return (
    <>
      <FloatingIcon Icon={Cloud} className={`${isMobile ? 'w-5 h-5' : 'w-9 h-9'} top-16 left-[5%] float-3 text-primary/45`} delay="1s" />
      <FloatingIcon Icon={Database} className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'} bottom-16 right-[6%] float-1 text-secondary/50`} delay="0s" />
      {!isMobile && (
        <>
          <FloatingOrb className="w-44 h-44 -bottom-10 left-1/3 blur-3xl breathe-slow" color="violet" />
          <FloatingOrb className="w-28 h-28 top-20 right-[15%] blur-2xl breathe" color="cyan" />
        </>
      )}
    </>
  );
});
ContactFloaters.displayName = "ContactFloaters";
