import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Droplet, Repeat, Bath, LucideIcon } from "lucide-react";

interface StepCardProps {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => (
  <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardContent className="flex items-start p-6">
      <div className="mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </CardContent>
  </Card>
);

interface Step {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  description: string;
}

const YachuHairOilHowToUse: React.FC = () => {
  const steps: Step[] = [
    {
      icon: <Repeat className="h-8 w-8 text-blue-500" />,
      title: "Frequency",
      description: "Apply the oil twice a week for optimal results.",
    },
    {
      icon: <Droplet className="h-8 w-8 text-green-500" />,
      title: "Application",
      description:
        "Gently massage the oil into your hair and scalp for 15 minutes.",
    },
    {
      icon: <Clock className="h-8 w-8 text-yellow-500" />,
      title: "Wait Time",
      description: "Leave the oil in your hair for 2-4 hours before washing.",
    },
    {
      icon: <Bath className="h-8 w-8 text-purple-500" />,
      title: "Washing",
      description: "Rinse thoroughly with a mild shampoo to remove the oil.",
    },
  ];

  return (
    <section className="bg-gradient-to-b py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          How to Use Yachu Hair Oil
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Follow these simple steps to maximize the benefits of Yachu Hair Oil
          and achieve healthier, more beautiful hair.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default YachuHairOilHowToUse;
