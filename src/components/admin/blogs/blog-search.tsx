"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { TCategory } from "@/types/blog";

interface BlogSearchProps {
  searchValue?: string;
  onSearch: (term: string) => void;
  onFilter: (filters: { category: string }) => void;
  categories: TCategory[];
  placeholder?: string;
}

export function BlogSearch({
  searchValue = "",
  onSearch,
  onFilter,
  categories,
  placeholder = "Search blogs...",
}: BlogSearchProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          className="h-11 rounded-xl pl-10 pr-4 text-sm bg-card border-border shadow-none focus-visible:ring-primary/20"
        />
      </div>
      <Select onValueChange={(value) => onFilter({ category: value })}>
        <SelectTrigger className="h-11 w-full sm:w-52 rounded-xl bg-card border-border shadow-none">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent className="shadow-none border-border">
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.category_name} value={category.category_name}>
              {category.category_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
