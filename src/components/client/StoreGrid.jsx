import React, { useState, useEffect } from "react";
import { MapPin, Clock, Star, RefreshCw } from "lucide-react";

const StoreGrid = ({ onStoreSelect = () => {} }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchStores = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/stores', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch stores: ${response.status}`);
      }

      const data = await response.json();

      if (data.stores && Array.isArray(data.stores)) {
        const transformedStores = data.stores.map(store => ({
          id: store.id,
          name: store.store_name,
          image: store.image ? `http://127.0.0.1:8000/storage/${store.image}` : "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
          location: store.address || "Unknown Location",
          rating: store.rate_value || 0,
          ratersNumber: store.raters_number || 0,
          stateUse: store.state_use || "unknown",
          description: store.description || "No description available",
          categories: store.categories || ["General"],
          openHours: store.open_hours || "Hours not specified"
        }));
        
        setStores(transformedStores);
      } else if (Array.isArray(data)) {
        const transformedStores = data.map(store => ({
          id: store.id,
          name: store.store_name,
          image: store.image ? `http://127.0.0.1:8000/storage/${store.image}` : "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
          location: store.address || "Unknown Location",
          rating: store.rate_value || 0,
          ratersNumber: store.raters_number || 0,
          stateUse: store.state_use || "unknown",
          description: store.description || "No description available",
          categories: store.categories || ["General"],
          openHours: store.open_hours || "Hours not specified"
        }));
        
        setStores(transformedStores);
      } else {
        setStores([]);
      }
    } catch (err) {
      console.error('Error fetching stores:', err);
      setError(err.message);
      setStores([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchStores();
  }, []);

  const handleStoreClick = (store) => {
    onStoreSelect(store);
  };

  const handleRetry = () => {
    fetchStores();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Browse Stores
          </h2>
          <p className="text-gray-600">
            Shop from trusted local stores across Syria
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading stores...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 text-lg font-semibold mb-2">Error loading stores</p>
              <p className="text-red-500 text-sm mb-4">{error}</p>
              <button 
                onClick={handleRetry}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors mx-auto"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        )}

        {/* Stores Grid */}
        {!loading && !error && stores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div
                key={store.id}
                onClick={() => handleStoreClick(store)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{store.rating}</span>
                  </div>
                  {store.stateUse && store.stateUse !== "unknown" && (
                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs shadow-sm">
                      {store.stateUse === 'verified' ? 'Verified' : store.stateUse}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">
                    {store.name}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{store.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{store.openHours}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {store.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {store.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && !error ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-gray-500 text-lg">No stores found</p>
              <p className="text-gray-400 text-sm mt-2">There are no stores available at the moment.</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StoreGrid;
