import { TBlog } from "@/types/blog";
import BlogCard from "./BlogCard";
import { Button } from "../ui/button";

const BLOGS: TBlog[] = [
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "Sept 20, 2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non sapien ac arcu laoreet luctus ac vitae tortor.   ",
    image: "/banner.jpg",
    href: "",
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "Sept 20, 2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non sapien ac arcu laoreet luctus ac vitae tortor.  ",
    image: "/banner.jpg",
    href: "",
  },
];

const BlogSection = () => {
  return (
    <div className=" ">
      <div className="container p-10 ">
        <div className="flex justify-between gap-4 items-center  mb-8 ">
          <h3 className="sm:text-2xl font-bold  uppercase">Blogs</h3>
          <Button variant={"outline"} className="sm:text-lg" size={"lg"}>
            View all
          </Button>
        </div>
        <div className="max-auto grid grid-cols-2 gap-10 ">
          {BLOGS.map((blog, index) => (
            <BlogCard blog={blog} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default BlogSection;
