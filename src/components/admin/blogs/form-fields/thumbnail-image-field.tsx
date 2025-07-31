import React from "react";
import Image from "next/image";
import { Control } from "react-hook-form";
import { Upload, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BlogFormValues } from "@/schemas/blog.schemas";
import { getImageUrl } from "@/utils/image";

interface ThumbnailImageFieldProps {
  control: Control<BlogFormValues>;
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
}

export function ThumbnailImageField({
  control,
  imagePreview,
  onImageChange,
}: ThumbnailImageFieldProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    // Validate file type and size
    if (file) {
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        alert("Please select a valid image file (PNG, JPG, JPEG, or WEBP)");
        return;
      }

      if (file.size > maxSize) {
        alert("File size must be less than 5MB");
        return;
      }
    }

    onImageChange(file);
  };

  return (
    <FormField
      control={control}
      name="thumbnail_image"
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          <FormLabel>Thumbnail Image</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={getImageUrl(imagePreview)}
                        alt="Preview"
                        fill
                        className="object-cover rounded-lg"
                        onError={(e) => {
                          console.error("Image failed to load:", imagePreview);
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                        onClick={(e) => {
                          e.preventDefault();
                          onImageChange(null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or WEBP (MAX. 5MB)
                      </p>
                    </div>
                  )}
                  <input
                    {...field}
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
