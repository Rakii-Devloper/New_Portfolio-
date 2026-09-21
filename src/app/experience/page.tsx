'use client';

import { motion } from 'framer-motion';

const TIMELINE = [
  { role: 'Full Stack Developer', org: 'Company Name', period: '2024 — Present', desc: 'What you owned and shipped in this role.' },
  { role: 'Frontend Developer', org: 'Company Name', period: '2022 — 2024', desc: 'What you owned and shipped in this role.' },
  { role: 'Intern', org: 'Company Name', period: '2021 — 2022', desc: 'What you owned and shipped in this role.' },
];

export default function ExperiencePage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <p className="mb-3 text-sm text-accent">Experience</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        Where I&apos;ve worked
      </h1>

      <div className="relative mt-14 space-y-12 border-l border-border pl-8">
        {TIMELINE.map((t, i) => (
          <motion.div
            key={t.role + t.period}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[2.28rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg" />
            <p className="text-xs text-muted">{t.period}</p>
            <h2 className="mt-1 font-display text-lg font-medium">{t.role}</h2>
            <p className="text-sm text-accent">{t.org}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
