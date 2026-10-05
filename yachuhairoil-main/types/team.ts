// ─── Team Domain Types ────────────────────────────────────────────────────────

export interface Department {
  id: number;
  name: string;
}

export interface TeamMember {
  id: number;
  order: number;
  name: string;
  role: string;
  photo: string;
  about?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  department?: Department;
}

export type Members = TeamMember[];

// ─── Mutation Payloads ───────────────────────────────────────────────────────

export type CreateTeamMemberData = Omit<TeamMember, "id">;
export type UpdateTeamMemberData = Partial<CreateTeamMemberData>;
