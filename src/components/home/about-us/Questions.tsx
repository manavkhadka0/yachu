import SectionHeading from "../SectionHeading";

export const Questions = () => {
  const questionData = [
    {
      title: "Why?",
      description:
        "We understand that hair is more than just strands – it's a reflection of one's identity and confidence.",
    },
    {
      title: "How?",
      description:
        "Yachu Hair Oil: Blending traditional techniques with modern precision, crafted with 33 carefully selected natural ingredients, each chosen for its unique benefits to support stronger, healthier, and nourished hair.",
    },
    {
      title: "What?",
      description:
        "Yachu Hair Oil is not just a product; it's a promise to care for your hair and the planet simultaneously.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 lg:px-12 xl:px-24">
        <SectionHeading eyebrow="Our promise" title="Is Yachu for me?" />

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
          {questionData.map((item) => (
            <div
              key={item.title}
              className="border-t border-foreground/15 pt-6"
            >
              <h3 className="text-2xl font-bold text-primary">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground/80">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
