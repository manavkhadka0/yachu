"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  placeholder = "Search blogs..."
}: BlogSearchProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select onValueChange={(value) => onFilter({ category: value })}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
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