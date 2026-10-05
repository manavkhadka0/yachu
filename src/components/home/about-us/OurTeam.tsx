import { Members } from "@/types/team";
import SectionHeading from "@/components/home/SectionHeading";

interface OurTeamProps {
  teams: Members;
  isLoading?: boolean;
}

export const OurTeam = ({ teams, isLoading = false }: OurTeamProps) => {
  if (!isLoading && teams.length === 0) return null;

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="The people behind Yachu"
          title="Meet the team"
          description="The team that makes everything possible and makes sure everything runs smoothly."
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/5] animate-pulse rounded-3xl bg-muted"
                />
              ))
            : [...teams]
                .sort((a, b) => a.order - b.order) // Sort by order field
                .map((member) => (
                  <article
                    key={member.id}
                    className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-forest"
                  >
                    {member.photo && (
                      <img
                        src={member.photo}
                        alt={member.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest via-forest/70 to-transparent p-4 pt-16 sm:p-5 sm:pt-20">
                      <p className="font-display text-lg leading-tight text-cream sm:text-xl">
                        {member.name}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-wider text-gold sm:text-sm">
                        {member.role}
                      </p>
                    </div>
                  </article>
                ))}
        </div>
      </div>
    </section>
  );
};
