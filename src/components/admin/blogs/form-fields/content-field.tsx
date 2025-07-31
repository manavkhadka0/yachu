'use client';
import ReusableQuill from '@/components/ui/tip-tap';
import React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BlogFormValues } from "@/schemas/blog.schemas";

interface ContentFieldProps {
  control: Control<BlogFormValues>;
}

export function ContentField({ control }: ContentFieldProps) {
  return (
    <FormField
      control={control}
      name="blog_content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <ReusableQuill
              value={field.value || ''}
              onChange={field.onChange}
              placeholder="Write your blog content here..."
              height="300px"
              toolbar="advanced"
            />
          </FormControl>
          <FormDescription>
            Write the main content of your blog post.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}