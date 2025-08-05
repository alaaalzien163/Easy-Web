import React from "react";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Overview from "./Admin/Overview";
import Complaints from "./Admin/Complaints";
import Finances from "./Admin/Finances";
import Inventory from "./Admin/Inventory";
import Stores from "./Admin/Stores";
import Users from "./Admin/Users";
import Reports from "./Admin/Reports";
import Category from "./Admin/Category";

const navItems = [
  { path: "overview", label: "Overview" },
  { path: "complaints", label: "Complaints" },
  { path: "finances", label: "Finances" },
  { path: "inventory", label: "Inventory" },
  { path: "stores", label: "Stores" },
  { path: "users", label: "Users" },
  { path: "reports", label: "Reports" },
  { path: "category", label: "Category" },
];

const AdminDashboard = () => {
  const location = useLocation();
  return (
    <div id="admin-dashboard-root" className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Easy Logo"
                className="h-8 w-auto mr-3"
              />
              <h1 className="text-xl font-semibold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              {/* You may want to add a logout handler here */}
              <button
                onClick={() => window.location.href = "/"}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-purple-100 min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      isActive
                        ? "bg-purple-100 text-purple-700 border-l-4 border-purple-600"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                    }`
                  }
                  end
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
            <div className="mb-2">
              <h1 className="text-xl font-bold text-white mb-1">
                Admin Dashboard
              </h1>
              <p className="text-purple-100 text-sm">
                Manage your platform with comprehensive administrative tools
              </p>
            </div>
            <nav className="mb-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded text-center font-medium text-sm ${
                      isActive || location.pathname.endsWith(item.path)
                        ? "bg-purple-600 text-white"
                        : "bg-white text-purple-600 border border-purple-600"
                    }`
                  }
                  end
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <Routes>
              <Route path="overview" element={<Overview />} />
              <Route path="complaints" element={<Complaints />} />
              <Route path="finances" element={<Finances />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="stores" element={<Stores />} />
              <Route path="users" element={<Users />} />
              <Route path="reports" element={<Reports />} />
              <Route path="category" element={<Category />} />
              <Route path="" element={<Navigate to="overview" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;