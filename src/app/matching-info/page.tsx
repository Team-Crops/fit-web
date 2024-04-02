import { Footer } from '#/components/templates/Footer';
import { Header } from '#/components/templates/Header';
import { MatchingInfoSection } from '#/components/templates/MatchingInfo/MatchingInfoSection';
import { MatchingSequence } from '#/components/templates/MatchingInfo/MatchingSequence';

export default function MatchingInfo() {
  return (
    <>
      <Header />
      <MatchingInfoSection />
      <MatchingSequence />
      <Footer />
    </>
  );
}
