import { z } from "zod";

export const blogFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  blog_content: z
    .string()
    .min(1, "Content is required")
    .min(50, "Content must be at least 50 characters"),
  blog_duration_to_read: z.string().min(1, "Reading duration is required"),
  thumbnail_image: z
    .union([
      z.instanceof(File),
      z.string().min(1, "Image is required"),
      z.null(),
    ])
    .optional()
    .refine(
      (value) => {
        // If it's a string, validate it's a reasonable URL or path
        if (typeof value === "string") {
          return (
            value.length > 0 &&
            (value.startsWith("http") ||
              value.startsWith("/") ||
              value.startsWith("data:") ||
              value.includes("."))
          );
        }
        return true;
      },
      {
        message: "Invalid image URL or file path",
      }
    ),
  thumbnail_image_alt_description: z
    .string()
    .min(1, "Alt description is required")
    .max(150, "Alt description must be less than 150 characters"),
  category: z.string().min(1, "Category is required"),
  author: z.number().min(1, "Author is required"),
  tags: z.array(z.number()).min(1, "At least one tag is required"),
  is_published: z.boolean(),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;
