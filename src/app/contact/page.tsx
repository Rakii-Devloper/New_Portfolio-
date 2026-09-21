'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, Send, Twitter } from 'lucide-react';

const SOCIALS = [
  { icon: Mail, label: 'hello@rakeshantony.dev', href: 'mailto:hello@rakeshantony.dev' },
  { icon: Github, label: 'github.com/yourhandle', href: 'https://github.com' },
  { icon: Linkedin, label: 'linkedin.com/in/yourhandle', href: 'https://linkedin.com' },
  { icon: Twitter, label: '@yourhandle', href: 'https://twitter.com' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto max-w-5xl px-5 py-24">
      <p className="mb-3 text-sm text-accent">Contact</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        Let&apos;s build something
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
        Open to full-time roles, freelance work, or just a good conversation
        about a project idea.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-4 rounded-2xl border border-border bg-surface/60 p-7"
        >
          <div>
            <label className="mb-1.5 block text-sm text-muted">Name</label>
            <input
              required
              className="focus-ring w-full rounded-xl border border-border bg-bg/60 px-4 py-2.5 text-sm outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted">Email</label>
            <input
              required
              type="email"
              className="focus-ring w-full rounded-xl border border-border bg-bg/60 px-4 py-2.5 text-sm outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted">Message</label>
            <textarea
              required
              rows={5}
              className="focus-ring w-full rounded-xl border border-border bg-bg/60 px-4 py-2.5 text-sm outline-none"
              placeholder="Tell me about the project"
            />
          </div>
          <button
            type="submit"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition hover:shadow-glow"
          >
            {sent ? 'Sent — thank you' : 'Send message'}
            <Send size={14} />
          </button>
        </form>

        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-7">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-br from-accent/40 to-accent2/20 blur-3xl" />
          <p className="relative mb-6 text-sm text-muted">Find me elsewhere</p>
          <div className="relative space-y-1.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="focus-ring group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted transition hover:bg-accent/10 hover:text-text"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition group-hover:scale-105">
                  <s.icon size={16} />
                </span>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
