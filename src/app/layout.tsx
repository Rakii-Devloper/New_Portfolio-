import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import MusicPlayer from '@/components/ui/MusicPlayer';

export const metadata: Metadata = {
  title: 'Rakesh Antony — Full Stack Developer',
  description: 'test',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="nebula" suppressHydrationWarning>
      <body className="grain font-body antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
        <MusicPlayer />
      </body>
    </html>
  );
}
