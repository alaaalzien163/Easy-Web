import React from "react";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Crown } from "lucide-react";
import Overview from "./SuperAdmin/Overview";
import StoreManagement from "./SuperAdmin/StoreManagement";
import System from "./SuperAdmin/System";
import Security from "./SuperAdmin/Security";
import Analytics from "./SuperAdmin/Analytics";
import Logs from "./SuperAdmin/Logs";
import Settings from "./SuperAdmin/Settings";
import Backup from "./SuperAdmin/Backup";
import Category from "./SuperAdmin/Category";

const navItems = [
  { path: "overview", label: "Overview" },
  { path: "stores", label: "Stores" },
  { path: "system", label: "System" },
  { path: "security", label: "Security" },
  { path: "analytics", label: "Analytics" },
  { path: "logs", label: "Logs" },
  { path: "settings", label: "Settings" },
  { path: "backup", label: "Backup" },
  { path: "category", label: "Category" },
];

const SuperAdminDashboard = () => {
  const location = useLocation();
  return (
    <div id="super-admin-dashboard-root" className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
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
                Super Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Super Admin</span>
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
        {/* Sidebar
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
        </div> */}

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
            <nav className="mb-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded text-center font-medium text-sm ${
                      isActive || location.pathname.endsWith(item.path)
                        ? "bg-yellow-600 text-white"
                        : "bg-white text-yellow-600 border border-yellow-600"
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
              <Route path="stores" element={<StoreManagement />} />
              <Route path="system" element={<System />} />
              <Route path="security" element={<Security />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="logs" element={<Logs />} />
              <Route path="settings" element={<Settings />} />
              <Route path="backup" element={<Backup />} />
              <Route path="category" element={<Category />} />
              <Route path="" element={<Navigate to="overview" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;