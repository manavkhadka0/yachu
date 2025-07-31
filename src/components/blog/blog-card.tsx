import { TBlog } from "@/types/blog";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getImageUrl } from "@/utils/image";

interface BlogCardProps {
  blog: TBlog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  const {
    title,
    slug,
    thumbnail_image,
    author: { name, picture },
  } = blog;

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
        <div className="relative w-full h-full">
          <img
            src={getImageUrl(thumbnail_image)}
            alt={title}
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="line-clamp-2 mb-3 text-lg font-semibold">{title}</h3>

          <div className="mt-auto border-t pt-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={picture} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="line-clamp-1 text-sm text-muted-foreground">
                {name}
              </p>
            </div>

            <Button
              variant="link"
              className="group-read-more mt-4 h-auto p-0 text-primary hover:text-primary/80"
            >
              Read More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};
