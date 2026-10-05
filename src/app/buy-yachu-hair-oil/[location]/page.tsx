import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  MapPinIcon,
  Phone,
  ShoppingBag,
  PackageCheck,
  Truck,
  Banknote,
  Users,
  CheckCircle2,
} from "lucide-react";
import {
  YACHU_LOCATIONS,
  yachuPhone,
  chibekoAddress,
  chibekoVatNo,
  chibekoRegistrationNo,
} from "@/constants/constant";

interface Props {
  params: Promise<{ location: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return YACHU_LOCATIONS.map(({ slug }) => ({ location: slug }));
}

function getLocation(slug: string) {
  return YACHU_LOCATIONS.find((l) => l.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const loc = getLocation(location);
  if (!loc) return {};

  const title = `Buy Yachu Hair Oil in ${loc.label} | Yachu Nepal`;
  const description = `Order Yachu Hair Oil in ${loc.label} with cash on delivery. Premium Ayurvedic hair oil for dandruff, hairfall and baldness — delivered to your door in ${loc.label}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/yachuoil.webp",
          width: 800,
          height: 800,
          alt: "Yachu Hair Oil",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/yachuoil.webp"],
    },
    alternates: {
      canonical: `/buy-yachu-hair-oil/${loc.slug}`,
    },
  };
}

function LocationSchema({ label, slug }: { label: string; slug: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Yachu Hair Oil — ${label}`,
    description: `Buy Yachu Hair Oil in ${label}, Nepal. Cash on delivery available.`,
    url: `https://yachunepal.com/buy-yachu-hair-oil/${slug}`,
    telephone: yachuPhone,
    areaServed: { "@type": "Place", name: `${label}, Nepal` },
    brand: { "@type": "Brand", name: "Yachu Hair Oil" },
    image: "https://yachunepal.com/yachuoil.webp",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://yachunepal.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `Yachu in ${label}`,
        item: `https://yachunepal.com/buy-yachu-hair-oil/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

const STEPS = [
  {
    Icon: ShoppingBag,
    title: "Order",
    body: "Pick your pack and fill in three details. Pay in cash on delivery.",
  },
  {
    Icon: PackageCheck,
    title: "Receive",
    body: "Your Yachu arrives right to your door in",
    appendCity: true,
  },
  {
    Icon: CheckCircle2,
    title: "Feel the Difference",
    body: "Experience healthier, stronger hair with Yachu's 33 natural ingredients.",
  },
];

const TRUST = [
  { Icon: Banknote, label: "Cash on Delivery" },
  { Icon: Truck, label: "Delivery all over Nepal" },
  { Icon: Users, label: "50K+ customers" },
];

export default async function BuyYachuLocationPage({ params }: Props) {
  const { location } = await params;
  const loc = getLocation(location);
  if (!loc) notFound();

  const telHref = `tel:${yachuPhone.replace(/\s/g, "")}`;
  const otherLocations = YACHU_LOCATIONS.filter((l) => l.slug !== loc.slug);

  return (
    <>
      <LocationSchema label={loc.label} slug={loc.slug} />

      <div className="flex min-h-screen flex-col bg-background">
        {/* Slim header — matches dashain-dhamaka exactly */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2">
            <Link href="/" aria-label="Yachu Hair Oil home">
              <img
                src="/yachuoil.webp"
                alt="Yachu Hair Oil"
                width={56}
                height={56}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <a
              href={telHref}
              className="flex h-11 items-center gap-2 rounded-full border-2 border-forest/20 px-4 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
            >
              <Phone className="h-4 w-4" />
              {yachuPhone}
            </a>
          </div>
        </header>

        {/* Hero — matches dashain-dhamaka */}
        <section className="relative overflow-hidden bg-gradient-to-br from-forest to-[oklch(0.22_0.06_150)]">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-12 pt-8 md:grid-cols-2 md:gap-12 md:pb-20 md:pt-16">
            <div>
              <p className="flex items-center gap-2 font-script text-2xl text-gold">
                <MapPinIcon className="h-5 w-5 shrink-0" />
                {loc.label}, Nepal
              </p>
              <h1 className="mt-2 text-balance text-4xl leading-[1.08] text-cream sm:text-5xl md:text-6xl">
                Buy Yachu Hair Oil in {loc.label}
              </h1>
              <p className="mt-4 max-w-md text-base text-cream/80 md:text-lg">
                {"Nepal's trusted Ayurvedic hair oil — delivered right to your door in "}
                <strong className="text-cream">{loc.label}</strong>
                {". Cash on delivery, no advance needed."}
              </p>

              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-cream/85">
                {TRUST.map(({ Icon, label }) => (
                  <li key={label} className="flex items-center gap-1.5">
                    <Icon className="h-4 w-4 text-gold" />
                    {label}
                  </li>
                ))}
              </ul>

              <Link
                href="/#products"
                className="group mt-6 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-yellow-cta px-8 text-lg font-bold tracking-wide text-[oklch(0.2_0.04_55)] shadow-xl transition-all hover:brightness-95 md:w-auto"
              >
                Order Now
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <Link
              href="/#products"
              aria-label="Order Yachu Hair Oil"
              className="block overflow-hidden rounded-3xl border-2 border-gold/30 shadow-2xl"
            >
              <Image
                src="/hero.png"
                alt={`Yachu Hair Oil available in ${loc.label}`}
                width={1050}
                height={600}
                priority
                sizes="(max-width: 768px) 100vw, 560px"
                className="h-auto w-full"
              />
            </Link>
          </div>
        </section>

        {/* How it works — matches dashain-dhamaka exactly */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <p className="font-script text-center text-2xl text-forest/70">
              Easy as 1, 2, 3
            </p>
            <h2 className="mt-1 text-center text-4xl font-semibold text-foreground md:text-5xl">
              How it works
            </h2>
            <p className="mx-auto mt-3 mb-10 max-w-lg text-center text-base text-foreground/60">
              Order Yachu Hair Oil in {loc.label} in three simple steps.
            </p>
            <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
              {STEPS.map(({ Icon, title, body, appendCity }, index) => (
                <li
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 md:flex-col md:p-7"
                >
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-forest/10 text-forest">
                    <Icon className="h-6 w-6" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-white">
                      {index + 1}
                    </span>
                  </span>
                  <div>
                    <h3 className="text-xl text-forest md:text-2xl">{title}</h3>
                    <p className="mt-1 leading-relaxed text-foreground/70">
                      {body}
                      {appendCity ? ` ${loc.label}.` : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Other Locations */}
        <section className="bg-card pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl px-5 pt-14">
            <p className="font-script text-center text-2xl text-forest/70">
              Find us near you
            </p>
            <h2 className="mt-1 mb-8 text-center text-3xl font-semibold text-foreground md:text-4xl">
              Available in {YACHU_LOCATIONS.length} locations
            </h2>
            <ul className="flex flex-wrap justify-center gap-3">
              {otherLocations.map(({ label, slug }) => (
                <li key={slug}>
                  <Link
                    href={`/buy-yachu-hair-oil/${slug}`}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground/70 transition-colors hover:border-forest hover:text-forest"
                  >
                    <MapPinIcon className="h-3.5 w-3.5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Footer — matches dashain-dhamaka */}
        <footer className="mt-auto bg-forest pb-8 pt-8 text-cream/75">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-sm md:flex-row md:items-center md:justify-between">
            <p>
              <span className="font-semibold text-cream">
                Chibe Traders Pvt. Ltd.
              </span>{" "}
              · {chibekoAddress}
            </p>
            <p>
              VAT No: {chibekoVatNo} · Reg No: {chibekoRegistrationNo} ·{" "}
              <Link href="/privacy-policy" className="underline">
                Privacy
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
