import { Footer } from '#templates/Footer';
import { Header } from '#templates/Header';
import { FirstSection } from '#templates/main/FirstSection';
import { FourthSection } from '#templates/main/FourthSection';
import { SecondSection } from '#templates/main/SecondSection';
import { ThirdSection } from '#templates/main/ThirdSection';

export default function Home() {
  return (
    <>
      <Header />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </>
  );
}
