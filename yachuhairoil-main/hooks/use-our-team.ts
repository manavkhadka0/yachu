import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { teamApi } from '@/services';

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: () => teamApi.getTeamMembers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: (memberData) => teamApi.createMember(memberData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });
};

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: any; memberData: any }>({
    mutationFn: ({ id, memberData }) =>
      teamApi.updateMember(id, memberData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: (id) => teamApi.deleteMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });
};
