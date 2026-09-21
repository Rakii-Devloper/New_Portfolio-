import CertificateCoverflow from '@/components/certificates/CertificateCoverflow';

export default function CertificatesPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <p className="mb-3 text-sm text-accent">Certificates</p>
      <h1 className="max-w-xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        Proof of the hours put in
      </h1>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
        A running record of courses and certifications. Scroll through, or
        filter by category.
      </p>

      <div className="mt-16">
        <CertificateCoverflow />
      </div>
    </section>
  );
}
