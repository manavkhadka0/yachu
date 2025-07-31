import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LeafIcon } from "lucide-react";

export const Questions = () => {
  const questionData = [
    {
      title: "Why?",
      description: "We understand that hair is more than just strands – it's a reflection of one's identity and confidence.",
      bgColor: "bg-primary/90",
    },
    {
      title: "How?",
      description: "Yachu Hair Oil: Blending traditional techniques with modern precision, featuring coconut, olive, almond, and castor oils for nourishment.",
      bgColor: "bg-primary/80",
    },
    {
      title: "What?",
      description: "Yachu Hair Oil is not just a product; it's a promise to care for your hair and the planet simultaneously.",
      bgColor: "bg-primary/70",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-primary/30">
      <div className="px-6 pb-5 mx-auto sm:px-8 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 gap-y-12 xl:grid-cols-6 gap-x-8">
          <div className="xl:col-span-2">
            <h2 className="tracking-tighter text-foreground">
              <span className="font-serif text-3xl font-medium sm:text-5xl md:text-6xl">
                Is Yachu
              </span>
              <span className="font-serif text-3xl font-medium sm:text-6xl sm:block md:text-7xl">
                for me?
              </span>
            </h2>
          </div>

          <div className="xl:col-span-4">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {questionData.map((item, index) => (
                <Card 
                  key={index}
                  className="transition-all duration-200 shadow-2xl border-0 hover:shadow-lg hover:scale-105"
                >
                  <CardContent className="px-4 py-5 sm:px-6 sm:py-8">
                    <Badge 
                      className={`p-4 ${item.bgColor} text-primary-foreground flex pl-6 rounded-full items-center w-fit md:w-full hover:${item.bgColor}/90`}
                    >
                      <LeafIcon size={30} />
                      <h3 className="font-serif text-xl italic font-semibold pl-3 text-primary-foreground md:text-2xl">
                        {item.title}
                      </h3>
                    </Badge>
                    <p className="mt-4 font-sans text-base font-normal text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};