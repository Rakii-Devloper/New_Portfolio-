export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Frontend' | 'Backend' | 'Cloud' | '3D/WebGL' | 'Design';
  image: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
}

// Swap `image` paths for your real certificate images/screenshots
// in /public/certs, and fill in real issuer/date/credential info.
export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Full Stack Web Development',
    issuer: 'Meta (Coursera)',
    date: 'Aug 2025',
    category: 'Frontend',
    image: '/certs/placeholder-1.jpg',
    credentialId: 'ABC123XYZ',
    credentialUrl: 'https://coursera.org/verify/ABC123XYZ',
    skills: ['React', 'JavaScript', 'HTML/CSS'],
  },
  {
    id: 'cert-2',
    title: 'Advanced Node.js & Express',
    issuer: 'Udemy',
    date: 'May 2025',
    category: 'Backend',
    image: '/certs/placeholder-2.jpg',
    credentialId: 'UC-987654',
    credentialUrl: 'https://udemy.com/certificate/UC-987654',
    skills: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 'cert-3',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Feb 2025',
    category: 'Cloud',
    image: '/certs/placeholder-3.jpg',
    credentialId: 'AWS-CCP-2025-0456',
    credentialUrl: 'https://aws.amazon.com/verification',
    skills: ['AWS', 'Cloud Architecture'],
  },
  {
    id: 'cert-4',
    title: 'Three.js Journey',
    issuer: 'Bruno Simon',
    date: 'Nov 2024',
    category: '3D/WebGL',
    image: '/certs/placeholder-4.jpg',
    skills: ['Three.js', 'WebGL', 'GLSL'],
  },
  {
    id: 'cert-5',
    title: 'UI/UX Design Fundamentals',
    issuer: 'Google (Coursera)',
    date: 'Sep 2024',
    category: 'Design',
    image: '/certs/placeholder-5.jpg',
    credentialId: 'GG-UX-2024-771',
    skills: ['Figma', 'Design Systems'],
  },
  {
    id: 'cert-6',
    title: 'TypeScript for Professionals',
    issuer: 'Frontend Masters',
    date: 'Jul 2024',
    category: 'Frontend',
    image: '/certs/placeholder-6.jpg',
    skills: ['TypeScript'],
  },
];
