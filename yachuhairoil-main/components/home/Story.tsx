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
export function Story({ config }) {
  const ourStory = config?.our_story;

  return (
    <section
      id="story"
      className="relative py-20 md:py-28 overflow-hidden bg-forest"
    >
      {/* Background Image with Depth Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/story-forest.jpg"
          alt="Misty Himalayan forest"
          className="w-full h-full object-cover opacity-60"
          width={1536}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/40 to-forest/90" />
      </div>

      <div className="relative z-10 max-w-5xl md:mx-auto px-6">
        <div className="md:text-center mb-20">
          <p className="font-script text-3xl text-gold mb-3">
            हाम्रो गौरवमय यात्रा
          </p>
          <h2 className="text-4xl md:text-6xl text-white max-w-4xl mx-auto leading-[1.15] font-display">
            Three generations of care,
            <br />
            bottled with patience.
          </h2>
          <div className="hidden md:block mt-8 mx-auto w-24 h-px bg-gold/40" />
        </div>

        {ourStory && (
          <div className="mb-20 prose prose-invert prose-lg max-w-none text-white/90">
            <div dangerouslySetInnerHTML={{ __html: ourStory }} />
          </div>
        )}

        <div className="space-y-16 relative">
          {chapters.map((c, i) => (
            <div
              key={c.year}
              className={`relative z-10 grid md:grid-cols-[180px_1fr] gap-8 md:gap-16 items-start ${i % 2 === 1 ? "md:ml-12" : ""}`}
            >
              <div className="relative flex items-center pt-2">
                <div className="absolute -right-8 md:-right-24 top-[calc(50%+4px)] left-24 h-[2px] bg-gradient-to-r from-transparent via-white/70 to-white/40 z-0 hidden md:block" />

                <span className="relative z-10 inline-block px-8 py-2.5 rounded-full bg-gold text-white font-script text-2xl shadow-2xl shadow-gold/20 leading-none shrink-0">
                  {c.year}
                </span>
              </div>
              <div className="md:pl-12 pl-0">
                <h3 className="text-3xl md:text-4xl text-white mb-2 font-display tracking-tight text-gold">
                  {c.title}
                </h3>
                <p className="text-white/80 text-base leading-relaxed max-w-2xl font-light">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Final Tagline Card */}
        <div className="mt-20 text-center">
          <div className="inline-block relative px-10 py-16 md:px-24 md:py-20 rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl" />

            <div className="relative z-10">
              <p className="font-display text-3xl md:text-5xl text-white max-w-4xl mx-auto leading-tight mb-10">
                यो केवल तेल मात्र होइन,
                <br />
                <span className="text-gold">
                  हाम्रो प्रेम र परम्पराको उपहार हो।
                </span>
              </p>
              <div className="flex items-center justify-center gap-8">
                <div className="w-16 h-px bg-gold/20" />
                <p className="text-base text-gold font-bold">
                  The Yachu Family
                </p>
                <div className="w-16 h-px bg-gold/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
