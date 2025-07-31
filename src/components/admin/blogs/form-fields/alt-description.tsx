import React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BlogFormValues } from "@/schemas/blog.schemas";

interface AltDescriptionFieldProps {
  control: Control<BlogFormValues>;
}

export function AltDescriptionField({ control }: AltDescriptionFieldProps) {
  return (
    <FormField
      control={control}
      name="thumbnail_image_alt_description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Alt Description</FormLabel>
          <FormControl>
            <Input
              placeholder="Describe the image for accessibility..."
              {...field}
            />
          </FormControl>
          <FormDescription>
            Alt text for screen readers and SEO.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
