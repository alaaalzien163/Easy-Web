import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Upload,
  Eye,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";
import SalesReports from "./SalesReports";
import StoreSettings from "./StoreSettings";
import ProductFormModal from "./ProductFormModal";



const StoreFormModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    image: null,
    docs: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setForm({ name: "", address: "", image: null, docs: null });
      setImagePreview("");
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(files[0]);
    } else if (name === "docs" && files.length > 0) {
      setForm((prev) => ({ ...prev, docs: Array.from(files) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Store name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.image) newErrors.image = "Image is required";
    if (!form.docs) newErrors.docs = "Docs are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("store_name", form.name);
      formData.append("address", form.address);
      formData.append("image", form.image);
      if (Array.isArray(form.docs)) {
        for (const file of form.docs) {
          formData.append("docs[]", file);
        }
      } else if (form.docs) {
        formData.append("docs[]", form.docs);
      }
      const token = localStorage.getItem('token');
      const response = await fetch("http://127.0.0.1:8000/api/user/create_store", {
        method: "POST",
        body: formData,
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Validation error:", errorData);
        throw new Error(
          errorData.message ||
          JSON.stringify(errorData.errors) ||
          "Failed to create store"
        );
      }
      const data = await response.json();
      
      if (data && data.store && data.store.id) {
        const profileRes = await fetch(`http://127.0.0.1:8000/api/stores/${data.store.id}/profile`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
        });
        let storeProfile = data.store;
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          storeProfile = { ...storeProfile, ...profileData };
        }
        onSave(storeProfile);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      setErrors({ api: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Create Store</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <span className="text-2xl">×</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter store name"
              className={`w-full border p-2 rounded ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter address"
              className={`w-full border p-2 rounded ${errors.address ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image *</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full" />
            {imagePreview && <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover mt-2 rounded" />}
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Docs *</label>
            <input type="file" name="docs" multiple onChange={handleChange} className="w-full" />
            {errors.docs && <p className="text-red-500 text-sm mt-1">{errors.docs}</p>}
          </div>
          {errors.api && <p className="text-red-500 text-sm mt-1">{errors.api}</p>}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded" disabled={submitting}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded" disabled={submitting}>{submitting ? "Creating..." : "Create Store"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching categories from API...");
      const response = await fetch("http://127.0.0.1:8000/api/user/view_categories", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log("Categories API Response Status:", response.status);
      console.log("Categories API Response Headers:", Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Categories API Raw Data:", data);
      console.log("Categories API Data Type:", typeof data);
      console.log("Categories API Data Length:", Array.isArray(data) ? data.length : "Not an array");
      
      let categoriesArray = [];
      if (Array.isArray(data)) {
        categoriesArray = data;
      } else if (data && Array.isArray(data.categories)) {
        categoriesArray = data.categories;
      } else if (data && Array.isArray(data.data)) {
        categoriesArray = data.data;
      } else if (data && typeof data === 'object') {
        categoriesArray = data.categories || data.data || data.items || [];
      }
      
      console.log("Processed Categories Array:", categoriesArray);
      setCategories(categoriesArray);
      
      if (categoriesArray.length === 0) {
        console.log("No categories found - this might be normal if no categories have been created yet");
      }
      
    } catch (error) {
      console.error("Categories API Error:", error);
      
      let errorMessage = "Error fetching categories";
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = "Network error - please check your connection";
      } else if (error.message.includes('HTTP error')) {
        errorMessage = `Server error: ${error.message}`;
      } else {
        errorMessage = error.message || "Unknown error occurred";
      }
      
      setError(errorMessage);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
          <p className="text-gray-600">
            View all available product categories
          </p>
        </div>
        {error && (
          <Button
            onClick={handleRetry}
            variant="outline"
            size="sm"
            className="text-purple-600 hover:text-purple-700"
          >
            Retry
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-600">{error}</p>
              <p className="text-red-500 text-sm mt-1">
                Retry count: {retryCount}
              </p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-500">Loading categories...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={category.id || index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                    Category
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {category.name || 'Unnamed Category'}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && !error && categories.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No categories available
            </h3>
            <p className="text-gray-600 mb-4">
              Categories will appear here when they are created by an administrator
            </p>
            <div className="text-sm text-gray-500">
              <p>To create categories, please contact your system administrator</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const StoreOwnerDashboard = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [activeTab, setActiveTab] = useState("stores");
  const [selectedStore, setSelectedStore] = useState(null);
  const [storeData] = useState({
    name: "TechHub Damascus",
    location: "Damascus, Syria",
    totalProducts: 45,
    pendingOrders: 12,
    totalSales: 15420,
    monthlyRevenue: 3240,
  });
  const [userStores, setUserStores] = useState([
    {
      id: 1,
      name: "TechHub Damascus",
      location: "Damascus, Syria",
      status: "active",
      products: 45,
      orders: 12,
      revenue: 3240,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
      description: "Premium electronics and gaming equipment store",
    },
    {
      id: 2,
      name: "Mobile World Aleppo",
      location: "Aleppo, Syria",
      status: "active",
      products: 32,
      orders: 8,
      revenue: 2150,
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
      description: "Mobile phones and accessories specialist",
    },
  ]);
  const [isCreateStoreOpen, setIsCreateStoreOpen] = useState(false);
  const [storeProfile, setStoreProfile] = useState(null);
  const [storeCategories, setStoreCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [storeProducts, setStoreProducts] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [loading, setLoading] = useState(true);


  const fetchStores = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/api/stores", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch stores");
      const data = await res.json();
      const mappedStores = Array.isArray(data.stores)
        ? data.stores.map(store => ({
            ...store,
            name: store.name || store.store_name,
            location: store.location || store.address,
          }))
        : [];
      setUserStores(mappedStores);
    } catch (err) {
      setUserStores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchStores();
  }, [navigate]);

  const handleStoreCreated = () => {
    fetchStores();
    setIsCreateStoreOpen(false);
  };
  useEffect(() => {
    if (storeId) {
      const store = userStores.find((s) => s.id === parseInt(storeId));
      if (store) {
        setSelectedStore(store);
        const path = window.location.pathname;
        if (path.includes("/products")) setActiveTab("products");
        else if (path.includes("/orders")) setActiveTab("orders");
        else if (path.includes("/reports")) setActiveTab("reports");
        else if (path.includes("/settings")) setActiveTab("settings");
        else setActiveTab("products");
      }
    }
  }, [storeId, userStores]);

  useEffect(() => {
    if (selectedStore && selectedStore.id) {
      setProfileLoading(true);
      fetch(`http://127.0.0.1:8000/api/stores/${selectedStore.id}/profile`)
        .then((res) => res.json())
        .then((data) => {
          setStoreProfile(data);
          if (Array.isArray(data.categories)) {
            setStoreCategories(data.categories);
            setSelectedCategory(data.categories[0]?.id || null);
          } else {
            fetch(`http://127.0.0.1:8000/api/stores/${selectedStore.id}/categories`)
              .then((res) => res.json())
              .then((catData) => {
                setStoreCategories(catData.categories || []);
                setSelectedCategory(catData.categories?.[0]?.id || null);
              });
          }
        })
        .finally(() => setProfileLoading(false));
    } else {
      setStoreProfile(null);
      setStoreCategories([]);
      setSelectedCategory(null);
    }
  }, [selectedStore]);

  useEffect(() => {
    if (selectedStore && selectedStore.id && selectedCategory) {
      setProductsLoading(true);
      fetch(`http://127.0.0.1:8000/api/category/${selectedCategory}/product_show`)
        .then((res) => res.json())
        .then((data) => setStoreProducts(Array.isArray(data.products) ? data.products : []))
        .finally(() => setProductsLoading(false));
    } else {
      setStoreProducts([]);
    }
  }, [selectedStore, selectedCategory]);

  const handleProductAdded = (newProduct) => {
    setStoreProducts((prev) => [newProduct, ...prev]);
    setShowProductModal(false);
  };

  const StoreManagement = () => {
    const handleCreateStore = () => {
      setIsCreateStoreOpen(true);
    };
    const handleSaveStore = (storeProfile) => {
      setUserStores([...userStores, {
        id: storeProfile.id,
        name: storeProfile.store_name,
        location: storeProfile.address,
        status: storeProfile.status || "pending",
        products: storeProfile.products || 0,
        orders: storeProfile.orders || 0,
        revenue: storeProfile.revenue || 0,
        image: storeProfile.image,
        docs: storeProfile.docs,
        description: storeProfile.description || "New store",
      }]);
      setIsCreateStoreOpen(false);
    };

    const handleManageStore = (store) => {
      navigate(`/store/${store.id}/products`);
    };

    const handleViewStore = (store) => {
      navigate(`/clientinterface?store=${store.id}`);
    };

    const getStatusColor = (status) => {
      switch (status) {
        case "active":
          return "bg-green-100 text-green-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "inactive":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Stores</h2>
            <p className="text-gray-600">
              Manage your stores and create new ones
            </p>
          </div>
          <Button
            onClick={handleCreateStore}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4" />
            <span>Create Store</span>
          </Button>
        </div>
        <StoreFormModal isOpen={isCreateStoreOpen} onClose={() => setIsCreateStoreOpen(false)} onSave={handleSaveStore} />
        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userStores.map((store) => (
            <Card
              key={store.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(store.status)}`}
                  >
                    {store.status}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {store.name}
                    </h3>
                    <p className="text-sm text-gray-600">{store.location}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {store.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold text-purple-600">
                        {store.products}
                      </p>
                      <p className="text-xs text-gray-500">Products</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-orange-600">
                        {store.orders}
                      </p>
                      <p className="text-xs text-gray-500">Orders</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">
                        ${store.revenue}
                      </p>
                      <p className="text-xs text-gray-500">Revenue</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      onClick={() => setSelectedStore(store)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      size="sm"
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Manage
                    </Button>
                    <Button
                      onClick={() => handleViewStore(store)}
                      variant="outline"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {userStores.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No stores yet
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first store to start selling
              </p>
              <Button
                onClick={handleCreateStore}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Store
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const tabs = [
    {
      id: "stores",
      label: "My Stores",
      icon: Package,
      component: StoreManagement,
    },
    {
      id: "categories",
      label: "Categories",
      icon: Tag,
      component: CategoriesManagement,
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      component: ProductManagement,
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingCart,
      component: OrderManagement,
    },
    {
      id: "reports",
      label: "Sales Reports",
      icon: BarChart3,
      component: SalesReports,
    },
    {
      id: "settings",
      label: "Store Settings",
      icon: Settings,
      component: StoreSettings,
    },
  ];

  const menuItems = [
    {
      id: "stores",
      name: "My Stores",
      icon: Package,
    },
    {
      id: "categories",
      name: "Categories",
      icon: Tag,
    },
    {
      id: "products",
      name: "Products",
      icon: Package,
    },
    {
      id: "orders",
      name: "Orders",
      icon: ShoppingCart,
    },
    {
      id: "reports",
      name: "Sales Reports",
      icon: BarChart3,
    },
    {
      id: "settings",
      name: "Store Settings",
      icon: Settings,
    },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div
      id="store-owner-dashboard-root"
      className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white to-purple-50 shadow-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Easy Logo"
              className="h-12 w-auto mr-3"
            />
            <h1 className="text-xl font-semibold text-purple-700">
              Store Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-purple-600">
              Welcome, Store Owner
            </span>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Sidebar */}
        {/* Removed sidebar navigation */}
        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
            {selectedStore ? (
              <>
                {profileLoading ? (
                  <div>Loading store profile...</div>
                ) : storeProfile ? (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">{storeProfile.name || storeProfile.store_name}</h2>
                    <p className="text-gray-600 mb-2">{storeProfile.address}</p>
                    <img src={storeProfile.image} alt={storeProfile.name} className="w-48 h-48 object-cover rounded mb-4" />
                    <p className="text-gray-700">{storeProfile.description}</p>
                  </div>
                ) : null}
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-semibold mr-4">Products</h3>
                  <button
                    className="ml-auto px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    onClick={() => setShowProductModal(true)}
                  >
                    + Add Product
                  </button>
                </div>
                {/* Category Selector */}
                {storeCategories.length > 0 && (
                  <div className="mb-4">
                    <label className="mr-2 font-medium">Category:</label>
                    <select
                      value={selectedCategory || ''}
                      onChange={e => setSelectedCategory(e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      {storeCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                {productsLoading ? (
                  <div>Loading products...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {storeProducts.map((product) => (
                      <div key={product.id} className="border rounded-lg p-4 shadow-sm">
                        <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-2" />
                        <h4 className="font-semibold text-lg">{product.name}</h4>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-purple-700 font-bold mt-2">${product.price}</p>
                      </div>
                    ))}
                  </div>
                )}
                {/* Product Add Modal */}
                {showProductModal && (
                  <ProductFormModal
                    isOpen={showProductModal}
                    onClose={() => setShowProductModal(false)}
                    onSave={handleProductAdded}
                    categories={storeCategories.map(cat => cat.name)}
                    storeId={selectedStore.id}
                    categoryId={selectedCategory}
                  />
                )}
              </>
            ) : (
      
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Products
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {storeData.totalProducts}
                          </p>
                        </div>
                        <Package className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Pending Orders
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {storeData.pendingOrders}
                          </p>
                        </div>
                        <ShoppingCart className="h-8 w-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Total Sales
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            ${storeData.totalSales}
                          </p>
                        </div>
                        <BarChart3 className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Monthly Revenue
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            ${storeData.monthlyRevenue}
                          </p>
                        </div>
                        <BarChart3 className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                      {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                              activeTab === tab.id
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span>{tab.label}</span>
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                </div>

                {/* Active Tab Content */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {ActiveComponent &&
                    (activeTab === "stores" ? (
                      <StoreManagement />
                    ) : activeTab === "categories" ? (
                      <CategoriesManagement />
                    ) : activeTab === "products" && selectedStore ? (
                      <ProductManagement
                        storeId={selectedStore.id}
                        storeName={selectedStore.name}
                      />
                    ) : activeTab === "orders" && selectedStore ? (
                      <OrderManagement
                        storeId={selectedStore.id}
                        storeName={selectedStore.name}
                      />
                    ) : activeTab === "reports" && selectedStore ? (
                      <SalesReports
                        storeId={selectedStore.id}
                        storeName={selectedStore.name}
                      />
                    ) : activeTab === "settings" && selectedStore ? (
                      <StoreSettings
                        storeId={selectedStore.id}
                        storeName={selectedStore.name}
                      />
                    ) : (
                      <ActiveComponent />
                    ))}
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
