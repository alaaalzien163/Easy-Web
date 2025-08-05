import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import CategoryGrid from "./CategoryGrid";
import StoreGrid from "./StoreGrid";
import ProductGrid from "./ProductGrid";
import OrderTracking from "./OrderTracking";
import CartModal from "./CartModal";
import { Store, Grid3X3, Package, Heart, ShoppingCart } from "lucide-react";

const ClientInterface = () => {
  const [currentView, setCurrentView] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleViewChange = (view) => {
    setCurrentView(view);
    setSelectedCategory(null);
    setSelectedStore(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentView("products");
  };

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setCurrentView("products");
  };

  const handleFavoritesClick = () => {
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <div id="client-interface-root">
      <Header />
      <main className="pt-20">
        {/* Navigation Buttons */}
        <div className="bg-white py-2 px-6 md:px-12 border-b border-purple-100 shadow-sm">
          <div className="flex space-x-4">
            <button
              onClick={() => handleViewChange("categories")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                currentView === "categories"
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-white text-purple-700 hover:bg-purple-50 border border-purple-200"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
              <span>Categories</span>
            </button>
            <button
              onClick={() => handleViewChange("stores")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                currentView === "stores"
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-white text-purple-700 hover:bg-purple-50 border border-purple-200"
              }`}
            >
              <Store className="h-4 w-4" />
              <span>Stores</span>
            </button>
            <button
              onClick={() => handleViewChange("orders")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                currentView === "orders"
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-white text-purple-700 hover:bg-purple-50 border border-purple-200"
              }`}
            >
              <Package className="h-4 w-4" />
              <span>My Orders</span>
            </button>
            <button
              onClick={handleFavoritesClick}
              className="flex items-center space-x-2 px-4 py-2 rounded-md transition-colors bg-white text-purple-700 hover:bg-purple-50 border border-purple-200"
            >
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </button>
            <button
              onClick={handleCartClick}
              className="flex items-center space-x-2 px-4 py-2 rounded-md transition-colors bg-white text-purple-700 hover:bg-purple-50 border border-purple-200"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {currentView === "categories" && (
            <CategoryGrid onCategorySelect={handleCategorySelect} />
          )}
          {currentView === "stores" && (
            <StoreGrid onStoreSelect={handleStoreSelect} />
          )}
          {currentView === "products" && (
            <ProductGrid
              selectedCategory={selectedCategory}
              selectedStore={selectedStore}
            />
          )}
          {currentView === "orders" && <OrderTracking />}
        </div>
      </main>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default ClientInterface;
