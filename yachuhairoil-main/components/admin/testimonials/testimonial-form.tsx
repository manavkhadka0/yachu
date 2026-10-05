"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCreateTestimonial, useUpdateTestimonial } from "@/hooks/use-testimonials";
import { franchise } from "@/lib/constants";
import { toast } from "sonner";

export const TestimonialForm = ({ editingTestimonial, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    title: "",
    source: "",
    review: "",
    rating: "",
  });

  const [beforeFile, setBeforeFile] = useState(null);
  const [beforePreview, setBeforePreview] = useState("");

  const [afterFile, setAfterFile] = useState(null);
  const [afterPreview, setAfterPreview] = useState("");

  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();

  useEffect(() => {
    if (editingTestimonial) {
      setFormData({
        name: editingTestimonial.name || "",
        role: editingTestimonial.role || "",
        title: editingTestimonial.title || "",
        source: editingTestimonial.source || "",
        review: editingTestimonial.review || "",
        rating: editingTestimonial.rating !== null && editingTestimonial.rating !== undefined ? editingTestimonial.rating.toString() : "",
      });
      setBeforePreview(editingTestimonial.before || "");
      setAfterPreview(editingTestimonial.after || "");
      setBeforeFile(null);
      setAfterFile(null);
    } else {
      setFormData({
        name: "",
        role: "",
        title: "",
        source: "",
        review: "",
        rating: "",
      });
      setBeforePreview("");
      setAfterPreview("");
      setBeforeFile(null);
      setAfterFile(null);
    }
  }, [editingTestimonial]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "before") {
        setBeforeFile(file);
        const reader = new FileReader();
        reader.onload = (event) => setBeforePreview(event.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setAfterFile(file);
        const reader = new FileReader();
        reader.onload = (event) => setAfterPreview(event.target?.result as string);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingTestimonial && (!beforeFile || !afterFile)) {
      toast.error("Both 'Before' and 'After' images are required for new testimonials.");
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("review", formData.review);

    // Optional fields
    submitData.append("role", formData.role || "");
    submitData.append("title", formData.title || "");
    submitData.append("source", formData.source || "");
    
    if (formData.rating !== "") {
      submitData.append("rating", formData.rating);
    }

    if (franchise) {
      submitData.append("franchise", franchise);
    }

    if (beforeFile) {
      submitData.append("before", beforeFile);
    }
    if (afterFile) {
      submitData.append("after", afterFile);
    }

    try {
      if (editingTestimonial) {
        await updateMutation.mutateAsync({
          id: editingTestimonial.id,
          testimonialData: submitData,
        });
        toast.success("Testimonial updated successfully");
      } else {
        await createMutation.mutateAsync(submitData);
        toast.success("Testimonial added successfully");
      }

      setFormData({
        name: "",
        role: "",
        title: "",
        source: "",
        review: "",
        rating: "",
      });
      setBeforeFile(null);
      setAfterFile(null);
      setBeforePreview("");
      setAfterPreview("");
      onSuccess?.();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast.error("Failed to save testimonial");
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review">Review *</Label>
            <Textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              required
              placeholder="Write the testimonial review..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="e.g. Verified Buyer, Hair Stylist"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Amazing results"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select source</option>
              <option value="In Person">In Person</option>
              <option value="Facebook">Facebook</option>
              <option value="Google">Google</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              value={formData.rating}
              onChange={handleInputChange}
              min="1"
              max="5"
              placeholder="e.g. 5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="before">Before Image *</Label>
              <Input
                id="before"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "before")}
                required={!editingTestimonial}
              />
              {beforePreview && (
                <div className="mt-2 text-center">
                  <span className="text-xs text-muted-foreground block mb-1">Before Preview</span>
                  <Avatar className="w-20 h-20 mx-auto rounded-md">
                    <AvatarImage src={beforePreview} alt="Before Preview" className="object-cover" />
                    <AvatarFallback className="rounded-md">Before</AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="after">After Image *</Label>
              <Input
                id="after"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "after")}
                required={!editingTestimonial}
              />
              {afterPreview && (
                <div className="mt-2 text-center">
                  <span className="text-xs text-muted-foreground block mb-1">After Preview</span>
                  <Avatar className="w-20 h-20 mx-auto rounded-md">
                    <AvatarImage src={afterPreview} alt="After Preview" className="object-cover" />
                    <AvatarFallback className="rounded-md">After</AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Saving..." : editingTestimonial ? "Update" : "Add"}
            </Button>
            {editingTestimonial && (
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
