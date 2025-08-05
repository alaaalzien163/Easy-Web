import React, { useState, useEffect } from "react";
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  MapPin,
  CreditCard,
  Smartphone,
} from "lucide-react";
import ProductDetailModal from "./ProductDetailModal";
import { addToCart } from "./cartUtils";

const ProductGrid = ({
  selectedCategory = null,
  selectedStore = null,
  onBack = () => {},
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchProducts = async (categoryId) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/category/${categoryId}/product_show`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.product && Array.isArray(data.product)) {
              const transformedProducts = data.product.map(product => {
        const store = product.stores && product.stores.length > 0 ? product.stores[0] : null;
          
          return {
            id: product.id,
            name: product.product_name,
            price: store ? parseFloat(store.pivot.price) : 0,
            image: product.prod_image ? `http://127.0.0.1:8000/storage/${product.prod_image}` : null,
            category: `Category ${product.categorie_id}`,
            storeId: store ? store.id : null,
            storeName: store ? store.store_name : 'Unknown Store',
            storeLocation: store ? store.address : 'Unknown Location',
            description: product.desc,
            availability: product.availability,
            saleStatus: store ? store.pivot.sale_status : 'unknown',
            offerDescription: store ? store.pivot.offers_Desc : '',
            stores: product.stores || []
          };
        });
        
        setProducts(transformedProducts);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory && selectedCategory.id) {
      fetchProducts(selectedCategory.id);
    } else {
      setProducts([]);
    }
  }, [selectedCategory]);
  const getFilteredProducts = () => {
    if (selectedStore) {
      return products.filter(
        (product) => product.storeId === selectedStore.id,
      );
    }
    return products;
  };

  const displayProducts = getFilteredProducts();

  const handleAddToCart = (product) => {
    const success = addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      store: product.storeName,
      storeId: product.storeId
    });
    
    if (success) {
      alert(`${product.name} added to cart!`);
    } else {
      console.log("Failed to add item to cart");
    }
  };

  const handleAddToFavorites = (product) => {

  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const getTitle = () => {
    if (selectedCategory) {
      return `${selectedCategory.name} Products`;
    }
    if (selectedStore) {
      return `Products from ${selectedStore.name}`;
    }
    return "All Products";
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Back Button and Title */}
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <h2 className="text-2xl font-bold text-gray-800">{getTitle()}</h2>
          </div>

          {/* Store Info (if viewing store products) */}
          {selectedStore && (
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedStore.image}
                  alt={selectedStore.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedStore.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{selectedStore.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedStore.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg mb-4">Error loading products</p>
              <p className="text-gray-500">{error}</p>
              <button 
                onClick={() => selectedCategory && fetchProducts(selectedCategory.id)}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative">
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80";
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToFavorites(product);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">
                      {product.storeName}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.category}
                    </p>
                    {product.saleStatus && (
                      <p className="text-xs text-orange-600 mb-1">
                        {product.saleStatus === 'on_sale' ? 'On Sale' : product.saleStatus}
                      </p>
                    )}
                    {product.offerDescription && product.offerDescription !== 'no_offer' && (
                      <p className="text-xs text-green-600 mb-1">
                        {product.offerDescription}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">
                        ${product.price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="flex items-center space-x-1 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="text-sm">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {selectedCategory ? `No products found in ${selectedCategory.name}.` : 'No products found.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </>
  );
};

export default ProductGrid;
