import { Hero } from "./sections/Hero";
import { Principles } from "./sections/Principles";
import { FeaturedPrograms } from "./sections/FeaturedPrograms";
import { CategoryGrid } from "./sections/CategoryGrid";
import { WeekPreview } from "./sections/WeekPreview";
import { ProgressTeaser } from "./sections/ProgressTeaser";
import { FinalCta } from "./sections/FinalCta";

interface HomeViewProps {
  price?: string;
}

/** Home page UI. Server component; only the hero scene/motion and navbar hydrate. */
export default function HomeView({ price }: HomeViewProps) {
  return (
    <>
      <Hero />
   
       <Principles />
      <FeaturedPrograms />
      <CategoryGrid />
      <WeekPreview />
      <ProgressTeaser />
      <FinalCta price={price} />
      
    </>
  );
}
