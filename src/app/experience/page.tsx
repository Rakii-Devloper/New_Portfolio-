'use client';

import { motion } from 'framer-motion';

const TIMELINE = [
  {
    role: 'Freelance Full Stack & Automation Engineer',
    org: 'Self-Employed',
    period: 'Jun 2024 — Present',
    desc: 'Building custom full-stack web applications, automated trading dashboards, and web scraping systems. Focusing on React, Next.js, Node.js, and Python automation tools.'
  },
  {
    role: 'Technical Team Lead & Operations Lead',
    org: 'Hexaware Technologies',
    period: 'Apr 2025 — May 2026',
    desc: 'Directed operational workflows and led a 21-member engineering team. Managed project execution, code reviews, and streamlined delivery for enterprise clients.'
  },
  {
    role: 'Full Stack Developer & Technical Lead',
    org: 'WISRIGHT',
    period: 'Jan 2023 — Jun 2024',
    desc: 'Architected enterprise CRM modules and optimized frontend performance. Leveraged React, TypeScript, GraphQL, and ASP.NET Web API to deliver high-throughput business solutions.'
  },
  {
    role: 'Frontend Developer',
    org: 'CODENATIVES',
    period: 'Feb 2022 — May 2022',
    desc: 'Developed responsive, high-performance web components using modern JavaScript frameworks and Tailwind CSS, collaborating closely with backend engineering teams.'
  },
  {
    role: 'Freelance Software Developer',
    org: 'Self-Employed',
    period: 'Jan 2020 — Jan 2021',
    desc: 'Delivered client projects across full-stack web engineering, custom web integrations, and frontend interface designs.'
  }
];

export default function ExperiencePage() {
  return (
    <section className="relative mx-auto w-full px-5 py-24 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="mb-3 text-center text-sm font-medium tracking-wide text-accent">
          Experience
        </p>
        <h1 className="mb-20 text-center font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl text-foreground">
          Where I&apos;ve worked
        </h1>

        <div className="relative">
          {/* Central Line using original theme border */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-border z-0" />

          <div className="space-y-12 md:space-y-16">
            {TIMELINE.map((t, i) => {
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={t.role + t.period}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.85, 
                    x: isEven ? -50 : 50 
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: 0 
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 0.05 
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 } 
                  }}
                  className="group relative grid grid-cols-1 md:grid-cols-2 md:gap-x-16 items-center"
                >
                  {/* Content Box using Theme Variables */}
                  <div className={isEven ? "block" : "hidden md:block md:col-start-2"}>
                    <div
                      className={`
                        ${isEven ? 'md:text-right' : 'md:text-left'} 
                        p-6 rounded-2xl border border-border 
                        bg-bg/80 backdrop-blur-md 
                        transition-all duration-300 
                        group-hover:border-accent group-hover:shadow-lg
                      `}
                    >
                      <p className="text-xs text-accent mb-1.5 tracking-wider font-semibold uppercase">
                        {t.period}
                      </p>
                      <h2 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight">
                        {t.role}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-accent">
                        {t.org}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted group-hover:text-foreground transition-colors">
                        {t.desc}
                      </p>
                    </div>
                  </div>

                  {/* Centered Node Circle using Theme Variables */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center pointer-events-none"
                  >
                    <div className="h-4 w-4 rounded-full border-2 border-accent bg-bg group-hover:scale-150 group-hover:bg-accent transition-all duration-300" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}