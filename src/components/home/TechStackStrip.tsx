'use client';

import { motion } from 'framer-motion';
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiRedux,
  SiTailwindcss, SiNodedotjs, SiExpress, SiGit, SiThreedotjs, SiNextdotjs,
} from 'react-icons/si';

const STACK = [
  { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
  { name: 'CSS3', icon: SiCss, color: '#1572b6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { name: 'React', icon: SiReact, color: '#61dafb' },
  { name: 'Redux', icon: SiRedux, color: '#764abc' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5fa04e' },
  { name: 'Express', icon: SiExpress, color: '#9b9b9b' },
  { name: 'Three.js', icon: SiThreedotjs, color: '#9b9b9b' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#9b9b9b' },
  { name: 'Git', icon: SiGit, color: '#f05032' },
];

export default function TechStackStrip() {
  return (
    <section className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="mb-8 text-sm text-accent">Tech stack</p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface/60 px-4 py-6 transition hover:-translate-y-1 hover:border-accent/50"
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition group-hover:scale-110"
                style={{ backgroundColor: `${tech.color}1a`, color: tech.color }}
              >
                <tech.icon />
              </div>
              <span className="text-xs text-muted">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
