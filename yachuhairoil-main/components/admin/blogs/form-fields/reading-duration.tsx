import React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { blogFormSchema } from "@/schemas/blog.schemas";



export function ReadingDurationField({ control }) {
  return (
    <FormField
      control={control}
      name="blog_duration_to_read"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Reading Duration</FormLabel>
          <FormControl>
            <Input placeholder="e.g., 5 min read" {...field} />
          </FormControl>
          <FormDescription>
            Estimated time to read this post.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}