export interface SkillNode {
  id: string;
  name: string;
  level: number;
  position: [number, number, number];
  big?: boolean;
}

// Hand-placed layout so the graph reads left-to-right like a real
// constellation rather than a perfect circle. Tweak positions freely —
// edges below reference nodes by id, not by index, so reordering is safe.
export const SKILL_NODES: SkillNode[] = [
  { id: 'js', name: 'JavaScript', level: 90, position: [-4.6, 1.7, -0.4] },
  { id: 'html', name: 'HTML5', level: 95, position: [-4.9, -1.0, 0.1] },
  { id: 'css', name: 'CSS3', level: 92, position: [-3.2, -1.9, -0.2] },
  { id: 'ts', name: 'TypeScript', level: 85, position: [-2.4, 1.1, 0.2] },
  { id: 'redux', name: 'Redux', level: 78, position: [-1.2, -2.3, 0.1] },
  { id: 'react', name: 'React', level: 92, position: [0, 0, 0.5], big: true },
  { id: 'next', name: 'Next.js', level: 88, position: [1.6, 1.7, 0] },
  { id: 'tailwind', name: 'Tailwind CSS', level: 90, position: [3.4, 1.9, -0.3] },
  { id: 'three', name: 'Three.js', level: 78, position: [0.6, -1.6, 0.7], big: true },
  { id: 'framer', name: 'Framer Motion', level: 85, position: [2.1, -0.7, 0.1] },
  { id: 'gsap', name: 'GSAP', level: 74, position: [3.6, -1.6, -0.2] },
  { id: 'node', name: 'Node.js', level: 82, position: [4.4, 0.4, 0.3], big: true },
  { id: 'express', name: 'Express', level: 80, position: [5.6, -1.1, 0] },
  { id: 'mongo', name: 'MongoDB', level: 75, position: [6.2, 1.1, -0.2] },
];

export const SKILL_EDGES: [string, string][] = [
  ['js', 'html'],
  ['js', 'css'],
  ['js', 'ts'],
  ['ts', 'react'],
  ['css', 'redux'],
  ['redux', 'react'],
  ['react', 'next'],
  ['next', 'tailwind'],
  ['react', 'three'],
  ['three', 'framer'],
  ['framer', 'gsap'],
  ['three', 'node'],
  ['gsap', 'node'],
  ['node', 'express'],
  ['node', 'mongo'],
];
