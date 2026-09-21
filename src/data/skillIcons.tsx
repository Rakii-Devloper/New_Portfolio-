import type { IconType } from 'react-icons';
import {
  SiJavascript, SiHtml5, SiCss, SiTypescript, SiRedux, SiReact,
  SiNextdotjs, SiTailwindcss, SiThreedotjs, SiFramer, SiGreensock,
  SiNodedotjs, SiExpress, SiMongodb,
} from 'react-icons/si';

export const SKILL_ICONS: Record<string, { icon: IconType; color: string }> = {
  js: { icon: SiJavascript, color: '#f7df1e' },
  html: { icon: SiHtml5, color: '#e34f26' },
  css: { icon: SiCss, color: '#1572b6' },
  ts: { icon: SiTypescript, color: '#3178c6' },
  redux: { icon: SiRedux, color: '#764abc' },
  react: { icon: SiReact, color: '#61dafb' },
  next: { icon: SiNextdotjs, color: '#a3a3a3' },
  tailwind: { icon: SiTailwindcss, color: '#38bdf8' },
  three: { icon: SiThreedotjs, color: '#a3a3a3' },
  framer: { icon: SiFramer, color: '#0055ff' },
  gsap: { icon: SiGreensock, color: '#88ce02' },
  node: { icon: SiNodedotjs, color: '#5fa04e' },
  express: { icon: SiExpress, color: '#a3a3a3' },
  mongo: { icon: SiMongodb, color: '#47a248' },
};
