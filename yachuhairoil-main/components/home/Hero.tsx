import { ChevronRight } from "lucide-react";

export function Hero() {

  return (
    <section
      id="top"
      className="relative pt-14 md:pt-20 overflow-hidden bg-background"
    >
      {/* organic blob accents */}
      <div className="absolute top-20 -left-24 w-96 h-96 rounded-full bg-sage/20 blur-3xl" />
      <div className="absolute top-40 right-0 w-80 h-80 rounded-full bg-sage/10 blur-3xl opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-10 items-center min-h-[calc(100vh-7rem)] py-12">
        {/* Left content */}
        <div className="relative z-10">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-forest font-bold leading-[1.05] mt-3 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Yachu Hair Oil
          </h1>

          <div
            className="mt-8 space-y-4 text-forest font-semibold text-md md:text-xl animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <p>❌ Dandruff, Hair Loss, Baldness?</p>
            <p>🟢 Ultimate Solution = Yachu Hair Oil</p>
            <p>🍃 Crafted with 33 natural Ingredients</p>
            <p>✅ Easy, Affordable and Safe</p>
          </div>

          {/* Problem Icons (Mobile Only) */}
          <div
            className="md:hidden flex gap-2 items-center my-6 animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            {[
              { label: "Dandruff?", src: "/dandruff.png" },
              { label: "Hairfall?", src: "/hairfall.webp" },
              { label: "Baldness?", src: "/baldness.png" },
            ].map((item, index) => (
              <div key={item.label} className="flex items-center gap-1">
                <div className="flex flex-col items-center p-2 border border-border bg-card rounded-xl">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-10 w-10 rounded-full object-cover border border-border"
                  />
                  <p className="text-[10px] font-bold mt-1 text-forest text-center">
                    {item.label}
                  </p>
                </div>
                {index < 2 && <ChevronRight className="text-gold h-4 w-4" />}
              </div>
            ))}
          </div>

          <p
            className="mt-8 text-3xl md:text-5xl font-extrabold text-forest animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            50K +
            <span className="text-sm md:text-lg font-semibold">
              Customers Trust Yachu
            </span>
          </p>
          <div
            className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="/products"
              className="px-8 py-4 rounded-full bg-forest hover:bg-forest/90 text-cream font-medium tracking-wide transition-all hover:scale-105 shadow-[0_15px_40px_-15px_oklch(0.32_0.07_150/0.6)]"
            >
              Order Now
            </a>
            <a
              href="/about"
              className="px-8 py-4 rounded-full border-2 border-forest/20 text-forest hover:bg-forest/5 transition-colors flex items-center gap-2"
            >
              Know Our story <ChevronRight className="h-4" />
            </a>
          </div>
        </div>

        {/* Right image */}
        <div
          className="relative animate-fade-up hidden md:block"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative aspect-square max-w-xl mx-auto">
            <img
              src="/hero.png"
              alt="Yachu Hair Oil Hero"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
