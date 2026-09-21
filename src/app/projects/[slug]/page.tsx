import { notFound } from 'next/navigation';
import { PROJECTS } from '@/data/projects';
import Link from 'next/link';

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
      <Link href="/projects" className="text-sm text-accent hover:underline transition">
        ← Back to Projects
      </Link>

      <p className="mt-6 mb-2 text-sm text-accent font-medium">Case study</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl text-foreground">
        {project.title}
      </h1>

      {/* Fallback Banner: Image idre Image, ilde idre Gradient Backdrop */}
      <div
        className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl border border-border shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover object-center opacity-90 transition-opacity hover:opacity-100"
          />
        )}
      </div>

      <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-muted">
        <p className="text-lg text-foreground font-medium">{project.desc}</p>
      </div>

      <div className="mt-10 pt-6 border-t border-border">
        <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">
          Technologies & Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-accent/10 border border-accent/20 px-3.5 py-1 text-xs font-medium text-accent"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}