import React, { useState, useEffect } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const ProductFormModal = ({
  isOpen = false,
  onClose = () => {},
  onSave = () => {},
  product = null,
  categories = [],
  storeId,
  categoryId,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    categoryId: "",
    image: null,
    imageFile: null,
    productStatus: "",
    offerDescription: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiCategories, setApiCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState("");

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/user/view_categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      setApiCategories(data.categories || data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setApiCategories([]);
      setCategoriesError('Failed to load categories. Please try again.');
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      setCategoriesError("");
    }
    
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        quantity: product.quantity?.toString() || "",
        category: product.category || "",
        categoryId: product.categoryId || "",
        image: product.image || null,
        imageFile: null,
        productStatus: product.productStatus || "",
        offerDescription: product.offerDescription || "",
      });
      setImagePreview(product.image || "");
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        categoryId: "",
        image: null,
        imageFile: null,
        productStatus: "",
        offerDescription: "",
      });
      setImagePreview("");
    }
    setErrors({});
  }, [product, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "category") {
      const selectedCategory = apiCategories.find(cat => (cat.name || cat) === value);
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value,
        categoryId: selectedCategory?.id || ""
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      newErrors.quantity = "Valid quantity is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.productStatus.trim()) {
      newErrors.productStatus = "Product status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (!storeId) {
      setErrors({ api: "Store ID is required" });
      return;
    }
    
    setSubmitting(true);
    try {
      const userId = 1;
      
      let requestBody;
      let headers;
      
      if (formData.imageFile) {
        const formDataObj = new FormData();
        formDataObj.append('product_name', formData.name.trim());
        formDataObj.append('price', formData.price.toString());
        formDataObj.append('desc', formData.description.trim());
        formDataObj.append('sale_status', formData.productStatus.trim());
        formDataObj.append('offers_Desc', formData.offerDescription || "");
        formDataObj.append('quantity', formData.quantity.toString());
        formDataObj.append('categorie_id', formData.categoryId || formData.category || "");
        formDataObj.append('prod_image', formData.imageFile);
        
        requestBody = formDataObj;
        headers = getAuthHeaders();
      } else {
        requestBody = {
          product_name: formData.name.trim(),
          price: formData.price.toString(),
          desc: formData.description.trim(),
          sale_status: formData.productStatus.trim(),
          offers_Desc: formData.offerDescription || "",
          quantity: formData.quantity.toString(),
          categorie_id: formData.categoryId || formData.category || ""
        };
        headers = getDefaultHeaders();
      }

      const url = `http://127.0.0.1:8000/api/add_product/${userId}/store/${storeId}/category`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: requestBody instanceof FormData ? requestBody : JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: `Server error: ${response.status} ${response.statusText}` };
        }
        setErrors({ api: errorData.message || 'Failed to add product' });
        return;
      }
      
      const data = await response.json();
      
      if (data.product) {
        onSave(data.product);
      } else if (data.success) {
        onSave(formData);
      } else {
        onSave(data);
      }
      onClose();
    } catch (error) {
      setErrors({ api: error.message || 'Failed to add product' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Optional: Upload a product image
                </p>
              </div>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows={3}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <Input
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <Input
                name="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="0"
                className={errors.quantity ? "border-red-500" : ""}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              disabled={loadingCategories}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.category ? "border-red-500" : "border-gray-300"
              } ${loadingCategories ? "bg-gray-100 cursor-not-allowed" : ""}`}
            >
              <option value="">
                {loadingCategories ? "Loading categories..." : "Select Category"}
              </option>
              {apiCategories.length > 0 ? (
                apiCategories.map((category) => (
                  <option key={category.id || category} value={category.name || category}>
                    {category.name || category}
                  </option>
                ))
              ) : (
                !loadingCategories && (
                  <option value="" disabled>
                    No categories available
                  </option>
                )
              )}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
            {categoriesError && (
              <p className="text-red-500 text-sm mt-1">{categoriesError}</p>
            )}
          </div>

          {/* Product Status and Offer Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Status *
              </label>
              <Input
                name="productStatus"
                value={formData.productStatus}
                onChange={handleInputChange}
                placeholder="e.g., Available, In Stock, Limited"
                className={errors.productStatus ? "border-red-500" : ""}
              />
              {errors.productStatus && (
                <p className="text-red-500 text-sm mt-1">{errors.productStatus}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Offer Description
              </label>
              <Input
                name="offerDescription"
                value={formData.offerDescription}
                onChange={handleInputChange}
                placeholder="e.g., 20% off, Buy 1 Get 1 Free"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: Add special offers or promotions
              </p>
            </div>
          </div>

          {/* API Error Display */}
          {errors.api && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-600 text-sm">{errors.api}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : (product ? "Update Product" : "Add Product")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
