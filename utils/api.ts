"use server";

import { BASE_API_URL } from "./config";

export const getBlogs = async () => {
  try {
    const blogs = await fetch(BASE_API_URL + "/latest-posts", {
      next: { revalidate: 10 },
    });
    const data = await blogs.json();
    return data.recent_posts;
  } catch (error) {
    console.error("Error fetching Blogs", error);
    console.log(error);
  }
};
