'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, Calendar, BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import type { Certificate } from '@/data/certificates';

export default function CertificateModal({
  cert,
  onClose,
}: {
  cert: Certificate | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            layoutId={`cert-${cert.id}`}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 grid w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl sm:grid-cols-2"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="focus-ring absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg/70 text-text backdrop-blur"
            >
              <X size={16} />
            </button>

            <div className="relative aspect-[4/3] bg-bg sm:aspect-auto">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8">
              <span className="mb-3 w-fit rounded-full border border-accent/40 px-3 py-1 text-xs text-accent">
                {cert.category}
              </span>
              <h3 id="cert-modal-title" className="font-display text-xl font-semibold leading-snug">
                {cert.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{cert.issuer}</p>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted">
                <Calendar size={14} />
                {cert.date}
              </div>

              {cert.credentialId && (
                <div className="mt-1.5 flex items-center gap-2 text-sm text-muted">
                  <BadgeCheck size={14} />
                  Credential ID: {cert.credentialId}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {cert.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition hover:shadow-glow"
                >
                  Verify credential
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
