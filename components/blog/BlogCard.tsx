import { TBlog } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  blog: TBlog;
};

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { title, date, image, description, href } = blog;
  return (
    <div className="bg-white flex flex-col gap-4 lg:grid lg:grid-cols-5 grid-cols-1  gap-4 p-6 border border-amber-600 rounded-lg ">
      <Link href={href} className=" block w-full overflow-hidden  col-span-2">
        <Image
          src={image}
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
        <p className="text-xs text-gray-500 font-semibold">{date}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default BlogCard;
