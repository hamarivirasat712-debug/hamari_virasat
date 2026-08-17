import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Hamari Virasat',
  description: 'Privacy policy and data protection commitments of Hamari Virasat.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#1A0C04] text-[#FAF6F0] py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-[#2A1208] border border-[#5E2E14] rounded-2xl p-8 md:p-14 shadow-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[#C9A84C] text-sm hover:underline mb-8">
          ← Back to Hamari Virasat
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl text-white mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
          Privacy Policy
        </h1>
        <p className="text-[#8C847C] text-xs uppercase tracking-widest mb-8 font-medium">
          Effective Date: July 21, 2026
        </p>

        <div className="space-y-8 text-sm md:text-base leading-relaxed text-[#FAF6F0]/90 font-light">
          <section className="bg-[#3E1A0C] p-6 rounded-xl border border-[#C9A84C]/30">
            <h2 className="text-[#C9A84C] text-lg font-semibold mb-2">Our Privacy Promise</h2>
            <p>
              At Hamari Virasat, we know that your family memories, rituals, and photographs are deeply personal. We treat your personal data with the highest level of care, security, and respect. <strong>We never sell your personal data.</strong>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              1. What Data We Collect
            </h2>
            <p className="mb-3">We collect only what is necessary to run a smooth, personalized heritage platform for you:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#FAF6F0]/80">
              <li><strong>Contact Information:</strong> Your name and email address when you order or contact us.</li>
              <li><strong>Family Ritual Data:</strong> Gotra, Kuldevi, songs, recipes, ritual sequences, and photos provided in your intake form.</li>
              <li><strong>Payment Records:</strong> Transaction IDs processed securely via Razorpay (we do not store full card numbers).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              2. How We Use Your Data &amp; Zero AI Training Guarantee
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-[#FAF6F0]/80">
              <li>To process payments securely and assemble your custom heritage documentation.</li>
              <li>To provide customer support and deliver your final digital heirloom.</li>
              <li><strong>Zero AI Training Guarantee:</strong> Your family&apos;s private entries, photos, and voice notes are <strong>never</strong> used to train public machine learning or AI models.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              3. Data Isolation &amp; Infrastructure
            </h2>
            <p className="mb-3">
              We share minimal data with trusted, enterprise-grade cloud providers bound by strict confidentiality:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#FAF6F0]/80">
              <li><strong>Encryption:</strong> All data is encrypted in transit (TLS/HTTPS) and at rest.</li>
              <li><strong>Row-Level Security (RLS):</strong> Your family workspace is isolated at the database level.</li>
              <li><strong>No Internal Peeking:</strong> We do not access or read your private family rituals unless you explicitly ask our support team for assistance.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              4. Cookie Policy
            </h2>
            <p className="mb-3">Hamari Virasat uses only strictly necessary functional cookies for authentication and session protection.</p>
            <p className="text-[#C9A84C] text-sm font-medium">
              ✕ No third-party tracking cookies &nbsp;·&nbsp; ✕ No ad-targeting profiling &nbsp;·&nbsp; ✕ No selling cookie data.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              5. Your Rights &amp; Control
            </h2>
            <p className="mb-3">
              Under Indian data privacy regulations, you have full control over your digital footprint:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#FAF6F0]/80">
              <li><strong>Access &amp; Correct:</strong> View and edit your family information at any time.</li>
              <li><strong>Data Erasure:</strong> Request complete account deletion by emailing us. All associated records will be permanently removed within 30 days.</li>
            </ul>
          </section>

          <section className="border-t border-[#5E2E14] pt-6">
            <h2 className="font-serif text-lg text-[#C9A84C] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              Privacy Queries
            </h2>
            <p className="text-sm">
              For any privacy questions or data requests, contact our Data Protection Lead:
            </p>
            <p className="mt-2 text-white font-mono text-sm">Email: namaste@hamarivirasat.in</p>
          </section>
        </div>
      </div>
    </div>
  );
}
