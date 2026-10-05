"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useCreateVideo, useUpdateVideo } from "@/hooks/use-videos";
import { franchise } from "@/lib/constants";
import { toast } from "sonner";

export const VideoForm = ({ editingVideo, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    youtube_video_link: "",
  });

  const createMutation = useCreateVideo();
  const updateMutation = useUpdateVideo();

  useEffect(() => {
    if (editingVideo) {
      setFormData({
        title: editingVideo.title || "",
        youtube_video_link: editingVideo.youtube_video_link || "",
      });
    } else {
      setFormData({ title: "", youtube_video_link: "" });
    }
  }, [editingVideo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      title: formData.title,
      video_url: formData.youtube_video_link,
      ...(franchise ? { franchise } : {}),
    };

    try {
      if (editingVideo) {
        await updateMutation.mutateAsync({
          id: editingVideo.id,
          videoData: submitData,
        });
        toast.success("Video updated successfully");
      } else {
        await createMutation.mutateAsync(submitData);
        toast.success("Video added successfully");
      }

      setFormData({ title: "", youtube_video_link: "" });
      onSuccess?.();
    } catch (error) {
      console.error("Error saving video:", error);
      toast.error("Failed to save video");
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {editingVideo ? "Edit Video" : "Add New Video"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video_url">Video URL</Label>
            <Input
              id="youtube_video_link"
              name="youtube_video_link"
              value={formData.youtube_video_link}
              onChange={handleInputChange}
              required
              placeholder="Enter video URL (e.g. Youtube URL)"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Saving..." : editingVideo ? "Update" : "Add"}
            </Button>
            {editingVideo && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
