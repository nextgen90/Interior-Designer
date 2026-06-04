import HeroSlider from "@/components/HeroSlider";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Articles from "@/components/Articles";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <Services />
      <Gallery />
      <Articles />
      <Testimonials />
    </main>
  );
}
