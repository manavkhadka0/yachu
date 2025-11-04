"use client";
import { useParams, useRouter } from "next/navigation";
import { useOrder } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  ArrowLeft,
  Package,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

const OrderDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = Number(params.id);

  const { data: order, isLoading, error } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 sm:py-12 px-3 sm:px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto py-6 sm:py-12 px-3 sm:px-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 px-3">
            <Package className="h-12 sm:h-16 w-12 sm:w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center">Order Not Found</h2>
            <p className="text-muted-foreground mb-6 text-center text-sm sm:text-base px-2">
              The order you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button onClick={() => router.push("/")} className="text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-300";
      case "confirmed":
        return "bg-blue-500/10 text-blue-700 border-blue-300";
      case "processing":
        return "bg-purple-500/10 text-purple-700 border-purple-300";
      case "shipped":
        return "bg-indigo-500/10 text-indigo-700 border-indigo-300";
      case "delivered":
        return "bg-green-500/10 text-green-700 border-green-300";
      case "cancelled":
        return "bg-red-500/10 text-red-700 border-red-300";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="container mx-auto py-4 sm:py-8 px-3 sm:px-4 max-w-5xl">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mb-3 sm:mb-4 -ml-2 sm:ml-0 text-sm sm:text-base"
          size="sm"
        >
          <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Back
        </Button>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Order Details</h1>
          </div>
          <Badge className={`${getStatusColor(order.order_status)} text-xs sm:text-sm w-fit`}>
            {order.order_status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Order Items */}
          <Card className="p-2 sm:p-3 shadow-none">
            <CardHeader className="px-3 sm:px-6 py-3 sm:py-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="space-y-3 sm:space-y-4">
                {order.order_products.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-2 sm:gap-4 p-2 sm:p-4 border rounded-lg"
                  >
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                      <img
                        src={item.product.image1}
                        alt={item.product.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-end justify-between mt-1 sm:mt-2">
                        <p className="text-xs sm:text-sm font-medium">
                          Rs. {item.product.price.toFixed(2)}
                        </p>
                        <p className="font-semibold text-sm sm:text-base">
                          Rs. {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-3 sm:my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs. {order.total_amount}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Delivery Charge</span>
                  <span>Rs. 100.00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-base sm:text-lg">
                  <span>Total</span>
                  <span>
                    Rs. {(parseFloat(order.total_amount) + 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Customer Information */}
          <Card className="p-2 sm:p-3 shadow-none">
            <CardHeader className="px-3 sm:px-6 py-3 sm:py-4">
              <CardTitle className="text-base sm:text-lg">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
              <div className="space-y-2 sm:space-y-2">
                <p className="font-semibold text-sm sm:text-base">{order.full_name}</p>

                <div className="flex items-start gap-2 text-xs sm:text-sm">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 break-words">
                    <p>{order.phone_number}</p>
                    {order.alternate_phone_number && (
                      <p className="text-muted-foreground">
                        {order.alternate_phone_number}
                      </p>
                    )}
                  </div>
                </div>

                {order.email && (
                  <div className="flex items-start gap-2 text-xs sm:text-sm">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <p className="break-all">{order.email}</p>
                  </div>
                )}

                <div className="flex items-start gap-2 text-xs sm:text-sm">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <p className="break-words">{order.delivery_address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Information */}
          <Card className="p-2 sm:p-3 shadow-none">
            <CardHeader className="px-3 sm:px-6 py-3 sm:py-4">
              <CardTitle className="text-base sm:text-lg">Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm px-3 sm:px-6">
              <div className="flex items-start gap-2">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Order Date</p>
                  <p className="font-medium break-words">
                    {format(new Date(order.created_at), "PPP")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Payment Method</p>
                  <p className="font-medium">Cash on Delivery</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Package className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Order Status</p>
                  <p className="font-medium">{order.order_status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;