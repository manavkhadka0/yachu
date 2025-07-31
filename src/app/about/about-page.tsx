"use client";
import FlowerDivider from "@/components/shared/FlowerDivider";
import InstagramEmbed from "@/components/home/InstagramEmbed";
import YachuWomen from "@/components/home/YachuWomen";
import { INSTAGRAM_EMBED_URLS } from "@/constants/constant";
import { OurTeam } from "@/components/home/about-us/OurTeam";
import { About } from "@/components/home/about-us/About";
import { useTeamMembers } from "@/hooks/use-our-team";

export default function AboutPage() {
  const { data: teamMembers = [], isLoading, error } = useTeamMembers();

  return (
    <main className="flex flex-col">
      <About />
      <p className="text-4xl pt-10 mb-4 text-center font-bold text-black">
        50K+ Happy And Satisfied Yachu Users
      </p>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-20 pb-40">
        {INSTAGRAM_EMBED_URLS.map((url, index) => (
          <InstagramEmbed key={index} url={url} />
        ))}
      </div>
      <FlowerDivider />
      {error ? (
        <div className="text-center py-10">
          <p className="text-red-500">Failed to load team members</p>
        </div>
      ) : (
        <OurTeam teams={teamMembers} isLoading={isLoading} />
      )}
      <YachuWomen />
    </main>
  );
}
