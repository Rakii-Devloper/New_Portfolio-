'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import CertificateModal from './CertificateModal';
import { CERTIFICATES, type Certificate } from '@/data/certificates';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Cloud', '3D/WebGL', 'Design'] as const;
const CARD_WIDTH = 224; // px, keep in sync with the w-56 class below
const CARD_GAP = 24; // px, keep in sync with the gap-6 class below

export default function CertificateCoverflow() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [selected, setSelected] = useState<Certificate | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const filtered = useMemo(
    () => (category === 'All' ? CERTIFICATES : CERTIFICATES.filter((c) => c.category === category)),
    [category]
  );

  // scroll-driven coverflow transform — reads real DOM positions every
  // frame, so it's correct at any container width, no magic-number layout.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let raf = 0;

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;

      filtered.forEach((cert) => {
        const el = cardRefs.current[cert.id];
        if (!el) return;
        const cardRect = el.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = (cardCenter - centerX) / (rect.width / 2);
        const clamped = Math.max(-1.3, Math.min(1.3, distance));
        const abs = Math.min(Math.abs(clamped), 1);

        el.style.transform = `perspective(1000px) rotateY(${clamped * -20}deg) scale(${1 - abs * 0.24})`;
        el.style.opacity = String(1 - abs * 0.55);
        el.style.zIndex = String(Math.round((1 - abs) * 100));
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [filtered]);

  const scroll = (dir: 1 | -1) => {
    containerRef.current?.scrollBy({ left: dir * (CARD_WIDTH + CARD_GAP) * 2, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`focus-ring rounded-full border px-4 py-1.5 text-sm transition ${
              category === c
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border text-muted hover:border-accent/50 hover:text-text'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[14%] py-10"
        >
          {filtered.map((cert) => (
            <button
              key={cert.id}
              ref={(el) => {
                cardRefs.current[cert.id] = el;
              }}
              onClick={() => setSelected(cert)}
              className="focus-ring relative w-56 shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-xl transition-shadow will-change-transform hover:shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative h-64 w-full bg-bg">
                <Image src={cert.image} alt={cert.title} fill className="object-cover" sizes="224px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="mb-1.5 inline-block rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white backdrop-blur">
                    {cert.category}
                  </span>
                  <p className="line-clamp-1 text-sm font-medium text-white">{cert.title}</p>
                  <p className="line-clamp-1 text-xs text-white/70">{cert.issuer}</p>
                  {cert.credentialId && (
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-white/60">
                      <BadgeCheck size={11} /> Verified
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="focus-ring absolute left-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/80 backdrop-blur transition hover:border-accent/60 sm:left-2"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="focus-ring absolute right-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/80 backdrop-blur transition hover:border-accent/60 sm:right-2"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-muted">
        Scroll or drag — tap a certificate for full details
      </p>

      <CertificateModal cert={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
