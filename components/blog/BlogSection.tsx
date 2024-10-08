import { TBlog } from "@/types/blog";
import BlogCard from "./BlogCard";
import { Button } from "../ui/button";
import { BASE_API_URL } from "@/utils/config";

const getBlogs = async () => {
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

const BlogSection = async () => {
  let data: TBlog[] = await getBlogs();
  if (!data) {
    return;
  }
  return (
    <section className="container py-12 sm:py-16 lg:py-20" id="blogsection">
      <div className="flex flex-col justify-center items-center">
        <h2 className="tracking-tighter text-gray-800">
          <span className=" text-2xl font-bold sm:text-2xl md:text-3xl">
            {" "}
            LATEST BLOGS{" "}
          </span>
        </h2>
        <p className=" mt-3 font-sans text-lg text-opacity-50 text-gray-800">
          Read our latest blogs about your hair growth, hair care, and hair
          loss.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 px-16 mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:mt-16">
        {data.map((item, index) => (
          <BlogCard blog={item} key={index}></BlogCard>
        ))}
      </div>
    </section>
  );
};
export default BlogSection;
