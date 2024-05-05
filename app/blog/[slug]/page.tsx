import React from 'react'
import BlogSection from '@/components/blog/BlogSection';
import BlogCard from '@/components/blog/BlogCard';
import { TBlog } from '@/types/blog';
import { BASE_API_URL, BASE_URL } from '@/utils/config';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import FlowerDivider from '@/components/shared/FlowerDivider';



const getBlogBySlug: any = async (slug: string) => {
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


    const { title, slug, thumbnail_image, blog_content, updated_at, category: { category_image, category_name }, author: { name, picture, role } } = blog;

    return (
        <><section className="py-12 px-3 sm:px-20 xl:px-72  bg-white sm:py-16 lg:py-10">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-5xl mx-auto">
                    {/* NAV */}
                    <div className='flex mb-10 text-xs'>
                        <ul className="flex align-items-center p-0 m-0 pt-4 ">
                            <li className="mx-1 hover:underline">
                                <a href="/">Home</a>
                            </li>
                            <span>
                                <svg className="svg minearr size-4" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z" fill="#869099"></path></svg>
                            </span>
                            <li className="mx-1 hover:underline">
                                <a href="/#blogsection">Blogs</a>
                            </li>
                            <span>
                                <svg className="svg minearr size-4" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z" fill="#869099"></path></svg>
                            </span>
                            <li className="mx-1 text-dark hover:underline ">
                                <a href="#">{title}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Button */}
                    <Button
                        variant={"ghost"}
                        className=" h-7 sm:h-9 mb-10 w-auto mt-3 md:mt-0 sm:text-lg font-bold hover:border-2 hover:border-amber-600 bg-amber-600  text-white outline:none"
                        size={"lg"}
                    >
                        {category_name}
                    </Button>




                    <div className="w-full">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">{title}</h1>
                        {/* Owner*/}
                        <section className="flex flex-row items-center m-8">
                            <div className="flex flex-row">
                                <Image width={40} height={40} className="object-cover border-none rounded-full bg-slate-400 " src={BASE_URL + picture} alt="blog-author" />
                            </div>
                            <div className="flex flex-grow-1 md:gap-96  ps-3">
                                <div className=" flex flex-col  ">
                                    <div className="fw-bold">Yachu Hair Oil</div>
                                    <div className="text-gray-400">Posted {updated_at.split("T")[0]}</div>
                                </div>
                                <div className="hidden md:block text-gray-400 text-start col-sm-12 col-md-3">
                                    <div className="">Blog</div>
                                    <div>5 min read</div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* SOCIALS */}
                    <div className=" flex flex-row my-4  items-center gap-4">
                        <p className="font-bold text-gray-400 ps-2">Share</p>
                        <div className="flex items-baseline">
                            <div className="flex flex-row gap-2 gap-md-3 flex-wrap">
                                <div title="Share With Facebook">
                                    <button aria-label="facebook" className="bg-none border-none p-0 cursor-pointer outline:none "><svg viewBox="0 0 64 64" width="38" height="38"><circle cx="32" cy="32" r="31" fill="#3b5998"></circle><path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z" fill="white"></path></svg></button></div><div title="Share With Twitter">
                                    <button aria-label="twitter" className="bg-none border-none p-0 cursor-pointer outline:none "><svg viewBox="0 0 64 64" width="38" height="38"><circle cx="32" cy="32" r="31" fill="#000000"></circle><path d="M 41.116 18.375 h 4.962 l -10.8405 12.39 l 12.753 16.86 H 38.005 l -7.821 -10.2255 L 21.235 47.625 H 16.27 l 11.595 -13.2525 L 15.631 18.375 H 25.87 l 7.0695 9.3465 z m -1.7415 26.28 h 2.7495 L 24.376 21.189 H 21.4255 z" fill="white"></path></svg></button></div><div title="Share With Email">
                                    <button aria-label="email" className="bg-none border-none p-0 cursor-pointer outline:none ">
                                        <svg viewBox="0 0 64 64" width="38" height="38"><circle cx="32" cy="32" r="31" fill="#7f7f7f"></circle><path d="M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z" fill="white"></path></svg></button></div><div title="Share With Telegram">
                                    <button aria-label="telegram" className="bg-none border-none p-0 cursor-pointer outline:none ">
                                        <svg viewBox="0 0 64 64" width="38" height="38"><circle cx="32" cy="32" r="31" fill="#37aee2"></circle><path d="m45.90873,15.44335c-0.6901,-0.0281 -1.37668,0.14048 -1.96142,0.41265c-0.84989,0.32661 -8.63939,3.33986 -16.5237,6.39174c-3.9685,1.53296 -7.93349,3.06593 -10.98537,4.24067c-3.05012,1.1765 -5.34694,2.05098 -5.4681,2.09312c-0.80775,0.28096 -1.89996,0.63566 -2.82712,1.72788c-0.23354,0.27218 -0.46884,0.62161 -0.58825,1.10275c-0.11941,0.48114 -0.06673,1.09222 0.16682,1.5716c0.46533,0.96052 1.25376,1.35737 2.18443,1.71383c3.09051,0.99037 6.28638,1.93508 8.93263,2.8236c0.97632,3.44171 1.91401,6.89571 2.84116,10.34268c0.30554,0.69185 0.97105,0.94823 1.65764,0.95525l-0.00351,0.03512c0,0 0.53908,0.05268 1.06412,-0.07375c0.52679,-0.12292 1.18879,-0.42846 1.79109,-0.99212c0.662,-0.62161 2.45836,-2.38812 3.47683,-3.38552l7.6736,5.66477l0.06146,0.03512c0,0 0.84989,0.59703 2.09312,0.68132c0.62161,0.04214 1.4399,-0.07726 2.14229,-0.59176c0.70766,-0.51626 1.1765,-1.34683 1.396,-2.29506c0.65673,-2.86224 5.00979,-23.57745 5.75257,-27.00686l-0.02107,0.08077c0.51977,-1.93157 0.32837,-3.70159 -0.87096,-4.74991c-0.60054,-0.52152 -1.2924,-0.7498 -1.98425,-0.77965l0,0.00176zm-0.2072,3.29069c0.04741,0.0439 0.0439,0.0439 0.00351,0.04741c-0.01229,-0.00351 0.14048,0.2072 -0.15804,1.32576l-0.01229,0.04214l-0.00878,0.03863c-0.75858,3.50668 -5.15554,24.40802 -5.74203,26.96472c-0.08077,0.34417 -0.11414,0.31959 -0.09482,0.29852c-0.1756,-0.02634 -0.50045,-0.16506 -0.52679,-0.1756l-13.13468,-9.70175c4.4988,-4.33199 9.09945,-8.25307 13.744,-12.43229c0.8218,-0.41265 0.68483,-1.68573 -0.29852,-1.70681c-1.04305,0.24584 -1.92279,0.99564 -2.8798,1.47502c-5.49971,3.2626 -11.11882,6.13186 -16.55882,9.49279c-2.792,-0.97105 -5.57873,-1.77704 -8.15298,-2.57601c2.2336,-0.89555 4.00889,-1.55579 5.75608,-2.23009c3.05188,-1.1765 7.01687,-2.7042 10.98537,-4.24067c7.94051,-3.06944 15.92667,-6.16346 16.62028,-6.43037l0.05619,-0.02283l0.05268,-0.02283c0.19316,-0.0878 0.30378,-0.09658 0.35471,-0.10009c0,0 -0.01756,-0.05795 -0.00351,-0.04566l-0.00176,0zm-20.91715,22.0638l2.16687,1.60145c-0.93418,0.91311 -1.81743,1.77353 -2.45485,2.38812l0.28798,-3.98957" fill="white"></path></svg>
                                    </button></div>
                                <div title="Share With Whatsapp">
                                    <button aria-label="whatsapp" className="bg-none border-none p-0 cursor-pointer outline:none ">
                                        <svg viewBox="0 0 64 64" width="38" height="38"><circle cx="32" cy="32" r="31" fill="#25D366"></circle><path d="m42.32286,33.93287c-0.5178,-0.2589 -3.04726,-1.49644 -3.52105,-1.66732c-0.4712,-0.17346 -0.81554,-0.2589 -1.15987,0.2589c-0.34175,0.51004 -1.33075,1.66474 -1.63108,2.00648c-0.30032,0.33658 -0.60064,0.36247 -1.11327,0.12945c-0.5178,-0.2589 -2.17994,-0.80259 -4.14759,-2.56312c-1.53269,-1.37217 -2.56312,-3.05503 -2.86603,-3.57283c-0.30033,-0.5178 -0.03366,-0.80259 0.22524,-1.06149c0.23301,-0.23301 0.5178,-0.59547 0.7767,-0.90616c0.25372,-0.31068 0.33657,-0.5178 0.51262,-0.85437c0.17088,-0.36246 0.08544,-0.64725 -0.04402,-0.90615c-0.12945,-0.2589 -1.15987,-2.79613 -1.58964,-3.80584c-0.41424,-1.00971 -0.84142,-0.88027 -1.15987,-0.88027c-0.29773,-0.02588 -0.64208,-0.02588 -0.98382,-0.02588c-0.34693,0 -0.90616,0.12945 -1.37736,0.62136c-0.4712,0.5178 -1.80194,1.76053 -1.80194,4.27186c0,2.51134 1.84596,4.945 2.10227,5.30747c0.2589,0.33657 3.63497,5.51458 8.80262,7.74113c1.23237,0.5178 2.1903,0.82848 2.94111,1.08738c1.23237,0.38836 2.35599,0.33657 3.24402,0.20712c0.99159,-0.15534 3.04985,-1.24272 3.47963,-2.45956c0.44013,-1.21683 0.44013,-2.22654 0.31068,-2.45955c-0.12945,-0.23301 -0.46601,-0.36247 -0.98382,-0.59548m-9.40068,12.84407l-0.02589,0c-3.05503,0 -6.08417,-0.82849 -8.72495,-2.38189l-0.62136,-0.37023l-6.47252,1.68286l1.73463,-6.29129l-0.41424,-0.64725c-1.70875,-2.71846 -2.6149,-5.85116 -2.6149,-9.07706c0,-9.39809 7.68934,-17.06155 17.15993,-17.06155c4.58253,0 8.88029,1.78642 12.11655,5.02268c3.23625,3.21036 5.02267,7.50812 5.02267,12.06476c-0.0078,9.3981 -7.69712,17.06155 -17.14699,17.06155m14.58906,-31.58846c-3.93529,-3.80584 -9.1133,-5.95471 -14.62789,-5.95471c-11.36055,0 -20.60848,9.2065 -20.61625,20.52564c0,3.61684 0.94757,7.14565 2.75211,10.26282l-2.92557,10.63564l10.93337,-2.85309c3.0136,1.63108 6.4052,2.4958 9.85634,2.49839l0.01037,0c11.36574,0 20.61884,-9.2091 20.62403,-20.53082c0,-5.48093 -2.14111,-10.64081 -6.03239,-14.51915" fill="white"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LINE */}
                    <div className="mt-4 mb-5 border-t-2 border-gray-300"></div>

                    <div className="mt-8 sm:mt-4 lg:gap-x-16 xl:gap-x-24">


                        <article
                            className="mt-12 prose lg:mt-0 lg:prose-lg lg:col-span-8 prose-blockquote:lg:text-xl prose-blockquote:lg:leading-9 prose-blockquote:not-italic prose-blockquote:border-none prose-blockquote:text-lg prose-blockquote:leading-8 prose-blockquote:p-0 prose-blockquote:lg:p-0 prose-blockquote:font-medium prose-blockquote:text-gray-900"
                        >
                            <Image height={500} width={500} src={BASE_URL + thumbnail_image} alt='image' className='' />
                            <blockquote className="flex items-start">
                                <svg className="w-8 h-8 mt-6 text-gray-300 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M3.691 6.292C5.094 4.771 7.217 4 10 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 0 0 6.925 10H10a1 1 0 0 1 1 1v7c0 1.103-.897 2-2 2H3a1 1 0 0 1-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789zM20 20h-6a1 1 0 0 1-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789C16.094 4.771 18.217 4 21 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 0 0 17.925 10H21a1 1 0 0 1 1 1v7c0 1.103-.897 2-2 2z"
                                    ></path>
                                </svg>

                            </blockquote>
                            <p className='' dangerouslySetInnerHTML={{ __html: blog_content }}></p>




                        </article>
                    </div>
                </div>
            </div>
        </section>
        <FlowerDivider /><BlogSection /></>
    )
}

export default BlogDetails
