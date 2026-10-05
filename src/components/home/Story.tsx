import Image from "next/image";

const chapters = [
  {
    year: "हिजो",
    title: "पुर्खाको अर्गानिक विधि",
    body: "In the heart of the Himalayas, our ancestral recipe was a sacred ritual. Every herb was hand-picked at dawn and slow-steeped in pure oils to capture the healing energy of the mountains for the whole family.",
  },
  {
    year: "आज",
    title: "हाम्रो अटुट निरन्तरता",
    body: "Three generations later, the flame still burns slow. We haven’t changed a single ingredient or rushed a single batch. We honor the same 33-ingredient blend that has nourished our people for decades.",
  },
  {
    year: "भोलि",
    title: "सदाबहार सुन्दरता",
    body: "Yachu is our promise to the next generation. It is a return to purity for the modern soul—ensuring that the wisdom of those who came before us continues to protect and strengthen every individual.",
  },
];

const Story = () => {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-forest py-20 md:py-28"
    >
      {/* Background Image with Depth Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/story-forest.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/40 to-forest/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="mb-16 md:mb-20 md:text-center">
          <p className="mb-3 font-devanagari text-2xl text-gold">
            हाम्रो गौरवमय यात्रा
          </p>
          <h2 className="mx-auto max-w-4xl font-display text-4xl leading-[1.15] text-white md:text-6xl">
            Three generations of care, bottled with patience.
          </h2>
          <div className="mx-auto mt-8 hidden h-px w-24 bg-gold/40 md:block" />
        </div>

        <div className="relative space-y-12 md:space-y-16">
          {chapters.map((c, i) => (
            <div
              key={c.year}
              className={`relative z-10 grid items-start gap-5 md:grid-cols-[180px_1fr] md:gap-16 ${
                i % 2 === 1 ? "md:ml-12" : ""
              }`}
            >
              <div className="relative flex items-center pt-2">
                <div className="absolute -right-24 left-24 top-[calc(50%+4px)] z-0 hidden h-[2px] bg-gradient-to-r from-transparent via-white/70 to-white/40 md:block" />
                <span className="relative z-10 inline-block shrink-0 rounded-full bg-gold px-8 py-2.5 font-devanagari text-xl leading-none text-white shadow-2xl shadow-gold/20">
                  {c.year}
                </span>
              </div>
              <div className="md:pl-12">
                <h3 className="mb-2 font-devanagari text-2xl tracking-tight text-gold md:text-3xl">
                  {c.title}
                </h3>
                <p className="max-w-2xl text-base font-light leading-relaxed text-white/80">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Final Tagline */}
        <div className="mt-16 md:mt-20 md:text-center">
          <p className="mx-auto mb-8 max-w-4xl font-devanagari text-2xl leading-snug text-white md:text-4xl">
            यो केवल तेल मात्र होइन,
            <br />
            <span className="text-gold">
              हाम्रो प्रेम र परम्पराको उपहार हो।
            </span>
          </p>
          <div className="flex items-center gap-6 md:justify-center md:gap-8">
            <div className="h-px w-16 bg-gold/20" />
            <p className="text-base font-bold text-gold">The Yachu Family</p>
            <div className="h-px w-16 bg-gold/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
