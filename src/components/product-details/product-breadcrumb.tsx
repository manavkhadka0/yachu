import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProductBreadcrumb = () => (
  <nav className="mb-8">
    <ol className="flex items-center space-x-2">
      <li>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/products" className="flex items-center text-sm font-medium">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </li>
    </ol>
  </nav>
);