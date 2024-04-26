import { TBlog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  blog: TBlog;
};

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { title, slug, thumbnail_image, blog_content, href } = blog;
  return (
    <div className="bg-white flex flex-col  lg:grid lg:grid-cols-5 grid-cols-1  gap-4 p-6 border shadow-lg rounded-lg ">
      <Link href={href} className=" block w-full overflow-hidden  col-span-2">
        <Image
          src={thumbnail_image}
          alt="blog"
          height={300}
          width={700}
          className=" w-full h-full  transition hover:scale-105  object-cover"
        />
      </Link>
      <div className="flex flex-col gap-2 col-span-3">
        <Link
          href={href}
          className="text-lg font-bold hover:text-amber-600 transition"
        >
          {title}
        </Link>
        <p>{blog_content}</p>
      </div>
    </div>
  );
};
export default BlogCard;
