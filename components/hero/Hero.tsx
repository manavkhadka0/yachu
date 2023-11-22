import EmblaCarousel from "./EmblaCarousel";
import HeroQuickLinks from "./HeroQuickLinks";

const Hero = () => {
  return (
    <div className="flex flex-col gap-10">
      <EmblaCarousel />
      <HeroQuickLinks />
    </div>
  );
};
export default Hero;
