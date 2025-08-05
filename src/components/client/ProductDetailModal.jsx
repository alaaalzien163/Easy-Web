import React from "react";
import {
  X,
  MapPin,
  CreditCard,
  Smartphone,
  Heart,
  ShoppingCart,
} from "lucide-react";

const ProductDetailModal = ({
  product = null,
  isOpen = false,
  onClose = () => {},
}) => {
  if (!isOpen || !product) return null;

  const paymentMethods = [
    { name: "Credit Card", icon: CreditCard, available: true },
    { name: "Mobile Payment", icon: Smartphone, available: true },
    { name: "Bank Transfer", icon: CreditCard, available: true },
  ];

  const handleAddToCart = () => {
    console.log("Added to cart:", product);
    onClose();
  };

  const handleAddToFavorites = () => {
    console.log("Added to favorites:", product);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              Product Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Product Image and Basic Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <div className="text-3xl font-bold text-primary mb-4">
                  ${product.price}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mb-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handleAddToFavorites}
                    className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Store Information */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Store Information
              </h4>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Store:</span>{" "}
                  {product.storeName}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Location:</span>{" "}
                  {product.storeLocation}
                </p>
                <p className="text-sm text-gray-600">
                  Note: All items in your cart must be from the same store for
                  checkout.
                </p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Available Payment Methods
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {paymentMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-2 p-3 rounded-lg border ${
                        method.available
                          ? "bg-white border-green-200 text-green-700"
                          : "bg-gray-100 border-gray-200 text-gray-500"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{method.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailModal;
