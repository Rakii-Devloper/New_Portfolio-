'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Sparkles } from 'lucide-react';
import AboutDecor from './AboutDecor';

const CARDS = [
  {
    icon: Lightbulb,
    title: 'Problem solver',
    body: 'I enjoy finding simple and effective solutions to complex problems.',
  },
  {
    icon: Sparkles,
    title: 'Always learning',
    body: 'Technology evolves fast, and I love keeping up with the latest trends and tools.',
  },
];

export default function AboutTeaser() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="mb-3 text-sm text-accent">About me</p>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Turning ideas into
            <br />
            <span className="text-accent">digital experiences</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
            I&apos;m a passionate full stack developer with a strong interest in
            modern web technologies, 3D web experiences, and building products
            that make an impact.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-border bg-surface/60 p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <c.icon className="text-accent" size={19} />
                </div>
                <h3 className="mb-2 font-display text-lg font-medium">{c.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* decorative 3D visual — hidden on small screens to keep things light */}
        <div className="relative hidden h-[420px] md:block">
          <AboutDecor />
        </div>
      </div>
    </section>
  );
}
