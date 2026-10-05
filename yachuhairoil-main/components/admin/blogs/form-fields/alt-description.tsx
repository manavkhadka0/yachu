import React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { blogFormSchema } from "@/schemas/blog.schemas";



export function AltDescriptionField({ control }) {
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
