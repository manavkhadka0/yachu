"use client";
import React, { useState } from "react";
import { useTeamMembers } from "@/hooks/use-our-team";
import { OurTeamForm } from "./our-team-form";
import { TeamMembersTable } from "./team-members-table";
import { TEAM } from "@/types/team";
import { Loader2 } from "lucide-react";

export const TeamManagement: React.FC = () => {
  const { data: members, isLoading, error } = useTeamMembers();
  const [editingMember, setEditingMember] = useState<TEAM | null>(null);
  const [formKey, setFormKey] = useState(0); // Force form re-render

  const handleEdit = (member: TEAM) => {
    setEditingMember(member);
  };

  const handleFormSuccess = () => {
    setEditingMember(null);
    setFormKey((prev) => prev + 1); // Increment key to force form reset
  };

  const handleCancel = () => {
    setEditingMember(null);
    setFormKey((prev) => prev + 1); // Increment key to force form reset
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading team members...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Error loading team members: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Team Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <OurTeamForm
            key={formKey} 
            editingMember={editingMember}
            onSuccess={handleFormSuccess}
            onCancel={handleCancel}
          />
        </div>

        <div className="lg:col-span-2">
          <TeamMembersTable members={members || []} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
};
