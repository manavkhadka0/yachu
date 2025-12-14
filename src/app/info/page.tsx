import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "QR Codes | Yachu Hair Oil",
  description: "Scan QR codes for price guess and purchase options",
  robots: {
    index: false,
    follow: false,
  },
};

const InfoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-primary/10 to-primary/30 flex items-start justify-center p-4 md:p-8 relative ">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Main title */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 tracking-tight">
            YACHU <span className="text-primary">PRODUCT LUNCH</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Use the QR codes below to access our price guess game or make a
            purchase
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Price Guess QR Code */}
          <div className="flex flex-col items-center space-y-8 group">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
                Price Guess
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Guess the price and win exciting prizes
              </p>
            </div>
            <div className="relative w-full max-w-sm aspect-square bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-2 flex items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-primary/20 hover:shadow-2xl border border-primary/10 group-hover:border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image
                src="/price guess.png"
                alt="Price Guess QR Code"
                width={400}
                height={400}
                className="w-full h-full object-contain relative z-10"
                priority
              />
            </div>
          </div>

          {/* Purchase QR Code */}
          <div className="flex flex-col items-center space-y-8 group">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
                Purchase
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Buy Yachu Hair Oil directly
              </p>
            </div>
            <div className="relative w-full max-w-sm aspect-square bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-2 flex items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-primary/20 hover:shadow-2xl border border-primary/10 group-hover:border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image
                src="/purchase.png"
                alt="Purchase QR Code"
                width={400}
                height={400}
                className="w-full h-full object-contain relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
