"use client";

import Image from "next/image";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, AlertCircle } from "lucide-react";

export const About = () => {
  const { data: siteConfig, isLoading, error } = useSiteSettings();

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-background to-secondary/20">
        <section className="relative overflow-hidden">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 xl:gap-x-24 items-center py-24 lg:py-32">
              <div className="lg:order-2 relative">
                <Skeleton className="w-full h-96 rounded-2xl" />
              </div>
              <div className="lg:order-1 relative space-y-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-background to-secondary/20 py-24">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load site configuration. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!siteConfig) return null;

  const { our_story, about_founder, message_from_ceo } = siteConfig;

  return (
    <div className="bg-gradient-to-b from-background to-secondary/20">
      {/* Our Story Section */}
      <section className="relative overflow-hidden">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 xl:gap-x-24 items-center py-24 lg:py-32">
            <div className="lg:order-2 relative">
              <div className="relative">
                <Image
                  className="w-full h-auto rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
                  src="/1024.png"
                  alt="yachu hair oil product image"
                  width={600}
                  height={600}
                  priority
                />
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="lg:order-1 relative">
              <div className="space-y-8">
                <div>
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 hover:bg-secondary/80"
                  >
                    Wanna know us better?
                  </Badge>
                  <h2 className="mt-6 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                    Our Story
                  </h2>
                </div>
                <div className="prose prose-lg text-muted-foreground max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: our_story }}></div>
                </div>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Contact us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Founder & Message Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-16">
            <div className="relative order-2 lg:order-1">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-foreground sm:text-4xl">
                    About Founder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg text-muted-foreground">
                    <div
                      dangerouslySetInnerHTML={{ __html: about_founder }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
              <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-primary/10 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative">
                <Card className="bg-primary border-0 text-primary-foreground">
                  <CardContent className="p-8 lg:p-12">
                    <div className="flex items-start space-x-4">
                      <span className="text-4xl">👋</span>
                      <blockquote className="flex-1">
                        <div
                          className="text-lg font-medium leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: message_from_ceo }}
                        />
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
