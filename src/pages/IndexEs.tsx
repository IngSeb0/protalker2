
import NavbarEs from "../components/NavbarEs";
import HeroEs from "../components/HeroEs";
import HowItWorksEs from "../components/HowItWorksEs";
import BenefitsEs from "../components/BenefitsEs";
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
        <BenefitsEs />
        <PricingEs />
        <TestimonialsEs />
        <FAQEs />
      </main>
      <FooterEs />
    </div>
  );
};

export default IndexEs;
