'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { THEMES, useThemeStore } from '@/store/useThemeStore';
import { useMusicStore } from '@/store/useMusicStore';

export default function ThemeSwitcher() {
  const { theme, setTheme, hydrate } = useThemeStore();
  const syncToTheme = useMusicStore((s) => s.syncToTheme);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    syncToTheme(theme);
  }, [theme, syncToTheme]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch theme"
        aria-expanded={open}
        className="focus-ring flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-2 text-sm text-text backdrop-blur-md transition hover:border-accent/60"
      >
        <Palette size={15} />
        <span className="hidden sm:inline">Theme</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-border bg-surface/95 p-1.5 shadow-xl backdrop-blur-xl"
          >
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className="focus-ring flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-accent/10"
              >
                <span
                  className="h-5 w-5 shrink-0 rounded-full border border-border"
                  style={{
                    background: `linear-gradient(135deg, ${t.swatch[0]} 50%, ${t.swatch[1]} 50%)`,
                  }}
                />
                <span className="flex-1">{t.label}</span>
                {theme === t.id && <Check size={14} className="text-accent" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
