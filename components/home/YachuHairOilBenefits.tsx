import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplet, Sun, Shield, Zap, LucideIcon } from "lucide-react";

interface BenefitCardProps {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
}) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="flex items-center text-lg font-semibold">
        {icon}
        <span className="ml-2">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

interface Benefit {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  description: string;
}

const YachuHairOilBenefits: React.FC = () => {
  const benefits: Benefit[] = [
    {
      icon: <Droplet className="h-6 w-6 text-blue-500" />,
      title: "Deep Nourishment",
      description:
        "Penetrates hair follicles to provide essential nutrients and promote healthy growth.",
    },
    {
      icon: <Sun className="h-6 w-6 text-yellow-500" />,
      title: "UV Protection",
      description:
        "Shields hair from harmful sun rays, preventing damage and color fading.",
    },
    {
      icon: <Shield className="h-6 w-6 text-green-500" />,
      title: "Strengthens Hair",
      description:
        "Reduces breakage and split ends, leaving your hair stronger and more resilient.",
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-500" />,
      title: "Revitalizes Scalp",
      description:
        "Stimulates blood circulation in the scalp, promoting healthier and faster hair growth.",
    },
  ];

  return (
    <section className="bg-gradient-to-b  py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">
          Benefits of Yachu Hair Oil
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Discover the transformative power of our premium hair care solution
        </p>
        <Badge className="flex w-fit mx-auto mb-8">
          100% Natural Ingredients
        </Badge>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default YachuHairOilBenefits;
