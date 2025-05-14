"use client";

import { useEffect, useState } from "react";
import CheckoutForm from "@/components/product/CheckoutForm";
import useProductCart from "@/store/zustand"; 
import { TProduct, CartItem } from "@/types/product"; 
import Image from "next/image";
import { calculateTotalPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { BASE_API_URL } from "@/utils/config";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CheckoutPage = () => {
    const router = useRouter();
    const { cart, increaseCount, decreaseCount, removeItem, addToCart: zustandAddToCart, clearCart } = useProductCart();
    const [deliveryLocation, setDeliveryLocation] = useState<"inside" | "outside">("inside");
    const [isClient, setIsClient] = useState(false);
    const [shampooAddOns, setShampooAddOns] = useState<Array<TProduct & { count: number }>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsClient(true);
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchRecommendedProducts = async () => {
            try {
                setIsLoading(true);
                const [product5, product6] = await Promise.all([
                    fetchProductById("5"),
                    fetchProductById("6")
                ]);
                
                if (product5 && product6) {
                    setShampooAddOns([
                        { ...product5, count: 0 },
                        { ...product6, count: 0 }
                    ]);
                }
            } catch (error) {
                console.error("Error fetching recommended products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendedProducts();
    }, []);

    // Update addon counts based on cart items
    useEffect(() => {
        setShampooAddOns(prevAddons => 
            prevAddons.map(addon => {
                const cartItem = cart.find(item => item.product.id === addon.id);
                return {
                    ...addon,
                    count: cartItem ? cartItem.count : 0
                };
            })
        );
    }, [cart]);

    const fetchProductById = async (id: string) => {
        try {
            const res = await fetch(`${BASE_API_URL}/products/${id}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch product ${id}: ${res.status}`);
            }
            return await res.json();
        } catch (error) {
            console.error(`Error fetching Product ${id}`, error);
            return null;
        }
    };

    const totalPrice = calculateTotalPrice(cart); 
    const addOnsTotal = shampooAddOns.reduce((sum, item) => sum + (item.price * item.count), 0);
    const shippingCharge = deliveryLocation === "inside" ? 100 : 150;
    const finalTotal = totalPrice + addOnsTotal + shippingCharge;

    const increaseAddOnCount = (id: string) => {
        const addonData = shampooAddOns.find(a => a.id === id);
        if (!addonData) {
            console.error("Addon not found in shampooAddOns state:", id);
            return;
        }
        
        setShampooAddOns(prevAddOns =>
            prevAddOns.map(addon =>
                addon.id === id
                    ? { ...addon, count: addon.count + 1 } 
                    : addon
            )
        );
        
        const { count, ...productFields } = addonData;
        const productToAddAsCartItem: TProduct = productFields as TProduct;

        const isInMainCart = cart.some(cartItem => cartItem.product.id === id);

        if (isInMainCart) {
            increaseCount(id);
        } else {
            const newCartItem: CartItem = { product: productToAddAsCartItem, count: 1 };
            zustandAddToCart([...cart, newCartItem]);
        }
    };

    const decreaseAddOnCount = (id: string) => {
        const addonData = shampooAddOns.find(a => a.id === id);
        if (!addonData || addonData.count <= 0) return;

        if (addonData.count === 1) {
            // Remove completely when count reaches 0
            removeItem(id);
            setShampooAddOns(prevAddOns =>
                prevAddOns.map(addon =>
                    addon.id === id ? { ...addon, count: 0 } : addon
                )
            );
        } else {
            setShampooAddOns(prevAddOns =>
                prevAddOns.map(addon =>
                    addon.id === id ? { ...addon, count: addon.count - 1 } : addon
                )
            );
            decreaseCount(id);
        }
    };

    const getActiveAddOns = () => {
        return shampooAddOns
            .filter(addon => addon.count > 0)
            .map(addon => ({
                productId: addon.id,
                title: addon.title,
                price: addon.price,
                quantity: addon.count,
                image: addon.image1
            }));
    };

    const handleCheckoutSuccess = () => {
        // Clear cart and add-ons after successful checkout
        clearCart();
        setShampooAddOns(prev => prev.map(item => ({ ...item, count: 0 })));
        
        // Show success message
        toast.success("Order placed successfully!", {
            description: "Thank you for your purchase. We'll process your order shortly.",
            duration: 5000,
        });
        
        // Redirect to home page after 3 seconds
        setTimeout(() => {
            router.push("/");
        }, 3000);
    };

    if (!isClient) {
        return null;
    }

    const activeAddOnsFromLocalState = shampooAddOns.filter(addon => addon.count > 0);

    const isAddOnInCart = (addOnId: string) => {
        return cart.some(item => item.product.id === addOnId);
    };

    const recommendedAddOns = shampooAddOns.filter(addon => !isAddOnInCart(addon.id));

    const orderSummary = {
        cartItems: cart.map(item => ({
            productId: item.product.id,
            title: item.product.title,
            price: item.product.price,
            quantity: item.count,
            image: item.product.image1
        })),
        addOns: getActiveAddOns(), 
        subtotal: totalPrice, 
        addOnsTotal: addOnsTotal, 
        shippingCharge: shippingCharge,
        deliveryLocation: deliveryLocation,
        totalAmount: finalTotal,
        includeAddOns: activeAddOnsFromLocalState.length > 0,
        deliveryCharge: shippingCharge,
        total: finalTotal 
    };

    return (
        <div className="container py-8 md:py-12">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Mobile-only Recommendations Section - Only show when cart has items */}
                {cart.length > 0 && (
                    <div className="lg:hidden col-span-1 bg-white p-4 rounded-xl border shadow-sm">
                        <h2 className="text-lg font-semibold mb-3 text-amber-700">Recommended Products</h2>
                        {isLoading ? (
                            <div className="flex justify-center py-4">
                                <p className="text-sm text-muted-foreground">Loading recommended products...</p>
                            </div>
                        ) : recommendedAddOns.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3">
                                {recommendedAddOns.map((addon) => (
                                    <div key={addon.id} className="flex flex-col gap-2 bg-amber-50 rounded-lg p-2 relative">
                                        <div className="aspect-square w-full overflow-hidden rounded-md border">
                                            <Image
                                                src={addon.image1}
                                                alt={addon.title}
                                                height={100}
                                                width={100}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-medium text-xs line-clamp-1">{addon.title}</h3>
                                            <p className="text-xs font-semibold">Rs. {addon.price.toLocaleString()}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-5 w-5"
                                                    onClick={() => decreaseAddOnCount(addon.id)}
                                                    disabled={addon.count === 0}
                                                >
                                                    <Minus className="h-2 w-2" />
                                                </Button>
                                                <span className="w-5 text-center text-xs font-medium">{addon.count}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-5 w-5"
                                                    onClick={() => increaseAddOnCount(addon.id)}
                                                >
                                                    <Plus className="h-2 w-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No recommended products available</p>
                        )}

                        {activeAddOnsFromLocalState.length > 0 && (
                            <div className="mt-3 pt-3 border-t">
                                <h3 className="font-medium text-sm text-gray-700 mb-2">Selected Add-ons</h3>
                                <div className="space-y-2">
                                    {activeAddOnsFromLocalState.map((addon) => (
                                        <div key={addon.id} className="flex justify-between items-center text-xs relative bg-gray-50 p-2 rounded-lg">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-white shadow-sm hover:bg-red-50 hover:text-red-600"
                                                onClick={() => removeItem(addon.id)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                            <span>{addon.title} × {addon.count}</span>
                                            <span>Rs. {(addon.price * addon.count).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Mobile Order Summary - Only shown when there are items */}
                {cart.length > 0 && (
                    <div className="lg:hidden col-span-1 bg-white p-4 rounded-xl border shadow-sm">
                        <div className="flex items-center justify-between mb-3 pb-2 border-b">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                <h2 className="text-lg font-semibold">Order Summary</h2>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {cart.length} {cart.length === 1 ? "item" : "items"}
                            </span>
                        </div>

                        <ScrollArea className="h-48 pr-3">
                            <div className="space-y-3">
                                {cart.map(({ product, count }) => (
                                    <div
                                        key={product.id}
                                        className="flex gap-3 items-start bg-gray-50 rounded-lg p-2 relative"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-white shadow-sm hover:bg-red-50 hover:text-red-600"
                                            onClick={() => removeItem(product.id)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                        <div className="flex-shrink-0 aspect-square h-12 w-12 overflow-hidden rounded-md border">
                                            <Image
                                                src={product.image1}
                                                alt={product.title}
                                                height={48}
                                                width={48}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex justify-between">
                                                <h3 className="font-medium text-xs line-clamp-1">{product.title}</h3>
                                                <p className="text-xs font-semibold">
                                                    Rs. {(product.price * count).toLocaleString()}
                                                </p>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Rs. {product.price} × {count}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-5 w-5"
                                                    onClick={() => decreaseCount(product.id)}
                                                >
                                                    <Minus className="h-2 w-2" />
                                                </Button>
                                                <span className="w-5 text-center text-xs font-medium">{count}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-5 w-5"
                                                    onClick={() => increaseCount(product.id)}
                                                >
                                                    <Plus className="h-2 w-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="mt-3 space-y-2 pt-3 border-t">
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>Rs. {totalPrice.toLocaleString()}</span>
                            </div>
                            {addOnsTotal > 0 && (
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Add-ons</span>
                                    <span>Rs. {addOnsTotal.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Delivery Location</span>
                                <div className="flex gap-2">
                                    <Button
                                        variant={deliveryLocation === "inside" ? "default" : "outline"}
                                        size="sm"
                                        className={`text-xs h-6 ${deliveryLocation === "inside" ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                                        onClick={() => setDeliveryLocation("inside")}
                                    >
                                        Inside Valley
                                    </Button>
                                    <Button
                                        variant={deliveryLocation === "outside" ? "default" : "outline"}
                                        size="sm"
                                        className={`text-xs h-6 ${deliveryLocation === "outside" ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                                        onClick={() => setDeliveryLocation("outside")}
                                    >
                                        Outside Valley
                                    </Button>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="text-amber-600">Rs. {shippingCharge}</span>
                            </div>
                            <Separator className="my-1" />
                            <div className="flex justify-between font-medium text-sm">
                                <span>Total</span>
                                <span>Rs. {finalTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty cart message for mobile */}
                {cart.length === 0 && (
                    <div className="lg:hidden col-span-1 bg-white p-6 rounded-xl border shadow-sm">
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-3" />
                            <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                            <Link href="/" className="mt-4">
                                <Button variant="outline" className="mt-4">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Left Column - Checkout Form */}
                <div className="lg:col-span-7 bg-white p-6 rounded-xl border shadow-sm">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">Shipping & Billing Details</h2>
                    <CheckoutForm 
                        orderSummary={orderSummary}
                        onSuccess={handleCheckoutSuccess} 
                        deliveryLocation={deliveryLocation}
                        setDeliveryLocation={setDeliveryLocation}
                    />
                </div>

                {/* Right Column - Cart Summary and Add-ons (Desktop) */}
                <div className="hidden lg:block lg:col-span-5 space-y-6">
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <div className="flex items-center justify-between mb-4 pb-2 border-b">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                <h2 className="text-xl font-semibold">Order Summary</h2>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {cart.length} {cart.length === 1 ? "item" : "items"}
                            </span>
                        </div>

                        {cart.length === 0 && activeAddOnsFromLocalState.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-3" />
                                <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                                <Link href="/" className="mt-4">
                                    <Button variant="outline" className="mt-4">
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <ScrollArea className="h-64 pr-4">
                                    <div className="space-y-4">
                                        {cart.map(({ product, count }) => (
                                            <div
                                                key={product.id}
                                                className="flex gap-3 items-start bg-gray-50 rounded-lg p-3 relative"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm hover:bg-red-50 hover:text-red-600"
                                                    onClick={() => removeItem(product.id)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                                <div className="flex-shrink-0 aspect-square h-16 w-16 overflow-hidden rounded-md border">
                                                    <Image
                                                        src={product.image1}
                                                        alt={product.title}
                                                        height={64}
                                                        width={64}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="flex flex-1 flex-col">
                                                    <div className="flex justify-between">
                                                        <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
                                                        <p className="text-sm font-semibold">
                                                            Rs. {(product.price * count).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">Rs. {product.price} × {count}</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={() => decreaseCount(product.id)}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="w-6 text-center text-sm font-medium">{count}</span>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={() => increaseCount(product.id)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                
                                {/* Recommended Add-ons Section for Desktop */}
                                {recommendedAddOns.length > 0 && (
                                    <div className="mt-4 pt-4 border-t">
                                        <h3 className="font-medium text-amber-700 mb-3">Recommended Products</h3>
                                        <div className="space-y-3">
                                            {recommendedAddOns.map((addon) => (
                                                <div key={addon.id} className="flex gap-3 items-start bg-amber-50 rounded-lg p-3 relative">
                                                    <div className="flex-shrink-0 aspect-square h-16 w-16 overflow-hidden rounded-md border">
                                                        <Image
                                                            src={addon.image1}
                                                            alt={addon.title}
                                                            height={64}
                                                            width={64}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>
                                                    <div className="flex flex-1 flex-col">
                                                        <div className="flex justify-between">
                                                            <h3 className="font-medium text-sm line-clamp-1">{addon.title}</h3>
                                                            <p className="text-sm font-semibold">
                                                                Rs. {addon.price.toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-6 w-6"
                                                                onClick={() => decreaseAddOnCount(addon.id)} 
                                                                disabled={addon.count === 0}
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </Button>
                                                            <span className="w-6 text-center text-sm font-medium">{addon.count}</span>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-6 w-6"
                                                                onClick={() => increaseAddOnCount(addon.id)} 
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Selected Add-ons Section for Desktop */}
                                {activeAddOnsFromLocalState.length > 0 && (
                                    <div className="mt-4 pt-4 border-t">
                                        <h3 className="font-medium text-sm text-gray-700 mb-2">Selected Add-ons</h3>
                                        <div className="space-y-2">
                                            {activeAddOnsFromLocalState.map((addon) => (
                                                <div key={addon.id} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded-lg relative">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm hover:bg-red-50 hover:text-red-600"
                                                        onClick={() => removeItem(addon.id)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                    <span>{addon.title} × {addon.count}</span>
                                                    <span>Rs. {(addon.price * addon.count).toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4 space-y-3 pt-4 border-t">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal (Cart Items)</span>
                                        <span>Rs. {totalPrice.toLocaleString()}</span>
                                    </div>
                                    {addOnsTotal > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Add-ons</span>
                                            <span>Rs. {addOnsTotal.toLocaleString()}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Delivery Location</span>
                                        <div className="flex gap-2">
                                            <Button
                                                variant={deliveryLocation === "inside" ? "default" : "outline"}
                                                size="sm"
                                                className={`text-xs h-7 ${deliveryLocation === "inside" ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                                                onClick={() => setDeliveryLocation("inside")}
                                            >
                                                Inside Valley
                                            </Button>
                                            <Button
                                                variant={deliveryLocation === "outside" ? "default" : "outline"}
                                                size="sm"
                                                className={`text-xs h-7 ${deliveryLocation === "outside" ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                                                onClick={() => setDeliveryLocation("outside")}
                                            >
                                                Outside Valley
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="text-amber-600">Rs. {shippingCharge}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-medium">
                                        <span>Total</span>
                                        <span className="text-lg">Rs. {finalTotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;