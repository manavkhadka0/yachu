import Contact from "@/components/contact/Contact";
import SurveyFooter from "@/components/survey/SurveyFooter";
import SurveyForm from "@/components/survey/SurveyForm";
import SurveyHero from "@/components/survey/SurveyHero";

const SurveyPage = () => {
  return (
    <div className="container flex items-center justify-between py-8 md:py-16 flex-col min-h-screen">
      <SurveyHero />
      <SurveyForm />
      <SurveyFooter />
    </div>
  );
};
export default SurveyPage;
