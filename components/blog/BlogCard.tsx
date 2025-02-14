import { TBlog } from "@/types/blog";
import { BASE_API_URL, BASE_URL } from "@/utils/config";
import { Routes } from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  blog: TBlog;
};
const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const {
    title,
    slug,
    thumbnail_image,
    blog_content,
    category: { category_image, category_name },
    author: { name, picture, role },
  } = blog;

  return (
    <Link href={`/blog/${slug}`} passHref>
      <div className="relative overflow-hidden transition-all duration-200 border rounded-lg group border-neutral hover:bg-dark-gray shadow-md hover:shadow-lg">
        <div className="relative">
          <div className="overflow-hidden aspect-w-4 aspect-h-3 sm:aspect-h-2 md:aspect-w-4 md:aspect-h-3">
            <Image
              height={200}
              width={400}
              className="object-cover w-full h-40 transition-all duration-300 transform group-hover:scale-110"
              src={BASE_URL + thumbnail_image}
              alt={title}
            />
          </div>
        </div>

        <div className="px-4 py-6 sm:px-6 sm:py-8">
          <h3 className="font-sans text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-sm sm:text-base font-medium text-opacity-50 text-gray-700">
            {name}
          </p>
          <div className="mt-4 sm:mt-6">
            <a
              href="#"
              title="Read More"
              className="inline-flex items-center text-amber-700 text-sm font-medium group"
            >
              Read More
              <svg
                className="w-5 h-5 ml-2 transition-all duration-200 transform group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default BlogCard;
