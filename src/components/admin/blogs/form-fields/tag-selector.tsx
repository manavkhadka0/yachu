import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, X, Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Control } from "react-hook-form";

import { TTag } from "@/types/blog";
import { BlogFormValues } from "@/schemas/blog.schemas";

const createTagSchema = z.object({
  tag_name: z
    .string()
    .min(1, "Tag name is required")
    .max(50, "Tag name must be less than 50 characters"),
});

type CreateTagFormValues = z.infer<typeof createTagSchema>;

interface TagSelectorProps {
  tags: TTag[];
  control: Control<BlogFormValues>;
  name: keyof BlogFormValues;
  label?: string;
  onCreateTag?: (tagName: string) => Promise<TTag>;
}

export function TagSelector({
  tags,
  control,
  name,
  label = "Tags",
  onCreateTag,
}: TagSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<CreateTagFormValues>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      tag_name: "",
    },
  });

  const filteredTags = tags.filter((tag) =>
    tag.tag_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTag = async (values: CreateTagFormValues) => {
    if (!onCreateTag) {
      toast.error("Tag creation is not available");
      return;
    }

    setIsCreating(true);
    try {
      form.reset();
      setIsDialogOpen(false);
      toast.success("Tag created successfully!");
    } catch (error) {
      console.error("Failed to create tag:", error);
      toast.error("Failed to create tag. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{label}</CardTitle>
          {onCreateTag && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Create Tag
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Tag</DialogTitle>
                  <DialogDescription>
                    Add a new tag to categorize your blog posts.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleCreateTag)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="tag_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tag Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter tag name..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isCreating}>
                        {isCreating ? "Creating..." : "Create Tag"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Tags</FormLabel>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Selected Tags Display */}
              {Array.isArray(field.value) && field.value.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Selected Tags:</Label>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {field.value.map((tagId: number) => {
                      const tag = tags.find((t) => t.id === tagId);
                      return tag ? (
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag.tag_name}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const newValue = (field.value as number[]).filter(
                                (id: number) => id !== tagId
                              );
                              field.onChange(newValue);
                            }}
                            className="ml-1 rounded-full  p-0.5 transition-colors"
                            aria-label={`Remove ${tag.tag_name} tag`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* Available Tags */}
              <div className="max-h-60 overflow-y-auto space-y-2">
                {filteredTags.length > 0 ? (
                  filteredTags.map((tag) => (
                    <div key={tag.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag.id}`}
                        checked={
                          Array.isArray(field.value)
                            ? field.value.includes(tag.id)
                            : false
                        }
                        onCheckedChange={(checked) => {
                          const currentValue = Array.isArray(field.value)
                            ? field.value
                            : [];
                          if (checked) {
                            field.onChange([...currentValue, tag.id]);
                          } else {
                            field.onChange(
                              currentValue.filter((id: number) => id !== tag.id)
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={`tag-${tag.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {tag.tag_name}
                      </Label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    {searchTerm
                      ? "No tags found matching your search."
                      : "No tags available."}
                  </p>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
