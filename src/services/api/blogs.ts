import {
  TBlog,
  PaginatedBlogResponse,
  CreateBlogData,
  UpdateBlogData,
  BlogFilters,
  TCategory,
  TTag,
  TAuthor,
} from "@/types/blog";
import { BASE_API_URL } from "@/utils/config";
import { franchise } from "@/constants/constant";

class BlogAPI {
  private toFormData(
    data: CreateBlogData | UpdateBlogData,
    isUpdate = false
  ): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      if (key === "tags" && Array.isArray(value)) {
        // Append each tag individually
        value.forEach((tagId) => formData.append("tags", tagId.toString()));
      } else if (key === "thumbnail_image") {
        if (value instanceof File) {
          // New file uploaded
          formData.append("thumbnail_image", value, value.name);
        } else if (typeof value === "string" && isUpdate) {
          // Existing image URL - don't append to FormData for updates
          // The backend should keep the existing image if no new file is provided
          console.log("Keeping existing image:", value);
        }
      } else if (value instanceof File) {
        // Handle other file types
        formData.append(key, value, value.name);
      } else if (typeof value === "boolean") {
        // Handle boolean values
        formData.append(key, value.toString());
      } else if (typeof value !== "object") {
        formData.append(key, value.toString());
      }
    });

    if (franchise) {
      formData.append("franchise", franchise);
    }

    // Debug: Log FormData contents
    console.log("FormData contents:");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(
          `${key}: File(${value.name}, ${value.size} bytes, ${value.type})`
        );
      } else {
        console.log(`${key}:`, value);
      }
    }

    return formData;
  }

  async getBlogs(filters: BlogFilters): Promise<PaginatedBlogResponse> {
    const url = new URL(`${BASE_API_URL}/posts/`);
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });

    if (franchise) {
      url.searchParams.append("franchise", franchise);
    }

    const response = await fetch(url.toString(), {
      next: { revalidate: 10 },
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch blogs");
    }

    return response.json();
  }

  async getBlogBySlug(slug: string): Promise<TBlog> {
    const response = await fetch(`${BASE_API_URL}/post-single/${slug}/`, {
      next: { revalidate: 10 },
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Failed to fetch blog: ${slug}`);
    }
    const result = await response.json();
    return result.data;
  }

  async createBlog(blogData: CreateBlogData): Promise<TBlog> {
    const formData = this.toFormData(blogData, false);

    const response = await fetch(`${BASE_API_URL}/posts/create/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { detail: errorText };
      }
      console.error("Create blog error:", errorData);
      throw new Error(errorData.detail || "Failed to create blog");
    }
    return response.json();
  }

  async updateBlog(slug: string, blogData: UpdateBlogData): Promise<TBlog> {
    const formData = this.toFormData(blogData, true);

    const response = await fetch(`${BASE_API_URL}/posts/${slug}/`, {
      method: "PATCH",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { detail: errorText };
      }
      console.error("Update blog error:", errorData);
      throw new Error(errorData.detail || "Failed to update blog");
    }
    return response.json();
  }

  async deleteBlog(slug: string): Promise<void> {
    const response = await fetch(`${BASE_API_URL}/posts/${slug}/`, {
      method: "DELETE",
    });

    if (!response.ok && response.status !== 204) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to delete blog");
    }
  }

  async getBlogCategories(): Promise<TCategory[]> {
    const response = await fetch(`${BASE_API_URL}/categories/`);
    if (!response.ok) throw new Error("Failed to fetch blog categories");
    const data = await response.json();
    return data;
  }

  async getBlogTags(): Promise<TTag[]> {
    const response = await fetch(`${BASE_API_URL}/tags/`);
    if (!response.ok) throw new Error("Failed to fetch blog tags");
    const data = await response.json();
    return data;
  }

  async getAuthors(): Promise<TAuthor[]> {
    const url = new URL(`${BASE_API_URL}/authors/`);
    if (franchise) {
      url.searchParams.append("franchise", franchise);
    }
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Failed to fetch authors");
    const data = await response.json();
    return data;
  }

  async createTag(tagName: string): Promise<TTag> {
    const response = await fetch(`${BASE_API_URL}/tags/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tag_name: tagName,
        ...(franchise && { franchise }),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to create tag");
    }
    return response.json();
  }
}

export const blogAPI = new BlogAPI();
