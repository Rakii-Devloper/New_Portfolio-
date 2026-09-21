'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';

const HERO_IMAGES: Record<string, string> = {
  nebula: '/hero-bg-nebula.png',
  bloom: '/hero-bg-bloom.png',
  ink: '/hero-bg-ink.png',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = useThemeStore((s) => s.theme);
  const heroImage = HERO_IMAGES[theme] ?? HERO_IMAGES.nebula;

  // Mouse-driven parallax effect for the illustration
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const springY = useSpring(my, { stiffness: 60, damping: 20 });
  const imgX = useTransform(springX, [-0.5, 0.5], [12, -12]);
  const imgY = useTransform(springY, [-0.5, 0.5], [8, -8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[92vh] items-center overflow-hidden py-12 lg:py-0"
    >
      {/* Soft Ambient Background Glow (Optional Subtle Gradient) */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-bg to-bg pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          
          {/* LEFT SIDE: Text & CTA Content (7 Columns on Large Screens) */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7"
          >
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Available for new opportunities
            </motion.div>

            <motion.p variants={item} className="mb-2 text-lg text-muted">
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              variants={item}
              className="max-w-2xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
            >
              Rakesh <span className="text-accent">Antony</span>
            </motion.h1>

            <motion.p variants={item} className="mt-4 max-w-lg text-xl text-muted">
              Full Stack Developer
            </motion.p>

            <motion.p variants={item} className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">
              I build modern, responsive and interactive web applications that solve
              real problems — with clean code, considered UI, and motion that means
              something.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="focus-ring group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition hover:shadow-glow"
              >
                View my projects
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href="/resume.pdf"
                download
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-text transition hover:border-accent/60"
              >
                Download resume
                <Download size={15} />
              </a>
            </motion.div>

            {/* <motion.div variants={item} className="mt-9 flex items-center gap-5 text-muted">
              <a href="https://github.com" aria-label="GitHub" className="focus-ring transition hover:text-accent"><Github size={19} /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="focus-ring transition hover:text-accent"><Linkedin size={19} /></a>
              <a href="mailto:hello@rakeshantony.dev" aria-label="Email" className="focus-ring transition hover:text-accent"><Mail size={19} /></a>
            </motion.div> */}
           <motion.div variants={item} className="mt-9 flex items-center gap-3">
  {/* GitHub */}
  <a
    href="https://github.com/Rakii-Devloper"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub Profile"
    className="focus-ring group relative flex items-center justify-center rounded-xl border border-border bg-surface/50 p-3 text-muted backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:bg-surface hover:text-accent hover:shadow-glow hover:-translate-y-0.5"
  >
    <Github size={19} />
  </a>

  {/* LinkedIn */}
  <a
    href="https://linkedin.com/in/your-profile" // Replace with actual LinkedIn link
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn Profile"
    className="focus-ring group relative flex items-center justify-center rounded-xl border border-border bg-surface/50 p-3 text-muted backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:bg-surface hover:text-accent hover:shadow-glow hover:-translate-y-0.5"
  >
    <Linkedin size={19} />
  </a>

  {/* Email */}
  <a
    href="mailto:hello@rakeshantony.dev"
    aria-label="Send Email"
    className="focus-ring group relative flex items-center justify-center rounded-xl border border-border bg-surface/50 p-3 text-muted backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:bg-surface hover:text-accent hover:shadow-glow hover:-translate-y-0.5"
  >
    <Mail size={19} />
  </a>
</motion.div>
          </motion.div>

          {/* RIGHT SIDE: Dedicated Image Area with Parallax Effect (5 Columns) */}
          <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
            <motion.div
              style={{ x: imgX, y: imgY }}
              className="relative aspect-square w-full max-w-[480px] overflow-hidden rounded-2xl"
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={heroImage}
                  className="relative h-full w-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={heroImage}
                    alt="Rakesh Antony - Illustration"
                    fill
                    priority
                    className="object-contain object-center"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}