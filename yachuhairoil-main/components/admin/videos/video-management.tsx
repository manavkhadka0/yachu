"use client";
import React, { useState } from "react";
import { useVideos } from "@/hooks/use-videos";
import { VideoForm } from "./video-form";
import { VideoTable } from "./video-table";
import { Loader2 } from "lucide-react";

export const VideoManagement = () => {
  const { data: videos, isLoading, error } = useVideos();
  const [editingVideo, setEditingVideo] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const handleEdit = (video) => {
    setEditingVideo(video);
  };

  const handleFormSuccess = () => {
    setEditingVideo(null);
    setFormKey((prev) => prev + 1);
  };

  const handleCancel = () => {
    setEditingVideo(null);
    setFormKey((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading videos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Error loading videos: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Video Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <VideoForm
            key={formKey}
            editingVideo={editingVideo}
            onSuccess={handleFormSuccess}
            onCancel={handleCancel}
          />
        </div>

        <div className="lg:col-span-2">
          <VideoTable videos={videos || []} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
};
