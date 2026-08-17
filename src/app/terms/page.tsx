import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Hamari Virasat',
  description: 'Terms and conditions governing the use of Hamari Virasat heritage platform.',
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#1A0C04] text-[#FAF6F0] py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-[#2A1208] border border-[#5E2E14] rounded-2xl p-8 md:p-14 shadow-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[#C9A84C] text-sm hover:underline mb-8">
          ← Back to Hamari Virasat
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl text-white mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
          Terms &amp; Conditions
        </h1>
        <p className="text-[#8C847C] text-xs uppercase tracking-widest mb-8 font-medium">
          Effective Date: July 2026
        </p>

        <div className="space-y-8 text-sm md:text-base leading-relaxed text-[#FAF6F0]/90 font-light">
          <section>
            <h2 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              1. Welcome to Hamari Virasat
            </h2>
            <p>
              By accessing or using Hamari Virasat (&quot;the Platform&quot;), you agree to comply with and be bound by these Terms &amp; Conditions. Please read them carefully before submitting any family records or making a payment.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              2. Account Eligibility &amp; Safety
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-[#FAF6F0]/80">
              <li><strong>Age Requirement:</strong> You must be at least 18 years old to create an account and manage family documentation.</li>
              <li><strong>Account Security:</strong> You are responsible for safeguarding your login credentials and save-and-resume links.</li>
              <li><strong>Personal Use:</strong> Each document purchase is intended for personal and family heritage preservation only.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              3. Intellectual Property &amp; Content Ownership
            </h2>
            <div className="space-y-4">
              <div className="bg-[#3E1A0C] p-5 rounded-xl border border-[#BD5319]/30">
                <h3 className="text-[#C9A84C] font-semibold text-base mb-1">Your Content (100% Yours)</h3>
                <p className="text-xs md:text-sm">
                  You retain complete ownership of all family records, ritual notes, recipes, photos, and stories you upload to Hamari Virasat. You grant us a limited, secure license strictly to compile and format your document. We do NOT train public AI models on your private family content.
                </p>
              </div>

              <div className="bg-[#3E1A0C] p-5 rounded-xl border border-[#C9A84C]/30">
                <h3 className="text-[#C9A84C] font-semibold text-base mb-1">Our Brand &amp; Platform (100% Ours)</h3>
                <p className="text-xs md:text-sm">
                  All right, title, and interest in and to the Hamari Virasat website, logo, layout designs, and intake questionnaire frameworks are copyrighted works owned by Hamari Virasat, protected under Indian and international laws.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              4. Limitation of Liability
            </h2>
            <p>
              We strive to maintain continuous uptime and secure delivery. Our total legal liability to you for any claim shall not exceed the amount you actually paid to Hamari Virasat in the three (3) months prior to the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              5. Governing Law &amp; Dispute Resolution
            </h2>
            <p>
              The laws of India govern these Terms. Any disputes or legal claims shall be subject to the exclusive jurisdiction of the competent courts in Bhopal, India.
            </p>
          </section>

          <section className="border-t border-[#5E2E14] pt-6">
            <h2 className="font-serif text-lg text-[#C9A84C] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              Contact Us
            </h2>
            <p className="text-sm">For any questions regarding these Terms &amp; Conditions, contact us at:</p>
            <p className="mt-2 text-white font-mono text-sm">Email: namaste@hamarivirasat.in</p>
            <p className="text-xs text-[#8C847C] mt-1">Location: Bhopal, Madhya Pradesh, India</p>
          </section>
        </div>
      </div>
    </div>
  );
}
