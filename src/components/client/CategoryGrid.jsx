import React, { useState, useEffect } from "react";
import {
  Smartphone,
  Utensils,
  Sparkles,
  Heart,
  Gamepad2,
  Home,
  Car,
  Book,
  Package,
} from "lucide-react";

const CategoryGrid = ({ onCategorySelect = () => {} }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const iconMap = {
    'electronics': Smartphone,
    'food': Utensils,
    'beauty': Sparkles,
    'chocolate': Heart,
    'gaming': Gamepad2,
    'home': Home,
    'automotive': Car,
    'books': Book,
    'default': Package,
  };


  const colorMap = {
    'electronics': 'bg-blue-500',
    'food': 'bg-green-500',
    'beauty': 'bg-pink-500',
    'chocolate': 'bg-amber-600',
    'gaming': 'bg-purple-500',
    'home': 'bg-emerald-500',
    'automotive': 'bg-red-500',
    'books': 'bg-indigo-500',
    'default': 'bg-gray-500',
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching categories from API...");
      const response = await fetch("http://127.0.0.1:8000/api/user/view_categories");
      console.log("Categories API Response Status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Categories API Raw Data:", data);
      console.log("Categories API Data Type:", typeof data);
      
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
      
      const transformedCategories = categoriesArray.map((category, index) => {
        const categoryName = category.name?.toLowerCase() || '';
        let iconKey = 'default';
        for (const [key, icon] of Object.entries(iconMap)) {
          if (categoryName.includes(key)) {
            iconKey = key;
            break;
          }
        }
        
        // Determine color based on category name
        let colorKey = 'default';
        for (const [key, color] of Object.entries(colorMap)) {
          if (categoryName.includes(key)) {
            colorKey = key;
            break;
          }
        }
        
        return {
          id: category.id || index + 1,
          name: category.name || 'Unnamed Category',
          icon: iconMap[iconKey],
          image: category.image ? 
            (category.image.startsWith('http') ? category.image : `http://127.0.0.1:8000${category.image}`) :
            "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80", // fallback image
          description: category.description || `Explore ${category.name || 'this category'}`,
          color: colorMap[colorKey],
          originalData: category, // Keep original data for reference
        };
      });
      
      setCategories(transformedCategories);
      
      if (categoriesArray.length === 0) {
        console.log("No categories found - this might be normal if no categories have been created yet");
      }
      
    } catch (error) {
      console.error("Categories API Error:", error);
      
      // Provide more specific error messages
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

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600">
              Choose a category to explore products from multiple stores
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="inline-flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-500 text-lg">Loading categories...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600">
              Choose a category to explore products from multiple stores
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Categories</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchCategories}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600">
            Choose a category to explore products from multiple stores
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No categories available</h3>
              <p className="text-gray-600">Categories will appear here when they are created by administrators</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => onCategorySelect(category)}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log("Category image failed to load:", category.image);
                        e.target.src = "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80";
                      }}
                    />
                    <div
                      className={`absolute top-4 right-4 p-3 rounded-full ${category.color} shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryGrid;
