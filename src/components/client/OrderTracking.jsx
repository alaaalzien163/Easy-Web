import React, { useState } from "react";
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  MapPin,
  Calendar,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrderTracking = () => {
  const [orders] = useState([
    {
      id: "ORD-001",
      storeName: "TechHub Damascus",
      items: [
        { name: "Wireless Headphones", quantity: 1, price: 99.99 },
        { name: "Phone Case", quantity: 2, price: 15.99 },
      ],
      total: 131.97,
      status: "in_progress",
      orderDate: "2024-01-15",
      estimatedDelivery: "2024-01-18",
      recipientName: "Sara Hassan",
      recipientAddress: "Damascus, Al-Mazzeh, Street 15, Building 3",
      trackingSteps: [
        {
          status: "in_progress",
          label: "Order Confirmed",
          description: "Your order has been confirmed by the store",
          completed: true,
          timestamp: "2024-01-15 10:30",
        },
        {
          status: "completed",
          label: "Order Prepared",
          description: "Store is preparing your order",
          completed: false,
          timestamp: null,
        },
        {
          status: "in_delivery",
          label: "Out for Delivery",
          description: "Your order is on the way",
          completed: false,
          timestamp: null,
        },
        {
          status: "delivered",
          label: "Delivered",
          description: "Order delivered to recipient",
          completed: false,
          timestamp: null,
        },
      ],
    },
    {
      id: "ORD-002",
      storeName: "Aleppo Sweets Palace",
      items: [{ name: "Baklava Box", quantity: 1, price: 35.99 }],
      total: 35.99,
      status: "in_delivery",
      orderDate: "2024-01-12",
      estimatedDelivery: "2024-01-16",
      recipientName: "Omar Mahmoud",
      recipientAddress: "Aleppo, Salaheddine, Street 8, Apartment 12",
      trackingSteps: [
        {
          status: "in_progress",
          label: "Order Confirmed",
          description: "Your order has been confirmed by the store",
          completed: true,
          timestamp: "2024-01-12 14:20",
        },
        {
          status: "completed",
          label: "Order Prepared",
          description: "Store has prepared your order",
          completed: true,
          timestamp: "2024-01-13 09:15",
        },
        {
          status: "in_delivery",
          label: "Out for Delivery",
          description: "Your order is on the way",
          completed: true,
          timestamp: "2024-01-15 11:00",
        },
        {
          status: "delivered",
          label: "Delivered",
          description: "Order delivered to recipient",
          completed: false,
          timestamp: null,
        },
      ],
    },
    {
      id: "ORD-003",
      storeName: "Beauty Corner Homs",
      items: [{ name: "Luxury Perfume", quantity: 1, price: 89.99 }],
      total: 89.99,
      status: "delivered",
      orderDate: "2024-01-08",
      estimatedDelivery: "2024-01-12",
      recipientName: "Fatima Al-Din",
      recipientAddress: "Homs, Al-Waer, Street 22, House 45",
      trackingSteps: [
        {
          status: "in_progress",
          label: "Order Confirmed",
          description: "Your order has been confirmed by the store",
          completed: true,
          timestamp: "2024-01-08 16:45",
        },
        {
          status: "completed",
          label: "Order Prepared",
          description: "Store has prepared your order",
          completed: true,
          timestamp: "2024-01-09 10:30",
        },
        {
          status: "in_delivery",
          label: "Out for Delivery",
          description: "Your order was on the way",
          completed: true,
          timestamp: "2024-01-11 08:20",
        },
        {
          status: "delivered",
          label: "Delivered",
          description: "Order delivered successfully",
          completed: true,
          timestamp: "2024-01-12 15:30",
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusOptions = [
    {
      value: "in_progress",
      label: "In Progress",
      color: "bg-blue-100 text-blue-800",
      icon: Clock,
    },
    {
      value: "completed",
      label: "Completed",
      color: "bg-purple-100 text-purple-800",
      icon: Package,
    },
    {
      value: "in_delivery",
      label: "In Delivery",
      color: "bg-orange-100 text-orange-800",
      icon: Truck,
    },
    {
      value: "delivered",
      label: "Delivered",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.recipientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusInfo = (status) => {
    return (
      statusOptions.find((opt) => opt.value === status) || statusOptions[0]
    );
  };

  const getProgressPercentage = (steps) => {
    const completedSteps = steps.filter((step) => step.completed).length;
    return (completedSteps / steps.length) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Order Tracking</h2>
        <p className="text-gray-600">Track the status of your gift orders</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders, stores, or recipients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const statusInfo = getStatusInfo(order.status);
          const StatusIcon = statusInfo.icon;
          const progress = getProgressPercentage(order.trackingSteps);

          return (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order {order.id}
                    </h3>
                    <p className="text-sm text-gray-600">{order.storeName}</p>
                    <p className="text-sm text-gray-500">
                      Ordered on{" "}
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
                    >
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusInfo.label}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Total: ${order.total}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(progress)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {item.quantity}x {item.name} - ${item.price}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Recipient Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Delivery Information
                  </h4>
                  <p className="text-sm text-gray-600">{order.recipientName}</p>
                  <p className="text-sm text-gray-600">
                    {order.recipientAddress}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Expected delivery:{" "}
                    {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>

                {/* Tracking Steps */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">
                    Tracking Details:
                  </h4>
                  <div className="space-y-2">
                    {order.trackingSteps.map((step, index) => {
                      const StepIcon = getStatusInfo(step.status).icon;
                      return (
                        <div
                          key={index}
                          className={`flex items-start space-x-3 p-2 rounded-lg ${
                            step.completed ? "bg-green-50" : "bg-gray-50"
                          }`}
                        >
                          <div
                            className={`p-1 rounded-full ${
                              step.completed
                                ? "bg-green-200 text-green-700"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            <StepIcon className="h-3 w-3" />
                          </div>
                          <div className="flex-1">
                            <p
                              className={`text-sm font-medium ${
                                step.completed
                                  ? "text-green-900"
                                  : "text-gray-600"
                              }`}
                            >
                              {step.label}
                            </p>
                            <p
                              className={`text-xs ${
                                step.completed
                                  ? "text-green-700"
                                  : "text-gray-500"
                              }`}
                            >
                              {step.description}
                            </p>
                            {step.timestamp && (
                              <p className="text-xs text-gray-400 mt-1">
                                {step.timestamp}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter
                ? "Try adjusting your search or filter criteria"
                : "Your orders will appear here once you place them"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderTracking;
