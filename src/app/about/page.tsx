export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <p className="mb-3 text-xl text-accent">About</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        The person behind the code
      </h1>

      <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-muted">
        <p className="text-lg text-foreground/90 font-medium leading-snug">
          I&apos;m Rakesh Antony — a Senior Full Stack Developer & Technical Lead with over 7+ years of experience building scalable enterprise applications, leading engineering teams, and crafting high-performance web experiences.
        </p>

        <p>
          From architecting complex CRM systems and automated platforms to mentoring engineering teams, my focus has always been on delivering clean code, robust system architecture, and intuitive UI design.
        </p>

        {/* Highlight Cards Grid */}
        <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-accent/50 hover:bg-white/[0.08]">
            <span className="text-2xl">💻</span>
            <h3 className="mt-2 font-semibold text-foreground">7+ Years Exp</h3>
            <p className="mt-1 text-xs text-muted">
              Proven track record in Full Stack Engineering, Enterprise CRM, and Technical Leadership.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-accent/50 hover:bg-white/[0.08]">
            <span className="text-2xl">⚡</span>
            <h3 className="mt-2 font-semibold text-foreground">Modern Frontend</h3>
            <p className="mt-1 text-xs text-muted">
              Building pixel-perfect UI/UX using React, Next.js, TypeScript, Tailwind CSS, and Three.js.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-accent/50 hover:bg-white/[0.08]">
            <span className="text-2xl">⚙️</span>
            <h3 className="mt-2 font-semibold text-foreground">Backend & APIs</h3>
            <p className="mt-1 text-xs text-muted">
              Designing scalable REST APIs, microservices, and databases using Node.js & .NET APIs.
            </p>
          </div>
        </div>

        <p>
          I bridge the gap between business goals, architecture design, and smooth user interactions. Whether it&apos;s scaling up an enterprise product or building dynamic web applications from scratch, I thrive on taking full ownership.
        </p>

        <p className="font-medium text-foreground">
          Looking for a Senior Developer or Tech Lead who can hit the ground running? Let&apos;s build something great together.
        </p>
      </div>
    </section>
  );
}