
import { Members } from "@/types/team";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TeamMemberSkeleton = () => (
  <Card className="p-4">
    <CardContent className="flex flex-col items-center p-0">
      <div className="relative w-full h-48 sm:h-64 overflow-hidden rounded-lg">
        <Skeleton className="w-full h-full" />
      </div>
      <Skeleton className="h-6 w-3/4 mt-4" />
      <Skeleton className="h-4 w-1/2 mt-2" />
    </CardContent>
  </Card>
);

interface OurTeamProps {
  teams: Members;
  isLoading?: boolean;
}

export const OurTeam = ({ teams, isLoading = false }: OurTeamProps) => {
  return (
    <section className="py-10 sm:py-16 lg:pt-5">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Meet the brains
          </h2>
          <p className="max-w-md mx-auto mt-4 text-base leading-relaxed text-muted-foreground">
            This is the team that makes everything possible and makes sure that
            everything runs smoothly.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8 text-center sm:mt-16 lg:mt-20 gap-y-8 gap-x-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <TeamMemberSkeleton key={index} />
              ))
            : teams
                .sort((a, b) => a.order - b.order) // Sort by order field
                .map((member) => (
                  <div key={member.id} className="flex justify-center">
                    <Card className="p-4 w-full max-w-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <CardContent className="flex flex-col items-center p-0">
                        <div className="relative w-full h-48 sm:h-64 overflow-hidden rounded-lg bg-gray-200">
                          {member.photo ? (
                            <img
                              src={member.photo}
                              alt={member.name}
                              loading="lazy"
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <span className="text-gray-500 text-sm">
                                No Photo
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="mt-4 text-lg font-semibold leading-tight text-foreground">
                          {member.name}
                        </p>
                        <p className="mt-1 text-base leading-tight text-muted-foreground">
                          {member.role}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
        </div>
      </div>
    </section>
  );
};
