import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyPreserve from '@/components/WhyPreserve';
import HowItWorks from '@/components/HowItWorks';
import RitualGrid from '@/components/RitualGrid';

import SocialProof from '@/components/SocialProof';
import Pricing from '@/components/Pricing';
import ComingSoon from '@/components/ComingSoon';
import FAQ from '@/components/FAQ';
import EnquiryForm from '@/components/EnquiryForm';
import BookACall from '@/components/BookACall';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyPreserve />
      <HowItWorks />
      <RitualGrid />

      <SocialProof />
      <Pricing />
      <ComingSoon />
      <FAQ />
      <EnquiryForm />
      <BookACall />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}