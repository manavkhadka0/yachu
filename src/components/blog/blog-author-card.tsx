import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, User } from "lucide-react";

interface BlogAuthorCardProps {
  updatedAt: string;
}

const BlogAuthorCard = ({ updatedAt }: BlogAuthorCardProps) => {
  const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/yachu.jpg" alt="Yachu Hair Oil" />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">Yachu Hair Oil</h3>
              <p className="text-sm text-muted-foreground">Posted {formattedDate}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />5 min read
            </div>
            <Badge variant="outline">Blog</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogAuthorCard;