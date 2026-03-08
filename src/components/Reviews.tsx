import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Rizwana Pathan",
    role: "Client — Rhythms Website",
    review:
      "I just told Ayaan what I wanted and he made the whole Rhythms site exactly how I imagined it. The animations are so smooth, my friends thought I hired some big agency. Super happy with how it turned out.",
    rating: 5,
  },
  {
    name: "Farhan Qureshi",
    role: "Client — E-commerce Platform",
    review:
      "Ayaan built my online store and honestly I didn't expect it to look this good. The checkout works perfectly, customers haven't complained once. He even added an admin panel so I can manage everything myself.",
    rating: 5,
  },
  {
    name: "Ajay",
    role: "Client — Cafe Website",
    review:
      "Bro made our cafe website look fire. The menu page, photo gallery, even a reservation form — everything just works. People actually book tables from the site now which is crazy. 10/10 would recommend.",
    rating: 5,
  },
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="group relative glass rounded-2xl p-6 sm:p-7 overflow-hidden flex flex-col w-[320px] sm:w-[380px] shrink-0">
    <Quote className="w-8 h-8 text-primary/20 mb-4" />
    <div className="flex gap-1 mb-4">
      {Array.from({ length: review.rating }).map((_, j) => (
        <Star key={j} className="w-4 h-4 fill-primary text-primary" />
      ))}
    </div>
    <p className="text-xs sm:text-sm font-body text-muted-foreground leading-relaxed mb-6 flex-1">
      "{review.review}"
    </p>
    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
        {review.name.charAt(0)}
      </div>
      <div>
        <h4 className="text-sm font-display font-semibold text-foreground">
          {review.name}
        </h4>
        <p className="text-[11px] font-body text-muted-foreground">
          {review.role}
        </p>
      </div>
    </div>
  </div>
);

const Reviews = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".review-title",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".review-marquee",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".review-marquee", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const doubled = [...reviews, ...reviews];

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="py-20 md:py-40 px-5 sm:px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="review-title inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-primary tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="review-title text-[clamp(1.75rem,5vw,3.5rem)] font-display font-bold">
            What People <span className="text-gradient-violet">Say</span>
          </h2>
        </div>

        {/* Marquee scroll like Arsenal */}
        <div className="review-marquee overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div
            className="flex gap-4 sm:gap-6 animate-marquee-left"
            style={{ width: "max-content" }}
          >
            {doubled.map((review, i) => (
              <ReviewCard key={`${review.name}-${i}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Reviews.displayName = "Reviews";
export default Reviews;
