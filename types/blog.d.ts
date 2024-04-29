export type TBlog = {
  slug: string;
  title: string;
  thumbnail_image: string;
  blog_content: string;
  category: {
    category_name: string;
    category_image: string;
  };
  author: {
    name: string;
    role: string;
    phone: string;
    picture: string;
  };
};
