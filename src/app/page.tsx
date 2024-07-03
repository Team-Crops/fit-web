import { MainSection1 } from '#/components/templates/MainSection1';
import { FourthSection } from '#templates/main/FourthSection';
import { SecondSection } from '#templates/main/SecondSection';
import { ThirdSection } from '#templates/main/ThirdSection';

export default function Home() {
  return (
    <>
      <MainSection1 />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
    </>
  );
}
