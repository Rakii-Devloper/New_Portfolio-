'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/data/projects';

const ProjectOrbit = dynamic(() => import('@/components/projects/ProjectOrbit'), { ssr: false });

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <p className="mb-3 text-sm text-accent font-medium">Projects</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl text-foreground">
        Selected work
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
        Drag to spin the ring, or use the arrows — the project facing you is
        the one that's active.
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-surface/30 backdrop-blur-sm overflow-hidden">
        <ProjectOrbit />
      </div>

      <div className="mt-16 divide-y divide-border border-t border-border">
        {PROJECTS.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="focus-ring group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-accent/5 px-4 rounded-xl"
          >
            <div>
              <h2 className="font-display text-base font-medium text-foreground transition group-hover:text-accent">
                {p.title}
              </h2>
              <p className="mt-1.5 max-w-xl text-sm text-muted leading-relaxed">{p.desc}</p>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ArrowUpRight
              className="shrink-0 text-muted transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
              size={20}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}