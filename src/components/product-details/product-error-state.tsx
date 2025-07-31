import Link from "next/link";
import { ArrowLeftIcon, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProductErrorStateProps {
  errorMessage?: string;
}

export const ProductErrorState = ({ errorMessage }: ProductErrorStateProps) => (
  <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
    <div className="flex items-center justify-center py-16 sm:py-24 lg:py-32">
      <Card className="max-w-md mx-4">
        <CardContent className="text-center p-8">
          <div className="mx-auto h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-4">
            Product not found
          </h1>
          <Alert className="mb-6">
            <AlertDescription>
              {errorMessage || "The product you're looking for doesn't exist."}
            </AlertDescription>
          </Alert>
          <Button asChild variant="outline">
            <Link href="/products" className="inline-flex items-center">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to products
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
);
