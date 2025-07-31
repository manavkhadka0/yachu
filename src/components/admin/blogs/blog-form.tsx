"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { blogFormSchema, BlogFormValues } from "@/schemas/blog.schemas";
import {
  useCreateBlog,
  useUpdateBlog,
  useBlogCategories,
  useBlogTags,
  useAuthors,
  useCreateTag,
} from "@/hooks/use-blogs";
import { TBlog, CreateBlogData, UpdateBlogData, TTag } from "@/types/blog";

import { TitleField } from "./form-fields/title-field";
import { ContentField } from "./form-fields/content-field";
import { ReadingDurationField } from "./form-fields/reading-duration";
import { ThumbnailImageField } from "./form-fields/thumbnail-image-field";
import { AltDescriptionField } from "./form-fields/alt-description";
import { CategorySelector } from "./form-fields/category-selector";
import { AuthorSelector } from "./form-fields/author-selector";
import { TagSelector } from "./form-fields/tag-selector";

interface BlogFormProps {
  mode: "create" | "edit";
  initialData?: TBlog;
}

export function BlogForm({ mode, initialData }: BlogFormProps) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { data: categories, isLoading: categoriesLoading } =
    useBlogCategories();
  const { data: tags, isLoading: tagsLoading } = useBlogTags();
  const { data: authors, isLoading: authorsLoading } = useAuthors();

  const createBlogMutation = useCreateBlog();
  const updateBlogMutation = useUpdateBlog();
  const createTagMutation = useCreateTag();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      blog_content: "",
      blog_duration_to_read: "",
      thumbnail_image: null,
      thumbnail_image_alt_description: "",
      category: "",
      author: 0,
      tags: [],
      is_published: false,
    },
  });

  // Set initial data for edit mode
  useEffect(() => {
    if (mode === "edit" && initialData && categories && tags && authors) {
      const categoryName =
        typeof initialData.category === "object"
          ? initialData.category.category_name
          : initialData.category;

      const authorId =
        typeof initialData.author === "object"
          ? initialData.author.id
          : initialData.author;

      const tagIds = Array.isArray(initialData.tags)
        ? initialData.tags.map((tag) =>
            typeof tag === "object" ? tag.id : tag
          )
        : [];

      form.reset({
        title: initialData.title || "",
        blog_content: initialData.blog_content || "",
        blog_duration_to_read: initialData.blog_duration_to_read || "",
        thumbnail_image: initialData.thumbnail_image || null,
        thumbnail_image_alt_description:
          initialData.thumbnail_image_alt_description || "",
        category: categoryName || "",
        author: authorId || 0,
        tags: tagIds,
        is_published: initialData.is_published || false,
      });

      if (initialData.thumbnail_image) {
        const imageUrl = initialData.thumbnail_image.startsWith("http")
          ? initialData.thumbnail_image
          : `${process.env.NEXT_PUBLIC_API_URL || ""}${
              initialData.thumbnail_image
            }`;
        setImagePreview(imageUrl);
      }

      setDataLoaded(true);
    } else if (mode === "create") {
      setDataLoaded(true);
    }
  }, [mode, initialData, form, categories, tags, authors]);

  // Handle tag creation
  const handleCreateTag = async (tagName: string): Promise<TTag> => {
    try {
      const newTag = await createTagMutation.mutateAsync({ tag_name: tagName });

      // Automatically select the newly created tag
      const currentTags = form.getValues("tags") || [];
      form.setValue("tags", [...currentTags, newTag.id], {
        shouldValidate: true,
      });

      return newTag;
    } catch (error) {
      console.error("Failed to create tag:", error);
      throw error;
    }
  };

  // Updated handleImageChange method for BlogForm component
  const handleImageChange = (file: File | null) => {
    if (file) {
      // Validate file before processing
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Please select a valid image file (PNG, JPG, JPEG, or WEBP)"
        );
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.onerror = () => {
        toast.error("Failed to read the image file");
      };
      reader.readAsDataURL(file);

      // Set the actual File object, not the data URL
      form.setValue("thumbnail_image", file, { shouldValidate: true });
    } else {
      setImagePreview(null);
      form.setValue("thumbnail_image", null, { shouldValidate: true });
    }
  };

  // Updated transformFormDataToApiData method
  const transformFormDataToApiData = (
    values: BlogFormValues
  ): CreateBlogData | UpdateBlogData => {
    return {
      title: values.title,
      blog_content: values.blog_content,
      blog_duration_to_read: values.blog_duration_to_read,
      thumbnail_image: values.thumbnail_image, // Keep as File object or null
      thumbnail_image_alt_description: values.thumbnail_image_alt_description,
      category: values.category,
      author: values.author,
      tags: values.tags,
      is_published: values.is_published ?? false,
    };
  };

  const onSubmit = async (values: BlogFormValues) => {
    try {
      const transformedData = transformFormDataToApiData(values);

      if (mode === "create") {
        await createBlogMutation.mutateAsync({
          blogData: transformedData as CreateBlogData,
        });
        toast.success("Blog post created successfully!");
        router.push("/admin/blogs");
      } else if (mode === "edit" && initialData) {
        await updateBlogMutation.mutateAsync({
          slug: initialData.slug,
          blogData: transformedData as UpdateBlogData,
        });
        toast.success("Blog post updated successfully!");
        router.push("/admin/blogs");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        `Failed to ${
          mode === "create" ? "create" : "update"
        } blog post. Please try again.`
      );
    }
  };

  const isLoading = categoriesLoading || tagsLoading || authorsLoading;
  const isSubmitting =
    createBlogMutation.isPending || updateBlogMutation.isPending;

  if (isLoading || !categories || !tags || !authors) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm text-muted-foreground">Loading form data...</p>
      </div>
    );
  }

  if (mode === "edit" && !dataLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm text-muted-foreground">Loading blog data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TitleField control={form.control} />
                  <ContentField control={form.control} />
                  <ReadingDurationField control={form.control} />
                </CardContent>
              </Card>

              {/* Thumbnail Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ThumbnailImageField
                    control={form.control}
                    imagePreview={imagePreview}
                    onImageChange={handleImageChange}
                  />
                  <AltDescriptionField control={form.control} />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AuthorSelector
                authors={authors}
                control={form.control}
                name="author"
                label="Author"
              />

              <CategorySelector
                categories={categories}
                control={form.control}
                name="category"
                label="Category"
              />

              <TagSelector
                tags={tags || []}
                control={form.control}
                name="tags"
                label="Tags"
                onCreateTag={handleCreateTag}
              />

              <div className="flex space-x-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {mode === "create" ? "Create Post" : "Update Post"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
