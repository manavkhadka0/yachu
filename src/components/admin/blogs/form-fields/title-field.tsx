import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BlogFormValues } from "@/schemas/blog.schemas";

interface TitleFieldProps {
  control: Control<BlogFormValues>;
}

export function TitleField({ control }: TitleFieldProps) {
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="Enter blog title..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}