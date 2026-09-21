'use client';

import { create } from 'zustand';
import { Howl } from 'howler';
import type { ThemeName } from './useThemeStore';

// Drop your own ambient tracks into /public/music with these names,
// or point these paths at your CDN/hosted files.
const TRACKS: Record<ThemeName, string> = {
  nebula: '/music/nebula-ambient.mp3',
  bloom: '/music/bloom-piano.mp3',
  ink: '/music/ink-minimal.mp3',
};

interface MusicState {
  playing: boolean;
  volume: number;
  currentTheme: ThemeName | null;
  howl: Howl | null;
  toggle: () => void;
  setVolume: (v: number) => void;
  syncToTheme: (theme: ThemeName) => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  playing: false,
  volume: 0.4,
  currentTheme: null,
  howl: null,

  toggle: () => {
    const { playing, howl } = get();
    if (!howl) return;
    if (playing) {
      howl.pause();
      set({ playing: false });
    } else {
      howl.play();
      set({ playing: true });
    }
  },

  setVolume: (v: number) => {
    const { howl } = get();
    howl?.volume(v);
    set({ volume: v });
  },

  syncToTheme: (theme: ThemeName) => {
    const { currentTheme, howl, playing, volume } = get();
    if (currentTheme === theme && howl) return;

    const wasPlaying = playing;
    howl?.fade(get().volume, 0, 400);
    window.setTimeout(() => howl?.stop(), 420);

    const next = new Howl({
      src: [TRACKS[theme]],
      loop: true,
      volume: 0,
      html5: true,
    });

    set({ howl: next, currentTheme: theme });

    if (wasPlaying) {
      next.play();
      next.once('play', () => next.fade(0, volume, 800));
      set({ playing: true });
    }
  },
}));
