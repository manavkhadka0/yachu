import React from "react";
import {
  CheckCircle,
  Clock,
  RefreshCw,
  Truck,
  XCircle,
  Package,
} from "lucide-react";


export const formatCurrency = (amount) => {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(numericAmount);
};

export const formatDate = (dateString, includeTime = false) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = includeTime
      ? {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }
      : {
          year: "numeric",
          month: "short",
          day: "numeric",
        };
    return date.toLocaleDateString("en-US", options);
  } catch {
    return "Invalid Date";
  }
};

export const getStatusIcon = (status) => {
  const icons = {
    Delivered: <CheckCircle className="w-4 h-4" />,
    Pending: <Clock className="w-4 h-4" />,

    Processing: <RefreshCw className="w-4 h-4" />,
    Shipped: <Truck className="w-4 h-4" />,
    Cancelled: <XCircle className="w-4 h-4" />,
  };
  return status ? icons[status] : <Package className="w-4 h-4" />;
};

export const getStatusColor = (status) => {
  const colors = {
    Delivered: "bg-green-100 text-green-800 border-green-200",
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Processing: "bg-blue-100 text-blue-800 border-blue-200",
    Shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
    Cancelled: "bg-red-100 text-red-800 border-red-200",
  };
  return status ? colors[status] || "bg-gray-100 text-gray-800 border-gray-200" : "bg-gray-100 text-gray-800 border-gray-200";
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/images/placeholder.png";

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If it's a relative path, construct the full URL
  return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
};
