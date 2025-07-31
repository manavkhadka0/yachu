import React from "react";
import Link from "next/link";
import { Home, Package } from "lucide-react";
import FlowerDivider from "@/components/shared/FlowerDivider";

function NotFoundPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          {/* 404 Number with Hair Oil Bottle Icon */}
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-amber-100 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-32 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full relative shadow-lg">
                <div className="w-6 h-8 bg-amber-900 rounded-t-full mx-auto"></div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-amber-500 to-amber-700 rounded-full"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold">
                  YACHU
                </div>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Oops! This Page Got Lost
          </h2>

          {/* Subheading with Hair Care Theme */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Just like hair without proper care, this page seems to have wandered
            off.
            <br className="hidden md:block" />
            But don&apos;t worry - let&apos;s get you back to nourishing your
            hair journey!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/"
              className="group inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Back to Home
            </Link>

            <Link
              href="/products"
              className="group inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-amber-600 font-semibold rounded-full border-2 border-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Package className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              View Products
            </Link>
          </div>
        </div>
      </div>

      <FlowerDivider />
    </main>
  );
}

export default NotFoundPage;
