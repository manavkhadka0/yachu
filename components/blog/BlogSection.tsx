import { BlogType, TBlog } from "@/types/blog";
import BlogCard from "./BlogCard";
import { Button } from "../ui/button";
import { BASE_URL } from "@/utils/config";
import { BLOGS } from "@/constants/blog";
import { error } from "console";

const getBlogs = async () => {
  try {
    const blogs = await fetch(BASE_URL + '/latest-posts', { next: { revalidate: 10 } })
    return blogs.json()
  }
  catch (error) {
    console.error("Error fetching Blogs", error)
    console.log(error);
  }
}

const BlogSection = async () => {
  let blogdata: BlogType = await getBlogs();
  if (BLOGS.length === 0) {
    console.log(error);
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

      {/* {blogdata.map((item, index) => ( */}

        <div className="grid max-w-md grid-cols-1 gap-6 pl-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
          <div className="overflow-hidden bg-white rounded shadow">
            <div className="p-5">
              <div className="relative">
                <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                  {/* {item.thumbnail_image} */}
                </a>

                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-[#B45309] rounded-full">
                    {" "}
                    Lifestyle{" "}
                  </span>
                </div>


              </div>


              {/* <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase">
                {" "}
                {item.date}{" "}
              </span> */}
              
              <p className="mt-5 text-2xl font-semibold">
                <a href="#" title="" className="text-black">
                  {" "}
                  {/* {item.title}{" "} */}
                </a>
              </p>
              
              <p className="mt-4 text-base text-gray-600">
                {/* {item.blog_content} */}
              </p>
              <a
                href="#"
                title=""
                className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-[#B45309] transition-all duration-200 border-b-2 border-transparent hover:border-[#B45309] focus:border-[#B45309]"
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
       {/* ))}  */}

    </section>
  );
};
export default BlogSection;
