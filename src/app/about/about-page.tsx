"use client";
import Image from "next/image";
import { Quote } from "lucide-react";
import { OurTeam } from "@/components/home/about-us/OurTeam";
import Story from "@/components/home/Story";
import VideoStories from "@/components/home/VideoStories";
import { useTeamMembers } from "@/hooks/use-our-team";
import { useSiteSettings } from "@/hooks/use-site-settings";

export default function AboutPage() {
  const { data: teamMembers = [], isLoading, error } = useTeamMembers();
  const { data: siteConfig } = useSiteSettings();

  // The API falls back to placeholder text when it cannot load
  const cms = (value?: string) =>
    value && !value.startsWith("dummy_") ? value : "";
  const ourStory = cms(siteConfig?.our_story);
  const aboutFounder = cms(siteConfig?.about_founder);
  const ceoMessage = cms(siteConfig?.message_from_ceo);

  return (
    <div className="flex flex-col">
      {/* Page header */}
      <section className="relative overflow-hidden border-b border-border bg-cream/30 py-16 md:py-24">
        <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-sage/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 md:text-center">
          <p className="mb-4 font-script text-3xl text-gold">Our Heritage</p>
          <h1 className="mx-auto mb-8 max-w-4xl font-display text-5xl leading-tight text-forest md:text-7xl">
            Crafting botanical excellence for healthy hair.
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-moss">
            Yachu Hair Oil was born from a deep respect for traditional
            knowledge and a desire to bring pure, effective botanical care to
            everyone.
          </p>
        </div>
      </section>

      {/* Our story (from the CMS) */}
      {ourStory && (
        <section className="relative py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 scale-110 rounded-full bg-gold/10 blur-3xl" />
              <Image
                src="/hairfall-bottle.png"
                alt="Yachu Hair Oil bottle"
                width={670}
                height={714}
                sizes="(max-width: 768px) 80vw, 448px"
                className="relative h-auto w-full animate-float drop-shadow-2xl"
              />
            </div>
            <div>
              <p className="mb-2 font-script text-2xl text-gold">
                Wanna know us better?
              </p>
              <h2 className="mb-6 text-4xl text-forest md:text-5xl">
                Our Story
              </h2>
              <div
                className="rich-text text-lg leading-relaxed text-foreground/70"
                dangerouslySetInnerHTML={{ __html: ourStory }}
              />
            </div>
          </div>
        </section>
      )}

      <Story />

      {/* Founder */}
      {(aboutFounder || ceoMessage) && (
        <section className="relative bg-card py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            {aboutFounder && (
              <div>
                <p className="mb-2 font-script text-2xl text-gold">
                  The founder
                </p>
                <h2 className="mb-6 text-4xl text-forest md:text-5xl">
                  About the Founder
                </h2>
                <div
                  className="rich-text leading-relaxed text-foreground/70"
                  dangerouslySetInnerHTML={{ __html: aboutFounder }}
                />
              </div>
            )}
            {ceoMessage && (
              <figure className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest to-[oklch(0.22_0.06_150)] p-8 text-cream shadow-2xl md:p-10 lg:sticky lg:top-28">
                <Quote className="mb-4 h-8 w-8 text-gold" />
                <blockquote
                  className="rich-text font-display text-xl italic leading-relaxed md:text-2xl"
                  dangerouslySetInnerHTML={{ __html: ceoMessage }}
                />
                <figcaption className="mt-6 flex items-center gap-4">
                  <div className="h-px w-10 bg-gold/40" />
                  <span className="text-sm font-bold text-gold">
                    Message from the CEO
                  </span>
                </figcaption>
              </figure>
            )}
          </div>
        </section>
      )}

      {/* Mission */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-2 font-script text-2xl text-gold">Why we do it</p>
            <h2 className="mb-6 text-4xl text-forest md:text-5xl">
              Our Mission
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-foreground/70">
              To empower people to embrace their natural beauty through
              sustainable, traditional, and effective hair care solutions. We
              believe that what you put on your body should be as pure as what
              you put in it.
            </p>
            <p className="text-lg leading-relaxed text-foreground/70">
              Every bottle of Yachu is a testament to our commitment to
              quality, using only the finest ingredients sourced responsibly.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/yachu-women.jpeg"
              alt="The Yachu Hair Oil team"
              width={1080}
              height={755}
              sizes="(max-width: 768px) 100vw, 600px"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {!error && <OurTeam teams={teamMembers} isLoading={isLoading} />}

      <VideoStories />
    </div>
  );
}
