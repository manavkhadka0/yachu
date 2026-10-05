import { videoApi } from "@/services/video";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: () => videoApi.getVideo(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: (videoData) => videoApi.createVideo(videoData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
};

export const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: any; videoData: any }>({
    mutationFn: ({ id, videoData }) => videoApi.updateVideo(id, videoData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: (id) => videoApi.deleteVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
};
