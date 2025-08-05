import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customerName: "Ahmad Hassan",
      customerEmail: "ahmad@example.com",
      customerPhone: "+963 11 123 4567",
      recipientName: "Sara Hassan",
      recipientAddress: "Damascus, Al-Mazzeh, Street 15, Building 3",
      recipientPhone: "+963 11 987 6543",
      items: [
        { name: "Wireless Headphones", quantity: 1, price: 99.99 },
        { name: "Phone Case", quantity: 2, price: 15.99 },
      ],
      total: 131.97,
      status: "in_progress",
      orderDate: "2024-01-15",
      estimatedDelivery: "2024-01-18",
    },
    {
      id: "ORD-002",
      customerName: "Layla Mahmoud",
      customerEmail: "layla@example.com",
      customerPhone: "+963 21 456 7890",
      recipientName: "Omar Mahmoud",
      recipientAddress: "Aleppo, Salaheddine, Street 8, Apartment 12",
      recipientPhone: "+963 21 654 3210",
      items: [{ name: "Gaming Console", quantity: 1, price: 399.99 }],
      total: 399.99,
      status: "in_delivery",
      orderDate: "2024-01-12",
      estimatedDelivery: "2024-01-16",
    },
    {
      id: "ORD-003",
      customerName: "Nour Al-Din",
      customerEmail: "nour@example.com",
      customerPhone: "+963 31 789 0123",
      recipientName: "Fatima Al-Din",
      recipientAddress: "Homs, Al-Waer, Street 22, House 45",
      recipientPhone: "+963 31 321 0987",
      items: [{ name: "Smartphone", quantity: 1, price: 599.99 }],
      total: 599.99,
      status: "delivered",
      orderDate: "2024-01-10",
      estimatedDelivery: "2024-01-14",
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
    },
    {
      value: "completed",
      label: "Completed",
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "in_delivery",
      label: "In Delivery",
      color: "bg-orange-100 text-orange-800",
    },
    {
      value: "delivered",
      label: "Delivered",
      color: "bg-green-100 text-green-800",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.recipientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "in_progress":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <Package className="h-4 w-4" />;
      case "in_delivery":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find((opt) => opt.value === status);
    return statusOption ? statusOption.color : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <p className="text-gray-600">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders, customers, or recipients..."
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
        {filteredOrders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order {order.id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    <span className="ml-1">
                      {
                        statusOptions.find((s) => s.value === order.status)
                          ?.label
                      }
                    </span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {/* Customer Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    Customer
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{order.customerName}</p>
                    <p>{order.customerEmail}</p>
                    <p>{order.customerPhone}</p>
                  </div>
                </div>

                {/* Recipient Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Recipient
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{order.recipientName}</p>
                    <p>{order.recipientAddress}</p>
                    <p>{order.recipientPhone}</p>
                  </div>
                </div>

                {/* Order Details */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Package className="h-4 w-4 mr-1" />
                    Items
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    {order.items.map((item, index) => (
                      <p key={index}>
                        {item.quantity}x {item.name} - ${item.price}
                      </p>
                    ))}
                    <p className="font-medium text-gray-900 pt-1">
                      Total: ${order.total}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  Estimated delivery:{" "}
                  {new Date(order.estimatedDelivery).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusUpdate(order.id, e.target.value)
                    }
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
                : "Orders will appear here when customers place them"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderManagement;
