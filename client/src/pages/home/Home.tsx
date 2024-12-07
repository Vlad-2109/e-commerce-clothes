import { BestSeller } from '../../components/BestSeller';
import { Hero } from '../../components/Hero';
import { LatestCollection } from '../../components/LatestCollection';
import { NewslettetBox } from '../../components/NewslettetBox';
import { OurPolicy } from '../../components/OurPolicy';

export const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewslettetBox />
    </div>
  );
};
