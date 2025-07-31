import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface BlogDetailsErrorProps {
  error: Error;
  retry: () => void;
}

const BlogDetailsError = ({ error, retry }: BlogDetailsErrorProps) => (
  <div className="flex flex-col items-center justify-center py-24">
    <Alert variant="destructive" className="max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-center">
        <h2 className="text-lg font-semibold mb-2">Failed to load blog</h2>
        <p className="mb-4">{error.message}</p>
        <Button onClick={retry} variant="outline" className="mt-2">
          Try Again
        </Button>
      </AlertDescription>
    </Alert>
  </div>
);

export default BlogDetailsError;