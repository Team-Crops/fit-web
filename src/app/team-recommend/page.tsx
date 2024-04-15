import { Footer } from '#/components/templates/Footer';
import { Header } from '#/components/templates/Header';
import { RecommendFilter } from '#/components/templates/TeamRecommend/RecommendFilter';
import { UserCardList } from '#/components/templates/TeamRecommend/UserCardList';

export default function TeamRecommendPage() {
  return (
    <>
      <Header />
      <RecommendFilter />
      <UserCardList />
      <Footer />
    </>
  );
}
