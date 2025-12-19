import React from "react";
import { ShoppingBag } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery }) => {
  const message = searchQuery
    ? `No instant orders found matching "${searchQuery}".`
    : "No instant orders have been placed yet.";

  return (
    <div className="p-8 text-center bg-white rounded-lg shadow">
      <ShoppingBag className="w-12 h-12 mx-auto text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">
        No Instant Orders Found
      </h3>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;



