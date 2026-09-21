'use client';

import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
  front: boolean;
  proximity: number; // 0 (back) → 1 (front)
  onSelect: () => void;
}

export default function OrbitCard({ project, front, proximity, onSelect }: Props) {
  const scale = 0.72 + proximity * 0.4;
  const opacity = 0.25 + proximity * 0.75;

  return (
    <Html center distanceFactor={10} zIndexRange={[Math.round(proximity * 100), 0]} transform={false}>
      <motion.button
        onClick={onSelect}
        animate={{ scale, opacity }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="relative flex w-56 select-none flex-col overflow-hidden rounded-2xl border text-left shadow-xl focus:outline-none"
        style={{
          borderColor: front ? project.gradient[0] : 'rgb(var(--border))',
          backgroundColor: 'rgb(var(--surface))',
          boxShadow: front ? `0 0 30px 0 ${project.gradient[0]}55` : undefined,
          pointerEvents: front ? 'auto' : 'none',
          cursor: front ? 'pointer' : 'default',
        }}
      >
        <div
          className="relative h-28 w-full"
          style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
        />
        <div className="p-4">
          <h3 className="font-display text-sm font-medium">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted">{project.desc}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] text-accent">
                {t}
              </span>
            ))}
          </div>
        </div>

        {front && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-accent"
          >
            View project
            <ArrowUpRight size={13} />
          </motion.div>
        )}
      </motion.button>
    </Html>
  );
}
