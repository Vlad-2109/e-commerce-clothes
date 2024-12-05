import { BestSeller } from '../../components/BestSeller';
import { Hero } from '../../components/Hero';
import { LatestCollection } from '../../components/LatestCollection';

export const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
    </div>
  );
};
