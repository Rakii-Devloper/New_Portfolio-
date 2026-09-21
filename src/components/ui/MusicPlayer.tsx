'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music2 } from 'lucide-react';
import { useMusicStore } from '@/store/useMusicStore';
import { useThemeStore } from '@/store/useThemeStore';

// Audio mapping for themes (Make sure these files exist in public/audio/)
const THEME_AUDIO: Record<string, string> = {
  nebula: '/audio/nebula-space.mp3',
  bloom: '/audio/bloom-nature.mp3',
  ink: '/audio/ink-chill.mp3',
};

export default function MusicPlayer(): React.ReactElement {
  const { playing, toggle, volume, setVolume } = useMusicStore();
  const theme = useThemeStore((s) => s.theme); // Get active theme
  
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Dynamic audio path based on active theme
  const currentAudioSrc = THEME_AUDIO[theme] ?? THEME_AUDIO.nebula;

  // 1. Theme Switch Handler
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentAudioSrc;
    audio.volume = volume;

    if (playing) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err: Error) => {
          console.warn('Autoplay/Track change prevented:', err);
        });
      }
    }
  }, [theme, currentAudioSrc]);

  // 2. Play/Pause & Volume Sync Handler
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    if (playing) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err: Error) => console.warn('Audio play blocked:', err));
      }
    } else {
      audio.pause();
    }
  }, [playing, volume]);

  // 3. Initial Tooltip Prompt
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 1200);
    const hideTimer = setTimeout(() => setShowTooltip(false), 5500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2"
      onMouseEnter={() => {
        setExpanded(true);
        setShowTooltip(false);
      }}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Hidden HTML5 Audio Element */}
{/* Replace this line: */}
<audio ref={audioRef} loop preload="auto" />

      {/* Floating Audio Button */}
      <button
        type="button"
        onClick={() => {
          toggle();
          setShowTooltip(false);
        }}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="focus-ring relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-text backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-accent/60 active:scale-95 shadow-lg"
      >
        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full border border-accent/60"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        {playing ? <Volume2 size={17} className="text-accent" /> : <Music2 size={17} />}
      </button>

      {/* Volume Control Bar */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, width: 0, x: -8 }}
            animate={{ opacity: 1, width: 120, x: 0 }}
            exit={{ opacity: 0, width: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 overflow-hidden rounded-full border border-border bg-surface/80 px-3 py-2 backdrop-blur-md shadow-lg"
          >
            <VolumeX size={13} className="shrink-0 text-muted" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="h-1 w-full cursor-pointer accent-accent"
              aria-label="Music volume"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-Prompt Tooltip Badge */}
      <AnimatePresence>
        {showTooltip && !expanded && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            className="pointer-events-none flex items-center gap-2 rounded-full border border-accent/30 bg-surface/90 px-3 py-1.5 text-xs text-text backdrop-blur-md shadow-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="whitespace-nowrap font-medium text-xs">
              {playing ? `Playing ${theme} audio` : 'Play theme music'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}