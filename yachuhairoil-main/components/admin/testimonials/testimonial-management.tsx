"use client";
import React, { useState } from "react";
import { useTestimonials } from "@/hooks/use-testimonials";
import { TestimonialForm } from "./testimonial-form";
import { TestimonialTable } from "./testimonial-table";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const TestimonialManagement = () => {
  const { data: testimonials, isLoading, error } = useTestimonials();
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setIsDialogOpen(true);
  };

  const handleCreateNew = () => {
    setEditingTestimonial(null);
    setFormKey((prev) => prev + 1);
    setIsDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setEditingTestimonial(null);
    setIsDialogOpen(false);
    setFormKey((prev) => prev + 1);
  };

  const handleCancel = () => {
    setEditingTestimonial(null);
    setIsDialogOpen(false);
    setFormKey((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading testimonials...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Error loading testimonials: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonial Management</h1>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Button>
      </div>

      <div className="w-full">
        <TestimonialTable testimonials={testimonials || []} onEdit={handleEdit} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </DialogTitle>
          </DialogHeader>
          <TestimonialForm
            key={formKey}
            editingTestimonial={editingTestimonial}
            onSuccess={handleFormSuccess}
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
