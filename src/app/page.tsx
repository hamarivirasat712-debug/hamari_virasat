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

import { client } from '@/sanity/client';

const RITUALS_QUERY = `*[_type == "ritual"] | order(number asc) {
  number,
  title,
  category,
  description,
  subSections,
  color,
  imageIcon,
  isDIY
}`;

export default async function Home() {
  const rituals = await client.fetch(RITUALS_QUERY);
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyPreserve />
      <HowItWorks />
      <RitualGrid rituals={rituals} />

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