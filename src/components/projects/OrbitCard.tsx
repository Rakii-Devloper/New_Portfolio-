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
  // Scale and opacity tuning to hide rear overlapping text
  const scale = 0.65 + proximity * 0.45;
  const opacity = Math.pow(proximity, 3); // Sharp drop for background cards to avoid text bleed

  return (
    <Html center distanceFactor={10} zIndexRange={[Math.round(proximity * 100), 0]} transform={false}>
      <motion.button
        onClick={onSelect}
        animate={{ scale, opacity }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        className="relative flex w-64 select-none flex-col overflow-hidden rounded-2xl border text-left shadow-2xl focus:outline-none"
        style={{
          borderColor: front ? project.gradient[0] : 'rgba(255, 255, 255, 0.1)',
          // Solid Background so text behind NEVER bleeds through
          backgroundColor: '#0c101d',
          boxShadow: front ? `0 0 35px 0 ${project.gradient[0]}66` : '0 10px 30px rgba(0,0,0,0.5)',
          pointerEvents: front ? 'auto' : 'none',
          cursor: front ? 'pointer' : 'default',
        }}
      >
        {/* Banner with Gradient & Image */}
        <div
          className="relative h-28 w-full overflow-hidden bg-slate-900"
          style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
        >
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover opacity-90 transition-opacity hover:opacity-100"
            />
          )}
        </div>

        {/* Content Container with Solid Dark Background */}
        <div className="p-4 bg-[#0c101d]">
          <h3 className="font-display text-sm font-semibold text-white line-clamp-1">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs text-slate-400 leading-relaxed">{project.desc}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-[10px] text-sky-400 font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>

        {front && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between border-t border-slate-800 bg-[#090d18] px-4 py-2.5 text-xs font-medium text-sky-400"
          >
            View project
            <ArrowUpRight size={13} />
          </motion.div>
        )}
      </motion.button>
    </Html>
  );
}