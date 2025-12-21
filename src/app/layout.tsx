import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";

import { Toaster } from "sonner";
import Analytics from "@/components/google-analytics";
import QueryProvider from "@/components/providers/QueryProvider";
import TopLoader from "@/components/top-loader";
import ClientLayoutWrapper from "@/components/client-layout-wrapper";

const br = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yachu Hair Oil - Made in Nepal with 33 Jadibuti",
  description:
    "Are you suffering from hair loss, dandruff, or baldness? Try Yachuhair oil, made in Nepal with 33 Jadibuti for healthier, stronger hair.",
  keywords: [
    "Yachu",
    "hair oil",
    "Nepal",
    "jadibuti",
    "Natural hair care",
    "Natural hair product",
  ],
  openGraph: {
    title: "Yachu Hair Oil - Made in Nepal with 33 Jadibuti",
    description:
      "Are you suffering from hair loss, dandruff, or baldness? Try Yachuhair oil, made in Nepal with 33 Jadibuti for healthier, stronger hair.",
    images: [
      {
        url: "/yachu-hair-oil-bottle.png",
        width: 1200,
        height: 630,
        alt: "Yachu Hair Oil Product Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={br.className}>
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2052711762157186');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2052711762157186&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <QueryProvider>
          <Suspense fallback={null}>
            <TopLoader />
          </Suspense>
          <Analytics gid="G-HB06VVN470" />
          <ClientLayoutWrapper>
            <main className="min-h-screen">{children}</main>
          </ClientLayoutWrapper>
          <Toaster position="bottom-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
