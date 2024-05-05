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
    <section
      className="container py-12 sm:py-16 lg:py-20"
      id="blogsection"
    >
      <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
        <div className="text-center">
          <h2 className="tracking-tighter text-gray-800">
            <span className="font-sans text-4xl font-normal sm:text-5xl md:text-6xl">
              {" "}
              Course{" "}
            </span>
            <span className="font-serif text-5xl italic sm:text-6xl md:text-7xl">
              {" "}
              content{" "}
            </span>
          </h2>
          <p className="max-w-md mx-auto mt-6 font-sans text-lg text-opacity-50 text-gray-800">
            Ac phasellus nunc urna, nec. Cursus tristique vitae porttitor arcu
            libero amet.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:mt-16">

      {data.map((item, index) => (
        <BlogCard blog={item} key={index}></BlogCard>
      ))}
      </div>
    </section>
  );
};
export default BlogSection;
