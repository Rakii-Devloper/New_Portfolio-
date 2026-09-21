'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music2 } from 'lucide-react';
import { useMusicStore } from '@/store/useMusicStore';

export default function MusicPlayer() {
  const { playing, toggle, volume, setVolume } = useMusicStore();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        className="focus-ring relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/70 text-text backdrop-blur-md transition hover:border-accent/60"
      >
        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full border border-accent/60"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        {playing ? <Volume2 size={17} /> : <Music2 size={17} />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, width: 0, x: -8 }}
            animate={{ opacity: 1, width: 120, x: 0 }}
            exit={{ opacity: 0, width: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 overflow-hidden rounded-full border border-border bg-surface/70 px-3 py-2 backdrop-blur-md"
          >
            <VolumeX size={13} className="shrink-0 text-muted" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="h-1 w-full accent-accent"
              aria-label="Music volume"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
