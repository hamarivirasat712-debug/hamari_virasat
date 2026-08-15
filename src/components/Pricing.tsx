'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { useRitualSelection } from '@/context/RitualSelectionContext';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const inclusions = [
  'Your choice of any 3 rituals — documented in full',
  'Complete Samagri list for each ceremony',
  'Ritual steps in your family\'s sequence',
  'Songs, prayers & mantras — as your family says them',
  'Every relative\'s role, captured precisely',
  'Gotra, Kuldevi & Kuldevta — your ancestral roots',
  'Photo integration with captions & context',
  'Beautifully formatted PDF heirloom document',
  'Delivered to your inbox within 7 days of form completion',
  'Save & resume — fill at your own pace over multiple sittings',
  '25% discount on your next ritual documentation',
];

export default function Pricing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { selectedRituals, getIntakeIndices } = useRitualSelection();

  const handlePayment = async () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    
    setIsLoading(true);
    try {
      const ritualIndices = getIntakeIndices();
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1, email, ritualIndices })
      });
      const order = await res.json();
      if (!order.id) throw new Error('Failed to create order');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '', // Ensure this is available
        amount: order.amount,
        currency: order.currency,
        name: "Hamari Virasat",
        description: "Ritual Documentation (3 Rituals)",
        order_id: order.id,
        handler: async function (response: any) {
          setIsLoading(true);
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                email,
                ritualIndices
              })
            });
            
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setSuccess(true);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (err) {
            console.error(err);
            alert('An error occurred during verification.');
          } finally {
            setIsLoading(false);
          }
        },
        prefill: { email },
        theme: { color: "#BD5319" }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any){
         alert(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
    
    {/* Email Collection Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
        <div className="bg-[#FAF6F0] rounded-2xl w-full max-w-md overflow-hidden animate-fade-in-up border border-[#EFEAE2]">
          {success ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-[#BD5319]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#BD5319]/20">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-serif text-2xl text-[#2A1208] mb-2">Payment Successful!</h3>
              <p className="text-[#8C847C] text-sm mb-6">
                Thank you for your purchase. We have sent a secure link to your email to start documenting your family's rituals.
              </p>
              <button 
                onClick={() => { setIsModalOpen(false); setSuccess(false); }}
                className="bg-[#BD5319] text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#A34310] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="p-8 text-center">
              <h3 className="font-serif text-2xl text-[#2A1208] mb-2">Where should we send your secure link?</h3>
              {selectedRituals.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {selectedRituals.map(r => (
                    <span key={r.number} className="text-xs bg-[#BD5319]/10 border border-[#BD5319]/20 text-[#BD5319] px-3 py-1 rounded-full font-medium">
                      {r.title}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-[#8C847C] text-sm mb-6">
                After payment, you will receive an email with a secure link to the form — pre-loaded with your selected rituals.
              </p>
              <input 
                type="email" 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#EFEAE2] rounded-xl px-4 py-3 mb-4 text-[#2A1208] placeholder:text-[#8C847C] focus:outline-none focus:border-[#C9A84C]/60"
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-[#EFEAE2] text-[#8C847C] hover:bg-white transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePayment}
                  disabled={isLoading || !email}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#BD5319] text-white hover:bg-[#A34310] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium inline-flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Processing...' : 'Proceed to Pay'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )}

    <section id="pricing" className="bg-[#FAF6F0] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="section-divider" />
            <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase">
              Investment
            </p>
            <div className="section-divider" style={{ background: 'linear-gradient(to left, #BD5319, #C9A84C)' }} />
          </div>
          <h2
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#2A1208] leading-tight mb-5"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            One price. Any 3 rituals.{' '}
              <span className="italic text-[#BD5319]">Yours forever.</span>
          </h2>
          <p className="text-[#8C847C] text-base font-light leading-relaxed">
            No tiers. No hidden fees. No subscriptions. Pick any 3 rituals from our collection of 9 — each one documented in full at one flat price.
          </p>
        </div>

        {/* Pricing card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Outer glow */}
            <div
              className="absolute -inset-px rounded-3xl"
              style={{ background: 'linear-gradient(135deg, #C9A84C40, #BD531920, transparent 60%)' }}
            />

            <div className="relative bg-[#2A1208] rounded-3xl overflow-hidden">
              {/* Top band */}
              <div
                className="h-1 w-full"
                style={{ background: 'linear-gradient(to right, #BD5319, #C9A84C, #BD5319)' }}
              />

              <div className="p-8 md:p-12">
                {/* Price */}
                {/* Price */}
                <div className="flex flex-col gap-4 mb-3">
                  <div className="flex items-end gap-3">
                    <span className="text-[#5C564F] text-lg md:text-2xl mb-2 font-medium">₹</span>
                    <span className="font-sans text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-none tracking-tight">
                      1 <span className="text-3xl md:text-4xl text-[#8C847C] line-through ml-2 font-medium">999</span>
                    </span>
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="text-[#5C564F] text-lg md:text-2xl mb-1 font-medium">$</span>
                    <span className="font-sans text-3xl md:text-4xl lg:text-5xl text-[#C9A84C] font-semibold leading-none tracking-tight">
                      10 <span className="text-xl md:text-2xl text-[#8C847C] line-through ml-2 font-medium">15</span> <span className="text-sm md:text-base text-[#5C564F] ml-2 tracking-wide uppercase">Global</span>
                    </span>
                  </div>
                </div>
                <p className="text-[#5C564F] text-sm mb-2">One-time payment · Any 3 of 9 rituals · No subscription</p>
                <p className="text-[#C9A84C] text-sm font-medium mb-10">
                  ✦ Early access price — limited time offer
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    id="pricing-pay-now"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#BD5319] text-[#2A1208] hover:text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#BD5319]/30 active:scale-95 text-center"
                  >
                    Preserve My Family&apos;s Rituals
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <a
                    href="#book-a-call"
                    id="pricing-book-call"
                    className="flex-1 inline-flex items-center justify-center text-[#8C847C] hover:text-white text-base font-medium px-8 py-4 rounded-xl border border-[#5E2E14] hover:border-white/20 transition-all duration-200 text-center"
                  >
                    Contact Us
                  </a>
                </div>

                {/* Divider */}
                <div className="border-t border-[#5E2E14] pt-8 mb-8">
                  <p className="text-[#8C847C] text-xs uppercase tracking-wider font-medium mb-5">
                    Everything that&apos;s included:
                  </p>
                  <div className="space-y-3">
                    {inclusions.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#A0B0E0]/15 border border-[#A0B0E0]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                             <path d="M1.5 4l2 2 3-3" stroke="#A0B0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                         </div>
                        <span className="text-[#8C847C] text-sm font-light leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust signals */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: '🔒', text: 'Secure Razorpay checkout' },
                    { icon: '↩️', text: '7-day satisfaction guarantee' },
                    { icon: '📧', text: 'Confirmation email instantly' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="text-center">
                      <div className="text-xl mb-1.5">{icon}</div>
                      <p className="text-[#5C564F] text-xs leading-tight">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Below card note */}
          <p className="text-center text-[#8C847C] text-xs mt-6 font-light">
            Payments processed securely via Razorpay · UPI, cards & net banking accepted
          </p>
        </div>

      </div>
    </section>
    </>
  );
}
