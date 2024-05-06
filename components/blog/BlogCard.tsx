import { TBlog } from "@/types/blog";
import { BASE_API_URL, BASE_URL } from "@/utils/config";
import { Routes } from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  blog: TBlog;
};
const BlogCard: React.FC<BlogCardProps> = ({blog}) => {
  const { title, slug, thumbnail_image, blog_content, category: { category_image, category_name }, author: { name, picture, role } } = blog;
  return (
    <Link href={Routes.blog.detail(slug)} passHref>

    <div className="relative overflow-auto transition-all duration-200 border rounded-lg group border-neutral hover:bg-dark-gray">
    <div className="relative">
        <div className="overflow-hidden aspect-w-4 aspect-h-2">
            <Image height={200} width={200} className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-125" src={BASE_URL +thumbnail_image} alt="" />
        </div>
    </div>

    <div className="px-5 py-6">
        <h3 className="font-sans text-base font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 font-sans text-sm font-medium text-opacity-50 text-black">{name}</p>
        <div className="mt-6">
            <a href="#" title="" className="inline-flex items-center text-amber-700 text-sm font-medium group">
                Read More
                <svg className="w-5 h-5 ml-2 transition-all duration-200 transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
                <span className="absolute inset-0" aria-hidden="true"></span>
            </a>
        </div>
    </div>
</div>
    </Link>
  );
};
export default BlogCard;
