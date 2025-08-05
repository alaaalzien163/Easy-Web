import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import {
  Store,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  DollarSign,
} from "lucide-react";

const StoreManagement = () => {
  const [pendingStores, setPendingStores] = useState([
    {
      id: 1,
      name: "Electronics World",
      owner: "Ahmed Hassan",
      email: "ahmed@electronicsworld.com",
      phone: "+971-50-123-4567",
      category: "Electronics",
      registrationDate: "2024-01-15",
      businessLicense: "BL-2024-001",
      taxId: "TAX-UAE-12345",
      address: "Dubai Mall, Dubai, UAE",
      description:
        "Leading electronics retailer specializing in smartphones, laptops, and accessories.",
      expectedRevenue: "$50,000/month",
      documents: ["Business License", "Tax Certificate", "Trade License"],
    },
    {
      id: 2,
      name: "Fashion Boutique",
      owner: "Sara Al-Mahmoud",
      email: "sara@fashionboutique.com",
      phone: "+971-55-987-6543",
      category: "Fashion & Clothing",
      registrationDate: "2024-01-14",
      businessLicense: "BL-2024-002",
      taxId: "TAX-UAE-67890",
      address: "Mall of the Emirates, Dubai, UAE",
      description:
        "Premium fashion boutique offering latest trends in women's and men's clothing.",
      expectedRevenue: "$30,000/month",
      documents: ["Business License", "Tax Certificate", "Import License"],
    },
    {
      id: 3,
      name: "Home & Garden",
      owner: "Omar Khalil",
      email: "omar@homeandgarden.com",
      phone: "+971-52-456-7890",
      category: "Home & Garden",
      registrationDate: "2024-01-13",
      businessLicense: "BL-2024-003",
      taxId: "TAX-UAE-11111",
      address: "Ibn Battuta Mall, Dubai, UAE",
      description:
        "Complete home and garden solutions including furniture, decor, and gardening supplies.",
      expectedRevenue: "$25,000/month",
      documents: ["Business License", "Tax Certificate"],
    },
  ]);

  const [approvedStores] = useState([
    {
      id: 4,
      name: "Tech Store",
      owner: "Bob Wilson",
      email: "bob@techstore.com",
      category: "Electronics",
      approvalDate: "2024-01-10",
      status: "Active",
      monthlyRevenue: "$45,000",
      commission: "15%",
      totalSales: "$180,000",
    },
    {
      id: 5,
      name: "Fashion Hub",
      owner: "Sarah Lee",
      email: "sarah@fashionhub.com",
      category: "Fashion",
      approvalDate: "2024-01-08",
      status: "Active",
      monthlyRevenue: "$32,000",
      commission: "12%",
      totalSales: "$128,000",
    },
  ]);

  const [rejectedStores] = useState([
    {
      id: 6,
      name: "Questionable Goods",
      owner: "John Suspicious",
      email: "john@questionable.com",
      rejectionDate: "2024-01-12",
      reason: "Incomplete documentation and suspicious business practices",
      category: "General",
    },
  ]);

  const handleApproveStore = (storeId) => {
    setPendingStores((prev) => prev.filter((store) => store.id !== storeId));
    
    alert(`Store approved successfully!`);
  };

  const handleRejectStore = (storeId) => {
    setPendingStores((prev) => prev.filter((store) => store.id !== storeId));
    
    alert(`Store rejected successfully!`);
  };

  const StoreDetailsModal = ({ store, onApprove, onReject }) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              {store.name}
            </CardTitle>
            <CardDescription>Store Registration Details</CardDescription>
          </div>
          <Badge variant="outline">{store.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Owner Information</h4>
            <p className="text-sm">
              <strong>Name:</strong> {store.owner}
            </p>
            <p className="text-sm">
              <strong>Email:</strong> {store.email}
            </p>
            <p className="text-sm">
              <strong>Phone:</strong> {store.phone}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Business Information</h4>
            <p className="text-sm">
              <strong>License:</strong> {store.businessLicense}
            </p>
            <p className="text-sm">
              <strong>Tax ID:</strong> {store.taxId}
            </p>
            <p className="text-sm">
              <strong>Registration:</strong> {store.registrationDate}
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Business Details</h4>
          <p className="text-sm">
            <strong>Address:</strong> {store.address}
          </p>
          <p className="text-sm">
            <strong>Description:</strong> {store.description}
          </p>
          <p className="text-sm">
            <strong>Expected Revenue:</strong> {store.expectedRevenue}
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Documents Submitted</h4>
          <div className="flex flex-wrap gap-2">
            {store.documents.map((doc, index) => (
              <Badge key={index} variant="secondary">
                {doc}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            onClick={() => onApprove(store.id)}
            className="flex-1"
            variant="default"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve Store
          </Button>
          <Button
            onClick={() => onReject(store.id)}
            className="flex-1"
            variant="destructive"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject Store
          </Button>
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View Documents
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 bg-white">
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending Approval ({pendingStores.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved Stores ({approvedStores.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected Stores ({rejectedStores.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Store Registrations</CardTitle>
              <CardDescription>
                Review and approve or reject new store applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingStores.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No pending store registrations
                </p>
              ) : (
                <div className="space-y-4">
                  {pendingStores.map((store) => (
                    <StoreDetailsModal
                      key={store.id}
                      store={store}
                      onApprove={handleApproveStore}
                      onReject={handleRejectStore}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approved Stores</CardTitle>
              <CardDescription>
                Monitor and manage approved store accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvedStores.map((store) => (
                  <div
                    key={store.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{store.name}</p>
                      <p className="text-sm text-gray-600">
                        Owner: {store.owner}
                      </p>
                      <p className="text-sm text-gray-600">
                        Email: {store.email}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Approved: {store.approvalDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          Revenue: {store.monthlyRevenue}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">{store.status}</Badge>
                      <Badge variant="secondary">
                        Commission: {store.commission}
                      </Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="destructive">
                        Suspend
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Stores</CardTitle>
              <CardDescription>
                View stores that were rejected and reasons for rejection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rejectedStores.map((store) => (
                  <div
                    key={store.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-red-50"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{store.name}</p>
                      <p className="text-sm text-gray-600">
                        Owner: {store.owner}
                      </p>
                      <p className="text-sm text-gray-600">
                        Email: {store.email}
                      </p>
                      <p className="text-sm text-red-600">
                        Reason: {store.reason}
                      </p>
                      <p className="text-xs text-gray-500">
                        Rejected: {store.rejectionDate}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="destructive">Rejected</Badge>
                      <Button size="sm" variant="outline">
                        Review Again
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreManagement;
