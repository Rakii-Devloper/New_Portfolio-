export interface Project {
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  gradient: [string, string];
  featured?: boolean;
}

// Replace with real projects — gradient is two hex colors used for the
// card's glow/thumbnail since real screenshots aren't wired in yet.
export const PROJECTS: Project[] = [
  {
    slug: 'project-one',
    title: 'Project One',
    desc: 'Short one-line description of what it does and the stack used.',
    tags: ['Next.js', 'Three.js'],
    gradient: ['#4da3ff', '#825cff'],
    featured: true,
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    desc: 'Short one-line description of what it does and the stack used.',
    tags: ['React', 'Node.js'],
    gradient: ['#ff4a91', '#ff9a9e'],
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    desc: 'Short one-line description of what it does and the stack used.',
    tags: ['TypeScript'],
    gradient: ['#38bdf8', '#4da3ff'],
  },
  {
    slug: 'project-four',
    title: 'Project Four',
    desc: 'Short one-line description of what it does and the stack used.',
    tags: ['Node.js', 'MongoDB'],
    gradient: ['#5fa04e', '#88ce02'],
  },
  {
    slug: 'project-five',
    title: 'Project Five',
    desc: 'Short one-line description of what it does and the stack used.',
    tags: ['React', 'Tailwind'],
    gradient: ['#f7df1e', '#ff9a9e'],
  },
];
