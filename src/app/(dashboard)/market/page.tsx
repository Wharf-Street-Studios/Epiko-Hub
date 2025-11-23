"use client"

import React, { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  RiShoppingBag3Line, 
  RiSearchLine, 
  RiAddLine, 
  RiSubtractLine, 
  RiDeleteBinLine, 
  RiBankCardLine, 
  RiCloseLine, 
  RiCheckLine,
  RiArrowRightLine,
  RiLoader4Line
} from "@remixicon/react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { getMarketItems, purchaseItem, MarketItem } from "@/lib/api/market";

interface CartItem {
  id: string;
  quantity: number;
  product: MarketItem;
}

export default function MarketPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<MarketItem | null>(null);

  useEffect(() => {
    async function loadMarketItems() {
      try {
        const items = await getMarketItems();
        setProducts(items);
      } catch (error) {
        console.error("Error loading market items:", error);
        toast.error("Failed to load market items");
      } finally {
        setLoading(false);
      }
    }

    loadMarketItems();
  }, []);

  const addToCart = (product: MarketItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: product.id, quantity: 1, product }];
    });
    toast.success(`Added ${product.title} to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to checkout");
      return;
    }

    setIsCheckingOut(true);
    try {
      // Process each item sequentially for now
      for (const item of cart) {
        const success = await purchaseItem(user.id, item.id);
        if (!success) {
          throw new Error(`Failed to purchase ${item.product.title}`);
        }
      }
      
      setCart([]);
      setIsCartOpen(false);
      toast.success("Order placed successfully!");
      
      // Refresh products to update stock
      const items = await getMarketItems();
      setProducts(items);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const filteredProducts = products
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RiLoader4Line className="w-8 h-8 text-[#866bff] animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <DashboardHeader />
      
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Shop</h1>
            <p className="text-gray-400 text-lg">Upgrade your game with premium items.</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
           <div className="relative flex-1 md:w-64 group">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#866bff] transition-colors" />
              <Input 
                placeholder="Search items..." 
                className="pl-10 bg-black/20 border-white/10 text-white focus-visible:ring-[#866bff] rounded-xl h-11 transition-all group-hover:bg-black/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>

           <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                 <Button size="icon" className="relative bg-[#866bff] hover:bg-[#7055d5] text-white rounded-xl shadow-lg shadow-[#866bff]/20">
                    <RiShoppingBag3Line className="w-5 h-5" />
                    {cart.length > 0 && (
                       <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#99ee2d] text-black text-xs font-bold flex items-center justify-center rounded-full ring-2 ring-[#12141d]">
                          {cart.reduce((a, b) => a + b.quantity, 0)}
                       </span>
                    )}
                 </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#12141d] border-white/10 w-full sm:max-w-md z-[100]">
                 <SheetHeader className="mb-6">
                    <SheetTitle className="text-white text-2xl font-bold flex items-center gap-2">
                       <RiShoppingBag3Line className="w-6 h-6 text-[#99ee2d]" /> Your Cart
                    </SheetTitle>
                    <SheetDescription className="sr-only">Review items in your cart and checkout</SheetDescription>
                 </SheetHeader>
                 
                 {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 space-y-4">
                       <RiShoppingBag3Line className="w-16 h-16 opacity-20" />
                       <p>Your cart is empty</p>
                       <Button variant="outline" onClick={() => setIsCartOpen(false)} className="border-white/10 text-white hover:bg-white/5 mt-4">
                          Start Shopping
                       </Button>
                    </div>
                 ) : (
                    <>
                       <ScrollArea className="h-[calc(100vh-250px)] pr-4">
                          <div className="space-y-4">
                             {cart.map((item) => (
                                <motion.div 
                                  layout
                                  key={item.id} 
                                  className="flex gap-4 bg-white/5 p-3 rounded-2xl border border-white/5"
                                >
                                   <img src={item.product.image_url} alt={item.product.title} className="w-20 h-20 object-cover rounded-xl" />
                                   <div className="flex-1 flex flex-col justify-between">
                                      <div>
                                         <h4 className="font-bold text-white text-sm line-clamp-1">{item.product.title}</h4>
                                         <p className="text-[#99ee2d] font-mono text-sm">${item.product.price}</p>
                                      </div>
                                      <div className="flex items-center justify-between mt-2">
                                         <div className="flex items-center gap-3 bg-black/20 rounded-lg p-1">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-white text-gray-400 transition-colors">
                                               <RiSubtractLine className="w-3 h-3" />
                                            </button>
                                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-white text-gray-400 transition-colors">
                                               <RiAddLine className="w-3 h-3" />
                                            </button>
                                         </div>
                                         <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="h-8 w-8 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg">
                                            <RiDeleteBinLine className="w-4 h-4" />
                                         </Button>
                                      </div>
                                   </div>
                                </motion.div>
                             ))}
                          </div>
                       </ScrollArea>
                       <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-[#12141d] border-t border-white/10">
                          <div className="w-full space-y-4">
                             <div className="flex justify-between text-white text-lg font-bold">
                                <span>Total</span>
                                <span className="text-[#99ee2d]">${cartTotal.toFixed(2)}</span>
                             </div>
                             <Button 
                                size="lg"
                                className="w-full bg-[#99ee2d] text-black hover:bg-[#88d428] font-bold text-lg shadow-lg shadow-[#99ee2d]/20"
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                             >
                                {isCheckingOut ? (
                                   <motion.div 
                                      animate={{ rotate: 360 }} 
                                      transition={{ repeat: Infinity, duration: 1 }}
                                   >
                                      <RiBankCardLine className="w-5 h-5" />
                                   </motion.div>
                                ) : (
                                   <>Checkout Now <RiArrowRightLine className="w-5 h-5 ml-2" /></>
                                )}
                             </Button>
                          </div>
                       </SheetFooter>
                    </>
                 )}
              </SheetContent>
           </Sheet>
        </div>
      </div>

      <Tabs defaultValue="All" onValueChange={setSelectedCategory} className="w-full">
         <TabsList className="bg-transparent p-0 h-auto gap-2 flex-wrap justify-start mb-8">
            {["All", "Digital", "Merch", "Skins"].map((category) => (
               <TabsTrigger 
                  key={category} 
                  value={category}
                  className="rounded-full h-11 px-6 data-[state=active]:bg-[#866bff] data-[state=active]:text-white bg-[#1c1f2a]/40 border border-white/5 text-gray-400 hover:text-white transition-all font-bold"
               >
                  {category}
               </TabsTrigger>
            ))}
         </TabsList>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
               {filteredProducts.length === 0 ? (
                 <div className="col-span-full text-center text-gray-500 py-12">
                   No items found
                 </div>
               ) : (
                 filteredProducts.map((product) => (
                    <motion.div
                       layout
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.9 }}
                       key={product.id}
                    >
                       <Card 
                         className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white overflow-hidden rounded-3xl group hover:border-[#866bff]/50 transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer h-full flex flex-col"
                         onClick={() => setSelectedProduct(product)}
                       >
                          <div className="aspect-[4/3] overflow-hidden relative bg-[#12141d]">
                             <img src={product.image_url} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                             <div className="absolute top-3 right-3">
                                <Badge className="bg-black/60 backdrop-blur-md text-white border border-white/10">{product.category}</Badge>
                             </div>
                          </div>
                          <CardContent className="p-5 flex-1 flex flex-col">
                             <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold line-clamp-1">{product.title}</h3>
                             </div>
                             <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{product.description}</p>
                             <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <span className="text-2xl font-bold text-[#99ee2d]">${product.price}</span>
                                <Button 
                                   size="sm" 
                                   className="rounded-lg bg-white/5 hover:bg-[#866bff] hover:text-white text-white transition-all px-4"
                                   onClick={(e) => {
                                      e.stopPropagation();
                                      addToCart(product);
                                   }}
                                >
                                   <RiAddLine className="w-4 h-4 mr-1" /> Add
                                </Button>
                             </div>
                          </CardContent>
                       </Card>
                    </motion.div>
                 ))
               )}
            </AnimatePresence>
         </div>
      </Tabs>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
         <DialogContent className="bg-[#1c1f2a] border-white/10 text-white max-w-3xl p-0 overflow-hidden rounded-3xl z-[100]">
            <DialogTitle className="sr-only">{selectedProduct?.title || "Product Details"}</DialogTitle>
            <DialogDescription className="sr-only">{selectedProduct?.description || "View product details"}</DialogDescription>
            {selectedProduct && (
               <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 h-64 md:h-auto relative">
                     <img src={selectedProduct.image_url} alt={selectedProduct.title} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#1c1f2a] to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#1c1f2a]" />
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                     <div className="flex justify-between items-start mb-4">
                        <Badge className="bg-[#866bff] text-white">{selectedProduct.category}</Badge>
                        <div className="flex items-center text-[#FFBB28]">
                           <RiCheckLine className="w-4 h-4 mr-1" /> In Stock
                        </div>
                     </div>
                     <h2 className="text-3xl font-bold mb-2">{selectedProduct.title}</h2>
                     <p className="text-2xl font-bold text-[#99ee2d] mb-6">${selectedProduct.price}</p>
                     <p className="text-gray-400 leading-relaxed mb-8 flex-1">
                        {selectedProduct.description}
                     </p>
                     
                     <div className="flex gap-4 mt-auto">
                        <Button 
                           size="lg"
                           className="flex-1 bg-[#99ee2d] text-black hover:bg-[#88d428] font-bold shadow-lg shadow-[#99ee2d]/20"
                           onClick={() => {
                              addToCart(selectedProduct);
                              setSelectedProduct(null);
                           }}
                        >
                           Add to Cart
                        </Button>
                        <Button 
                           variant="outline" 
                           size="icon"
                           className="h-14 w-14 border-white/10 hover:bg-white/5 text-white rounded-2xl"
                        >
                           <RiShoppingBag3Line className="w-5 h-5" />
                        </Button>
                     </div>
                  </div>
               </div>
            )}
         </DialogContent>
      </Dialog>
      </div>
    </motion.div>
  );
}
