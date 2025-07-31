import Script from "next/script";

interface AnalyticsProps {
  gid: string;
}

export default function Analytics({ gid }: AnalyticsProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${gid}`}
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gid}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
