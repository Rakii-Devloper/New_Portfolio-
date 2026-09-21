'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { SKILL_NODES } from '@/data/skillsGraph';
import { SKILL_ICONS } from '@/data/skillIcons';

const SkillsGraph = dynamic(() => import('@/components/skills/SkillsGraph'), { ssr: false });

export default function SkillsPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <p className="mb-3 text-sm text-accent">Skills</p>
      <h1 className="max-w-lg font-display text-4xl font-semibold tracking-tight md:text-5xl">
        What I build with
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
        Hover a node to see how everything connects — from markup, through
        frameworks, to the motion layer on top.
      </p>

      {/* 3D constellation — desktop / tablet, pointer devices */}
      <div className="relative mt-10 hidden h-[480px] w-full overflow-hidden rounded-2xl border border-border bg-surface/30 sm:block">
        <SkillsGraph />
      </div>

      {/* simple grid fallback — small screens, and a readable backup for
          anyone who can't easily use the hover-driven 3D graph */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:hidden">
        {SKILL_NODES.map((node, i) => {
          const meta = SKILL_ICONS[node.id];
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-3.5 py-3"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg"
                style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
              >
                <meta.icon />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm">{node.name}</p>
                <p className="text-xs text-muted">{node.level}%</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
