import Link from 'next/link';

export const metadata = {
  title: 'Refund Policy | Hamari Virasat',
  description: '7-Day Money-Back Guarantee and refund terms for Hamari Virasat.',
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#1A0C04] text-[#FAF6F0] py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-[#2A1208] border border-[#5E2E14] rounded-2xl p-8 md:p-14 shadow-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[#C9A84C] text-sm hover:underline mb-8">
          ← Back to Hamari Virasat
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl text-white mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
          Refund Policy
        </h1>
        <p className="text-[#8C847C] text-xs uppercase tracking-widest mb-8 font-medium">
          7-Day Money-Back Guarantee
        </p>

        <div className="space-y-8 text-sm md:text-base leading-relaxed text-[#FAF6F0]/90 font-light">
          <section className="bg-[#3E1A0C] p-6 rounded-xl border border-[#BD5319]/40">
            <h2 className="text-[#C9A84C] text-lg font-semibold mb-2">7-Day Money-Back Guarantee</h2>
            <p>
              We want you to love preserving your family traditions with Hamari Virasat. If you are not completely satisfied within <strong>7 days</strong> of receiving your completed heritage document, we will issue a full refund — no questions asked.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              1. Refund Eligibility &amp; Breakdown
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-[#FAF6F0]/80">
              <li><strong>Within 7 Days of Delivery:</strong> Full 100% refund upon request.</li>
              <li><strong>After 7 Days:</strong> No partial or pro-rated refunds.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              2. How to Request a Refund
            </h2>
            <p className="mb-3">To initiate a refund request, simply email us at <strong>namaste@hamarivirasat.in</strong> with the following details:</p>
            <ol className="list-decimal pl-6 space-y-2 text-[#FAF6F0]/80 font-mono text-sm">
              <li>Your registered email address</li>
              <li>Your Razorpay Payment / Transaction ID</li>
              <li>Reason for cancellation (optional, but helps us improve)</li>
            </ol>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              3. Processing Time &amp; Method
            </h2>
            <p>
              Approved refunds are processed within <strong>5 to 7 business days</strong> and credited directly to your original payment method (bank account, debit/credit card, or UPI).
            </p>
          </section>

          <section className="border-t border-[#5E2E14] pt-6">
            <h2 className="font-serif text-lg text-[#C9A84C] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              Questions About Refunds?
            </h2>
            <p className="text-sm">Reach out to our customer support team anytime:</p>
            <p className="mt-2 text-white font-mono text-sm">Email: namaste@hamarivirasat.in</p>
          </section>
        </div>
      </div>
    </div>
  );
}
