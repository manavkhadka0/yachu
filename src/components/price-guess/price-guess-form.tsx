"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { BASE_API_URL } from "@/utils/config";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface PriceGuessData {
  name: string;
  phone_number: string;
  yachu_facewash_price: string;
  yachu_bodylotion_price: string;
  yachu_brightening_cream_price: string;
}

const products = [
  {
    id: 0,
    name: "Yachu Face Wash (100ml)",
    image: "/1.png",
    fieldName: "yachu_facewash_price" as const,
  },
  {
    id: 1,
    name: "Yachu Brightening Cream",
    image: "/2.png",
    fieldName: "yachu_brightening_cream_price" as const,
  },
  {
    id: 2,
    name: "Yachu Body Lotion",
    image: "/3.png",
    fieldName: "yachu_bodylotion_price" as const,
  },
];

export default function PriceGuessForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2 for products
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState<PriceGuessData>({
    name: "",
    phone_number: "",
    yachu_facewash_price: "",
    yachu_bodylotion_price: "",
    yachu_brightening_cream_price: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    price?: string;
    name?: string;
    phone_number?: string;
  }>({});

  const currentProduct = products[currentStep];

  const handlePriceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentProduct.fieldName]: value,
    }));
    if (errors.price) {
      setErrors((prev) => ({ ...prev, price: undefined }));
    }
  };

  const validateCurrentPrice = (): boolean => {
    const price = formData[currentProduct.fieldName];
    if (!price.trim()) {
      setErrors({ price: "Please enter a price guess" });
      return false;
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice < 0) {
      setErrors({ price: "Please enter a valid price" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentPrice()) {
      return;
    }

    if (currentStep < products.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // All products guessed, open modal
      setIsModalOpen(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleModalSubmit = async () => {
    const newErrors: { name?: string; phone_number?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone_number.replace(/\D/g, ""))) {
      newErrors.phone_number = "Please enter a valid 10-digit phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${BASE_API_URL}/price-guess/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone_number: formData.phone_number.replace(/\D/g, ""),
          yachu_facewash_price: parseFloat(formData.yachu_facewash_price),
          yachu_bodylotion_price: parseFloat(formData.yachu_bodylotion_price),
          yachu_brightening_cream_price: parseFloat(
            formData.yachu_brightening_cream_price
          ),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 400 && errorData.phone_number) {
          toast.error(
            "This phone number has already been used. Each number can only guess once!"
          );
          setErrors({
            phone_number: "This phone number has already been used",
          });
        } else {
          toast.error(
            errorData.message ||
              "Failed to submit your guess. Please try again."
          );
        }
        return;
      }

      toast.success(
        "Your price guess has been submitted successfully! Good luck! 🎉"
      );

      // Close modal and show thank you screen
      setIsModalOpen(false);
      setShowThankYou(true);
    } catch (error) {
      console.error("Error submitting price guess:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / products.length) * 100;

  // Redirect to homepage after showing thank you message
  useEffect(() => {
    if (showThankYou) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 3000); // Redirect after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [showThankYou, router]);

  // Show thank you screen
  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-primary/10 to-primary/30 flex items-center justify-center p-4 relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="w-full max-w-2xl relative z-10 text-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 border border-primary/10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-primary" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              Thank You! 🎉
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-2 sm:mb-4">
              Your price guess has been submitted successfully!
            </p>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8">
              Good luck! We&apos;ll contact you if you win.
            </p>

            <p className="text-xs sm:text-sm text-muted-foreground animate-pulse">
              Redirecting to homepage...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-primary/10 to-primary/30 flex items-start justify-center p-3 sm:p-4 md:p-8 relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="w-full max-w-4xl relative z-10 py-4 sm:py-6 md:py-8 lg:py-12 px-2 sm:px-4">
          {/* Main title */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-2 sm:mb-3 tracking-tight px-2">
              YACHU <span className="text-primary">PRICE GUESS</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 sm:mb-6 px-2">
              Guess the prices of our new products and win exciting prizes!
            </p>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto px-2">
              <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
                <span>
                  Product {currentStep + 1} of {products.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 sm:h-3 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Product Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-primary/10 mb-6 sm:mb-8">
            <div className="flex flex-col items-center">
              {/* Product Image */}
              <div className="w-full max-w-[280px] sm:max-w-sm aspect-square relative mb-4 sm:mb-6 md:mb-8 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
                <Image
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  fill
                  className="object-contain p-4 sm:p-6"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 400px"
                  priority
                />
              </div>

              {/* Product Name */}
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4 sm:mb-6 md:mb-8 text-center px-2 leading-tight">
                {currentProduct.name}
              </h2>

              {/* Price Input */}
              <div className="w-full max-w-md px-2">
                <label
                  htmlFor="price-input"
                  className="block text-sm sm:text-base md:text-lg font-medium text-foreground mb-2 sm:mb-3 text-center"
                >
                  What&apos;s your price guess? (NPR)
                </label>
                <Input
                  id="price-input"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData[currentProduct.fieldName]}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  placeholder="Enter your guess..."
                  className={`w-full text-center text-lg sm:text-xl md:text-2xl py-4 sm:py-5 md:py-6 ${
                    errors.price ? "border-destructive" : ""
                  }`}
                  aria-invalid={!!errors.price}
                  autoFocus
                />
                {errors.price && (
                  <p className="text-xs sm:text-sm text-destructive mt-2 text-center">
                    {errors.price}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 px-2">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center justify-center gap-2 w-full sm:w-auto order-2 sm:order-1 py-3 sm:py-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm sm:text-base">Previous</span>
            </Button>

            <Button
              type="button"
              onClick={handleNext}
              size="lg"
              className="flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[150px] order-1 sm:order-2 py-3 sm:py-2 text-sm sm:text-base"
            >
              <span>
                {currentStep === products.length - 1 ? "Finish" : "Next"}
              </span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for Name and Phone */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">
              Almost There!
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Please enter your details to complete your submission
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 sm:py-4">
            <div>
              <label
                htmlFor="modal-name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Full Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="modal-name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter your full name"
                className={`w-full text-sm sm:text-base ${
                  errors.name ? "border-destructive" : ""
                }`}
                aria-invalid={!!errors.name}
                autoFocus
              />
              {errors.name && (
                <p className="text-xs sm:text-sm text-destructive mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="modal-phone"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Phone Number <span className="text-destructive">*</span>
              </label>
              <Input
                id="modal-phone"
                type="tel"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone_number: e.target.value,
                  }))
                }
                placeholder="Enter your phone number"
                className={`w-full text-sm sm:text-base ${
                  errors.phone_number ? "border-destructive" : ""
                }`}
                aria-invalid={!!errors.phone_number}
              />
              {errors.phone_number && (
                <p className="text-xs sm:text-sm text-destructive mt-1">
                  {errors.phone_number}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Each phone number can only guess once
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleModalSubmit}
              disabled={isSubmitting}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


