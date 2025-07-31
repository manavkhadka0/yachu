import { Members, TEAM } from "@/types/team";
import { BASE_API_URL } from "@/utils/config";
import { franchise } from "@/constants/constant";

export const teamAPI = {
  getTeamMembers: async (): Promise<Members> => {
    const url = new URL(`${BASE_API_URL}/team-members/`);
    if (franchise) {
      url.searchParams.append("franchise", franchise);
    }
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch team members: ${response.status}`);
    }
    const data = await response.json();
    return data;
  },

  createTeamMember: async (memberData: FormData): Promise<TEAM> => {
    const url = new URL(`${BASE_API_URL}/team-members/`);
    const response = await fetch(url.toString(), {
      method: "POST",

      body: memberData,
    });
    if (!response.ok) {
      throw new Error(`Failed to create team member: ${response.status}`);
    }
    const data = await response.json();
    return data;
  },

  updateTeamMember: async (id: number, memberData: FormData): Promise<TEAM> => {
    const url = new URL(`${BASE_API_URL}/team-members/${id}/`);
    const response = await fetch(url.toString(), {
      method: "PUT",

      body: memberData,
    });
    if (!response.ok) {
      throw new Error(`Failed to update team member: ${response.status}`);
    }
    const data = await response.json();
    return data;
  },

  deleteTeamMember: async (id: number): Promise<void> => {
    const url = new URL(`${BASE_API_URL}/team-members/${id}/`);
    const response = await fetch(url.toString(), {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete team member: ${response.status}`);
    }
  },
};
