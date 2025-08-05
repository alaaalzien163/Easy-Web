import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Calendar,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SalesReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedProduct, setSelectedProduct] = useState("");


  const salesData = {
    overview: {
      totalRevenue: 15420,
      totalOrders: 89,
      averageOrderValue: 173.26,
      topSellingProduct: "Wireless Headphones",
      revenueChange: 12.5,
      ordersChange: -3.2,
    },
    productSales: [
      {
        id: 1,
        name: "Wireless Headphones",
        sales: 45,
        revenue: 4499.55,
        trend: "up",
        change: 15.3,
      },
      {
        id: 2,
        name: "Smartphone",
        sales: 23,
        revenue: 13799.77,
        trend: "up",
        change: 8.7,
      },
      {
        id: 3,
        name: "Gaming Console",
        sales: 12,
        revenue: 4799.88,
        trend: "down",
        change: -5.2,
      },
      {
        id: 4,
        name: "Phone Case",
        sales: 67,
        revenue: 1071.33,
        trend: "up",
        change: 22.1,
      },
      {
        id: 5,
        name: "Tablet",
        sales: 18,
        revenue: 5399.82,
        trend: "up",
        change: 3.4,
      },
    ],
    monthlyData: [
      { month: "Jan", revenue: 12500, orders: 75 },
      { month: "Feb", revenue: 15420, orders: 89 },
      { month: "Mar", revenue: 18200, orders: 102 },
      { month: "Apr", revenue: 16800, orders: 95 },
      { month: "May", revenue: 19500, orders: 110 },
      { month: "Jun", revenue: 21300, orders: 125 },
    ],
  };

  const periods = [
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
    { value: "year", label: "This Year" },
  ];

  const handleExportReport = () => {

    console.log("Exporting sales report...");
    alert("Sales report exported successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Reports</h2>
          <p className="text-gray-600">Track your store's performance</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          <Button onClick={handleExportReport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${salesData.overview.totalRevenue.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    +{salesData.overview.revenueChange}%
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {salesData.overview.totalOrders}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">
                    {salesData.overview.ordersChange}%
                  </span>
                </div>
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
                  Average Order Value
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${salesData.overview.averageOrderValue}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Top Selling Product
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {salesData.overview.topSellingProduct}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Units Sold
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesData.productSales.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{product.sales}</td>
                    <td className="py-3 px-4 text-gray-900 font-medium">
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {product.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span
                          className={`text-sm ${
                            product.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.trend === "up" ? "+" : ""}
                          {product.change}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2">
            {salesData.monthlyData.map((data, index) => {
              const maxRevenue = Math.max(
                ...salesData.monthlyData.map((d) => d.revenue),
              );
              const height = (data.revenue / maxRevenue) * 200;
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="text-xs text-gray-600 mb-2">
                    ${(data.revenue / 1000).toFixed(1)}k
                  </div>
                  <div
                    className="bg-primary rounded-t w-full min-h-[20px] transition-all duration-300 hover:bg-primary/80"
                    style={{ height: `${height}px` }}
                  />
                  <div className="text-xs text-gray-600 mt-2">{data.month}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Individual Product Report */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Individual Product Report</CardTitle>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Product</option>
              {salesData.productSales.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {selectedProduct ? (
            <div className="space-y-4">
              {(() => {
                const product = salesData.productSales.find(
                  (p) => p.name === selectedProduct,
                );
                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">
                        Units Sold
                      </p>
                      <p className="text-2xl font-bold text-blue-900">
                        {product?.sales}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">
                        Total Revenue
                      </p>
                      <p className="text-2xl font-bold text-green-900">
                        ${product?.revenue.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-purple-600 font-medium">
                        Average Price
                      </p>
                      <p className="text-2xl font-bold text-purple-900">
                        $
                        {(
                          (product?.revenue || 0) / (product?.sales || 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Select a product to view detailed sales report
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesReports;
