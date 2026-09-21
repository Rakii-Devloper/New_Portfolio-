'use client';

import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import type { SkillNode } from '@/data/skillsGraph';
import { SKILL_ICONS } from '@/data/skillIcons';

interface Props {
  node: SkillNode;
  dimmed: boolean;
  hovered: boolean;
  onHover: (id: string | null) => void;
}

export default function GraphNode({ node, dimmed, hovered, onHover }: Props) {
  const meta = SKILL_ICONS[node.id];
  const size = node.big ? 64 : 52;

  return (
    <Html center distanceFactor={9} zIndexRange={hovered ? [100, 0] : [10, 0]} occlude={false}>
      <motion.div
        onMouseEnter={() => onHover(node.id)}
        onMouseLeave={() => onHover(null)}
        animate={{
          scale: hovered ? 1.35 : 1,
          opacity: dimmed ? 0.35 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative flex cursor-pointer select-none flex-col items-center"
      >
        <div
          className="flex items-center justify-center rounded-full border shadow-lg backdrop-blur-sm"
          style={{
            width: size,
            height: size,
            backgroundColor: 'rgb(var(--surface))',
            borderColor: hovered ? meta.color : 'rgb(var(--border))',
            boxShadow: hovered ? `0 0 24px 0 ${meta.color}66` : undefined,
            fontSize: node.big ? 26 : 21,
            color: meta.color,
          }}
        >
          <meta.icon />
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none absolute -bottom-8 whitespace-nowrap rounded-lg border border-border bg-surface px-2.5 py-1 text-[11px] shadow-lg"
        >
          <span className="font-medium">{node.name}</span>
          <span className="ml-1.5 text-accent">{node.level}%</span>
        </motion.div>
      </motion.div>
    </Html>
  );
}
