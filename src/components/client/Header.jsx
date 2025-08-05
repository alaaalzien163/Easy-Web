import React, { useState } from "react";
import { Search, Filter, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchModal from "./SearchModal";
import FilterModal from "./FilterModal";


const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLogoutError("");
    try {
      const token = localStorage.getItem("token");
      await fetch("http://127.0.0.1:8000/api/user/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      setLogoutError("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white to-purple-50 shadow-lg border-b border-purple-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <div className="text-xl font-bold">
            <img
              src="/images/client-icon-removebg-preview.png"
              alt="Easy Client Logo"
              className="h-12 w-auto"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-purple-50 rounded-md transition-colors"
          >
            <Search className="h-6 w-6 text-purple-700" />
          </button>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="p-2 hover:bg-purple-50 rounded-md transition-colors"
          >
            <Filter className="h-6 w-6 text-purple-700" />
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-red-50 rounded-md transition-colors text-red-600 hover:text-red-700"
            title="Logout"
          >
            <LogOut className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Logout Error Message */}
      {logoutError && (
        <div className="fixed top-20 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          {logoutError}
        </div>
      )}
    </>
  );
};

export default Header;
