import { TBlog } from "@/types/blog";
import BlogCard from "./BlogCard";
import { Button } from "../ui/button";
import { BASE_API_URL } from "@/utils/config";

const getBlogs = async () => {
  try {
    const blogs = await fetch(BASE_API_URL + '/latest-posts', { next: { revalidate: 10 } })
    const data = await blogs.json();
    return data.recent_posts;

  }
  catch (error) {
    console.error("Error fetching Blogs", error)
    console.log(error);
  }
}

const BlogSection = async () => {

  let data: TBlog[] = await getBlogs();
  console.log(data);
  if (!data) {
    return
  }
  return (
    <section className="container pb-24" id="blogsection">
      <div className="flex flex-col md:flex-row justify-center items-center mb-8">
        <div className="mx-auto">
          <h3 className="sm:text-2xl md:pl-40 font-bold text-center uppercase">
            Blogs
          </h3>
        </div>
        <div className="">
          <Button
            variant={"outline"}
            className=" h-7 sm:h-9 w-auto mt-3 md:mt-0 sm:text-lg border-2 border-amber-600 hover:bg-amber-600 hover:text-white  hover:ring-0 focus:ring-0"
            size={"lg"}
          >
            View all
          </Button>
        </div>
      </div>
      {data.map((item, index) => (
        <BlogCard blog={item} key={index}></BlogCard>

      ))}
    </section>
  );
};
export default BlogSection;
