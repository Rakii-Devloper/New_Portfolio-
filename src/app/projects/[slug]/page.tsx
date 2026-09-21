import { notFound } from 'next/navigation';
import { PROJECTS } from '@/data/projects';

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <p className="mb-3 text-sm text-accent">Case study</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        {project.title}
      </h1>

      <div
        className="mt-8 h-56 w-full rounded-2xl"
        style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
      />

      <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-muted">
        {project.desc} Replace this with the real case study: the problem,
        your approach, the stack, and the outcome. A before/after screenshot
        pair works well here, along with a live link and a GitHub link.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}