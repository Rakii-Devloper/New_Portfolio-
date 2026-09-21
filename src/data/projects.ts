export interface Project {
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  gradient: [string, string];
  image?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: 'tradesense-ai',
    title: 'TradesenseAI - Real-Time Stock Market Tracker & AI Analyzer',
    desc: 'Python application pulling live market data via REST APIs, running AI/ML trend models, and pushing automated Telegram/WhatsApp breakout alerts.',
    tags: ['Python', 'Pandas', 'REST APIs', 'AI/ML', 'Telegram API', 'Automation'],
    gradient: ['#0f172a', '#38bdf8'],
    image: '/projects/tradesense.jpg',
    featured: true,
  },
  {
    slug: 'wisright-enterprise-crm',
    title: 'Wisright Enterprise CRM - FA Module',
    desc: 'Enterprise CRM managing high-volume donor records with granular Role-Based Access Control (RBAC), client-side caching, and high-throughput REST APIs.',
    tags: ['React', 'TypeScript', 'Recoil', 'ASP.NET Web API', 'SQL Server'],
    gradient: ['#1e1b4b', '#818cf8'],
    image: '/projects/crm.jpg',
    featured: true,
  },
  {
    slug: 'youtube-automation-bot',
    title: 'YouTube Automation Bot - Content Publishing Pipeline',
    desc: 'End-to-end Python pipeline using AI models for SEO title/tag generation, scheduled daily uploads, and automated performance summaries via Telegram.',
    tags: ['Python', 'YouTube Data API', 'AI Text-Gen', 'Cron', 'SMTP'],
    gradient: ['#450a0a', '#f87171'],
    featured: true,
  },
  {
    slug: 'ken-sports-fantasy-app',
    title: 'Ken Sports - Fantasy Football Mobile App',
    desc: 'React Native mobile application for American football fantasy sports covering core gameplay and real-time team selection flows.',
    tags: ['React Native', 'JavaScript', 'Redux', 'Mobile UI'],
    gradient: ['#022c22', '#34d399'],
  },
  {
    slug: 'doodle-assessment-platform',
    title: 'Doodle - Online Assessment & Interview Platform',
    desc: 'Interactive frontend platform engineered for online technical assessments, candidate evaluation UI, and test workflows.',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    gradient: ['#3f2305', '#f97316'],
  },
  {
    slug: 'instakart-ecommerce',
    title: 'Instakart - E-Commerce Shopping Platform',
    desc: 'Modular React UI components with Redux state management and validated checkout flows using Postman & Swagger.',
    tags: ['React.js', 'Redux', 'Bootstrap', 'REST APIs'],
    gradient: ['#1f2937', '#9ca3af'],
  },
];