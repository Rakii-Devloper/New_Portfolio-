'use client';

import { create } from 'zustand';

export type ThemeName = 'nebula' | 'bloom' | 'ink';

export const THEMES: { id: ThemeName; label: string; swatch: [string, string] }[] = [
  { id: 'nebula', label: 'Nebula', swatch: ['#05070d', '#4da3ff'] },
  { id: 'bloom', label: 'Bloom', swatch: ['#fff7fa', '#ff4a91'] },
  { id: 'ink', label: 'Ink', swatch: ['#fafaf8', '#0a0a0a'] },
];

interface ThemeState {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  hydrate: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'nebula',
  setTheme: (t) => {
    set({ theme: t });
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', t);
      window.localStorage.setItem('portfolio-theme', t);
    }
  },
  hydrate: () => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem('portfolio-theme') as ThemeName | null;
    const initial = saved ?? 'nebula';
    document.documentElement.setAttribute('data-theme', initial);
    set({ theme: initial });
  },
}));
