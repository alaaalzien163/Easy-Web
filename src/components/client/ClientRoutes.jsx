import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import ClientInterface from "./ClientInterface";
import ProductGrid from "./ProductGrid";
import CategoryGrid from "./CategoryGrid";
import StoreGrid from "./StoreGrid";
import OrderTracking from "./OrderTracking";


const ClientLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      {children}
    </div>
  );
};


const createClientRouter = () => {
  return createBrowserRouter([
    {
      path: "/client",
      element: <ClientLayout><ClientInterface /></ClientLayout>,
      children: [
        {
          path: "",
          element: <Navigate to="/client/categories" replace />
        },
        {
          path: "categories",
          element: <CategoryGrid />
        },
        {
          path: "stores",
          element: <StoreGrid />
        },
        {
          path: "products",
          element: <ProductGrid />
        },
        {
          path: "orders",
          element: <OrderTracking />
        }
      ]
    }
  ]);
};


const ClientRouterProvider = () => {
  const router = createClientRouter();
  
  return <RouterProvider router={router} />;
};

export default ClientRouterProvider; 