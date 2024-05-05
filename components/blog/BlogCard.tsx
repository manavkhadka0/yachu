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
    <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
      <div className="overflow-hidden bg-slate-100 rounded-md hover:shadow-xl">
        <div className="p-5">
          <div className="relative">
            <a href={Routes.blog.detail(slug)} title="" className="block aspect-w-4 aspect-h-3">
              <Image height={300} width={300} className='' src={BASE_URL + thumbnail_image} alt={""}>

              </Image>
            </a>

            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-[#B45309] rounded-full">
                {" "}
                {category_name}
              </span>
            </div>

          </div>

          <p className="mt-5 text-2xl font-semibold">
            <a href={Routes.blog.detail(slug)} title="" className="text-black">
              {" "}
              {title}{" "}
            </a>
          </p>
          <div className="flex justify-start items-center mt-6  gap-5">
            <Image
              height={50}
              width={50}
              src={BASE_URL + picture}
              alt="image"
              className="justify-center border-2 border-amber-600 bg-slate-400 rounded-full object-fill overflow-hidden">
            </Image>
            <div className="flex flex-col ">
              <p className=" text-lg font-semibold text-gray-500">
                {name}
              </p>
              <p className=" text-base text-gray-500">
                {role}
              </p>
            </div>
          </div>
          <a
            href={Routes.blog.detail(slug)}
            title=""
            className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-amber-600 transition-all duration-200 border-b-2 border-transparent hover:border-amber-600 focus:border-amber-600"
          >
            Continue Reading
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
