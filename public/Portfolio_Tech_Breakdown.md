# Ayaan Pathan — Portfolio Website Technical Breakdown

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework (component-based) |
| TypeScript | Type-safe JavaScript |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Framer Motion | React animation library |
| GSAP + ScrollTrigger | Scroll-based animations |
| React Type Animation | Typing effect in Hero |
| Lenis | Smooth scroll (desktop only) |
| Lucide React | Icon library |
| EmailJS | Contact form email sending |
| React Router DOM | Routing (single page + 404) |
| React Hook Form + Zod | Form validation |
| shadcn/ui | Pre-built UI components |

---

## 📦 Components Breakdown

### 1. Navbar (Navbar.tsx)
- Fixed top navigation with glassmorphism background
- Scroll progress bar — framer-motion useScroll + useSpring animated horizontal line
- Active section highlighting via scroll spy
- Mobile hamburger menu with slide-down animation
- "Hire Me" button with shimmer border effect
- AP logo with pulse-glow animation

### 2. CustomCursor (CustomCursor.tsx)
- Custom cursor replacement (desktop only)
- Follows mouse position smoothly

### 3. Hero (Hero.tsx)
- Word-by-word reveal — framer-motion variants with staggered delays
- TypeAnimation — rotating roles (MERN Stack Developer, Java Backend Engineer, etc.)
- Profile image with:
  - spin-ring — conic-gradient spinning border
  - glow-cyan-soft — subtle cyan box-shadow
  - Floating tech badges (React, Java, AWS, MongoDB) with float-1 to float-4 animations
- Glow orbs — breathe and breathe-slow pulsing background blobs
- Scroll indicator — "SCROLL" text + ChevronDown with bounce-scroll
- CTAs: "View My Work" (scroll) + "Download CV" (PDF download)
- Social links: GitHub, LinkedIn, X (Twitter)

### 4. About (About.tsx)
- GSAP ScrollTrigger animations on chip, heading, text, stats, CTAs
- CountUp stats — numbers animate from 0 to target (6+ Projects, 3+ Clients)
- Custom useCountUp hook with useInView intersection observer
- FloatingElements — Code2, Terminal, Braces icons floating with float-y keyframes
- dot-grid background pattern

### 5. TechStack (TechStack.tsx)
- Infinite marquee — two rows scrolling left/right (marquee-left, marquee-right keyframes)
- Tech icons from devicons CDN
- GSAP fade-in on scroll
- Glass card style per tech item

### 6. Services (Services.tsx)
- 5 service cards in responsive grid (1 → 2 → 3 columns)
- TiltCard (desktop) — 3D tilt effect on mouse move
- Mouse spotlight — radial-gradient follows cursor via CSS custom properties
- Gradient border on hover — mask-composite trick for 1px gradient border
- Mobile: whileTap scale tap feedback
- GSAP staggered reveal on scroll

### 7. Experience (Experience.tsx)
- Timeline-style cards with framer-motion whileInView
- TiltCard (desktop) / whileTap (mobile)
- Gradient hover border (desktop)
- Tags with glass style
- Bullet points with cyan dots

### 8. Projects (Projects.tsx)
- Project cards with image + overlay on hover
- TiltCard (desktop) / whileTap + whileInView (mobile)
- Hover overlay shows: title, description, tags, Live Demo + GitHub links
- GSAP staggered card reveal
- "View All Projects" CTA linking to GitHub

### 9. Education (Education.tsx)
- Timeline with SVG rope — framer-motion useScroll + pathLength animated wavy SVG path
- Mobile: simple gradient vertical line with scaleY animation
- Milestone dots — scale spring animation with pulse-glow
- AchievementCounter — CGPA numbers count up on scroll
- EducationFloaters — GitBranch, Layers, Cpu floating icons

### 10. Contact (Contact.tsx)
- Contact form with EmailJS integration
- React Hook Form + Zod validation
- ContactFloaters — Cloud, Database floating icons
- dot-grid background

### 11. Footer (Footer.tsx)
- Simple footer with links and credits

### 12. FloatingElements (FloatingElements.tsx)
- Reusable floating icons + orbs for About, Education, Contact sections
- Smaller sizes on mobile, orbs hidden on mobile for performance

---

## ✨ CSS Effects & Animations (index.css)

| Effect | Description |
|---|---|
| dot-grid | Radial gradient dot pattern background |
| text-gradient-cyan | Cyan → violet text gradient |
| text-gradient-violet | Violet → pink text gradient |
| text-glow-cyan/violet | Text shadow glow |
| glass | Glassmorphism (5% white bg + blur) |
| glass-strong | Stronger glass (60% black + blur) |
| glass-glow | Glass with hover glow effect |
| glow-orb | Large ambient background blobs |
| glow-cyan/violet | Box-shadow glow effects |
| float-1 to float-4 | Floating Y-axis animations (different speeds/delays) |
| breathe / breathe-slow | Scale pulsing (1 → 1.15 → 1) |
| pulse-glow | Box-shadow pulsing |
| spin-ring | 360° rotation for profile border |
| bounce-scroll | Bouncing scroll indicator |
| marquee-left/right | Infinite horizontal scroll |
| shimmer-border | Animated gradient border on "Hire Me" |
| animated-gradient-border | Scroll progress bar gradient |
| glow-divider | Section separator with gradient line |
| btn-glow | Button hover glow |

---

## 📱 Mobile Optimizations

- useIsMobile() hook — viewport detection (< 768px)
- Lighter blur values (4-6px vs 8-12px)
- Smaller floating icons
- whileTap instead of TiltCard for touch feedback
- Glow orbs reduced in size
- Smooth scroll (Lenis) disabled
- Custom cursor disabled
- Marquee slowed down (50s vs 30s)

---

## 🏗️ Architecture

- Lazy loading — all components below Hero use React.lazy + Suspense
- React.memo — every component memoized
- GSAP context — proper cleanup with ctx.revert()
- Semantic HTML — proper section IDs for navigation
- Performance — loading="lazy" on images, passive scroll listeners

---

Generated on: March 8, 2026
