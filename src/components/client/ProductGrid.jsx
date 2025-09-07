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
  const [quantities, setQuantities] = useState({});
  const [addingToCart, setAddingToCart] = useState({});


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

          const pivotId = store && store.pivot
            ? (store.pivot.id ?? store.pivot.store_product_id ?? store.pivot.storeProductId ?? store.pivot.store_products_id ?? null)
            : null;

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
            stores: product.stores || [],
            storeProductId: pivotId,
          };
        });

        setProducts(transformedProducts);
        const initialQuantities = {};
        transformedProducts.forEach(p => { initialQuantities[p.id] = 1; });
        setQuantities(initialQuantities);
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
      return products.filter((product) => (product.stores || []).some((st) => st.id === selectedStore.id));
    }
    return products;
  };

  const displayProducts = getFilteredProducts();

  const getStoreProductId = (product) => {
    const pickPivotId = (pivot = {}) => (
      (pivot && (pivot.id ?? pivot.store_product_id ?? pivot.storeProductId ?? pivot.store_products_id)) || null
    );

    if (selectedStore) {
      const s = (product.stores || []).find((st) => st.id === selectedStore.id);
      if (s) return pickPivotId(s.pivot || {});
    }
    const first = (product.stores || [])[0];
    return pickPivotId(first?.pivot || {});
  };

  const incrementQuantity = (productId) => {
    setQuantities((prev) => ({ ...prev, [productId]: (prev[productId] ?? 1) + 1 }));
  };

  const decrementQuantity = (productId) => {
    setQuantities((prev) => {
      const next = Math.max(1, (prev[productId] ?? 1) - 1);
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = async (product) => {
    const quantity = quantities[product.id] ?? 1;
    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add items to your cart.');
        return;
      }

      const productIdToUse = getStoreProductId(product);
      if (!productIdToUse) {
        console.warn(`Skipping product ${product.name} — missing store_product ID`, product.stores);
        alert(`This product (${product.name}) cannot be added to cart.`);
        return;
      }

      const formData = new FormData();
      formData.append('quantity', String(quantity));

      const response = await fetch(`http://127.0.0.1:8000/api/cart/add/${productIdToUse}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP ${response.status}`);
      }

      const responseData = await response.json();
      alert(responseData.message || `${product.name} added to cart (x${quantity})!`);

      const chosenStore = selectedStore
        ? (product.stores || []).find((st) => st.id === selectedStore.id)
        : (product.stores || [])[0];
      const price = chosenStore ? parseFloat(chosenStore.pivot?.price) : product.price;
      const storeId = chosenStore ? chosenStore.id : product.storeId;
      const storeName = chosenStore ? (chosenStore.store_name || chosenStore.name) : product.storeName;

      addToCart({
        id: product.id,
        name: product.name,
        price,
        image: product.image,
        store: storeName,
        storeId,
        quantity,
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert(`Failed to add to cart: ${err.message}`);
    } finally {
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
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
                    {(() => {
                      const chosenStore = selectedStore
                        ? (product.stores || []).find((st) => st.id === selectedStore.id)
                        : (product.stores || [])[0];
                      const resolvedPrice = chosenStore ? parseFloat(chosenStore.pivot?.price) : product.price;
                      return (
                        <div className="flex flex-col space-y-3">
                          <span className="text-lg font-bold text-primary">${resolvedPrice}</span>
                          <div className="flex items-center justify-between space-x-3">
                            <div className="flex items-center border rounded-md overflow-hidden">
                              <button
                                onClick={(e) => { e.stopPropagation(); decrementQuantity(product.id); }}
                                className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <div className="px-3 select-none min-w-[2ch] text-center">
                                {quantities[product.id] ?? 1}
                              </div>
                              <button
                                onClick={(e) => { e.stopPropagation(); incrementQuantity(product.id); }}
                                className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                              disabled={!!addingToCart[product.id]}
                              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${addingToCart[product.id] ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
                            >
                              {addingToCart[product.id] ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                              ) : (
                                <ShoppingCart className="h-4 w-4" />
                              )}
                              <span className="text-sm">{addingToCart[product.id] ? 'Adding...' : 'Add'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })()}
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
