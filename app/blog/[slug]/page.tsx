import React from 'react'
import BlogSection from '@/components/blog/BlogSection';
import BlogCard from '@/components/blog/BlogCard';
import { TBlog } from '@/types/blog';
import { BASE_API_URL, BASE_URL } from '@/utils/config';
import Image from 'next/image';



const getBlogBySlug:any = async (slug: string) => {
    try {
        const res = await fetch(`${BASE_API_URL}/post-single/${slug}`);
        const data = await res.json();
        return data.data;
    }
    catch (error) {
        console.log(error);
    }
}


const BlogDetails = async ({ params }: { params: { slug: string } }) => {

    const blog = await getBlogBySlug(params.slug);


    const { title, slug, thumbnail_image, blog_content, category: { category_image, category_name }, author: { name, picture, role } } = blog;

    return (
        <section className="py-12 bg-white sm:py-16 lg:py-20">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-5xl mx-auto">
                    <div className="w-full">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{title}</h1>
                        <p className="mt-6 text-base font-medium text-gray-500">November 22, 2021</p>
                    </div>

                      
                        <div className="mt-12 sm:mt-16 lg:gap-x-16 xl:gap-x-24">
                     

                        <article
                            className="mt-12 prose lg:mt-0 lg:prose-lg lg:col-span-8 prose-blockquote:lg:text-xl prose-blockquote:lg:leading-9 prose-blockquote:not-italic prose-blockquote:border-none prose-blockquote:text-lg prose-blockquote:leading-8 prose-blockquote:p-0 prose-blockquote:lg:p-0 prose-blockquote:font-medium prose-blockquote:text-gray-900"
                        >
                            <h2 className='font-semibold text-gray-800'>What is growth hack?</h2>
                            
                            <p className='' dangerouslySetInnerHTML={{__html:blog_content}}></p>

                          
                            <Image height={500} width={500} src={BASE_URL + thumbnail_image} alt='image' className=''/>


                            <h2 className='font-semibold text-gray-800'>How to start growing business?</h2>
                            <p dangerouslySetInnerHTML={{ __html: blog_content }}></p>

                            <blockquote className="flex items-start">
                                <svg className="w-8 h-8 mt-6 text-gray-300 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M3.691 6.292C5.094 4.771 7.217 4 10 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 0 0 6.925 10H10a1 1 0 0 1 1 1v7c0 1.103-.897 2-2 2H3a1 1 0 0 1-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789zM20 20h-6a1 1 0 0 1-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789C16.094 4.771 18.217 4 21 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 0 0 17.925 10H21a1 1 0 0 1 1 1v7c0 1.103-.897 2-2 2z"
                                    ></path>
                                </svg>
                              
                            </blockquote>

                            <p dangerouslySetInnerHTML={{ __html: blog_content }}></p>


                            {/* <h3>Follow the list below:</h3>
                            <ol>
                                <li>Id pellentesque ut pellentesque varius amet mauris.</li>
                                <li>Tempor, risus, congue gravida nulla tincidunt.</li>
                                <li>Tincidunt magnis eu, vitae dictumst.</li>
                                <li>Aenean dictumst risus posuere a at id fermentum nibh.</li>
                            </ol>

                            <p>Tempor, risus, congue gravida nulla tincidunt nec diam. Tincidunt magnis eu, vitae dictumst commodo dolor in. Aenean dictumst risus posuere a at id fermentum nibh. Luctus nunc bibendum duis egestas.</p> */}
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogDetails