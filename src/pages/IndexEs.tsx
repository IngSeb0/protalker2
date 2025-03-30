
import NavbarEs from "../components/NavbarEs";
import HeroEs from "../components/HeroEs";
import HowItWorksEs from "../components/HowItWorksEs";
import Benefits from "../components/Benefits";
import PricingEs from "../components/PricingEs";
import TestimonialsEs from "../components/TestimonialsEs";
import FAQEs from "../components/FAQEs";
import FooterEs from "../components/FooterEs";

const IndexEs = () => {
  return (
    <div className="min-h-screen">
      <NavbarEs />
      <main>
        <HeroEs />
        <HowItWorksEs />
        <Benefits />
        <PricingEs />
        <TestimonialsEs />
        <FAQEs />
      </main>
      <FooterEs />
    </div>
  );
};

export default IndexEs;
