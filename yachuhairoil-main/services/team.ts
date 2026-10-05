import { fetcher } from "@/lib/api";
import type {
  TeamMember,
  Members,
  CreateTeamMemberData,
  UpdateTeamMemberData,
} from "@/types";

export const teamApi = {
  getTeamMembers: (): Promise<Members> => fetcher<Members>("/team-members/"),

  createMember: (data: CreateTeamMemberData): Promise<TeamMember> =>
    fetcher<TeamMember>("/team-members/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateMember: (
    id: number | string,
    data: UpdateTeamMemberData
  ): Promise<TeamMember> =>
    fetcher<TeamMember>(`/team-members/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteMember: (id: number | string): Promise<null> =>
    fetcher<null>(`/team-members/${id}/`, { method: "DELETE" }),
};
