import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

const Stores = () => {
  const [stores] = useState([
    {
      id: 1,
      name: "Tech Store",
      owner: "Bob Wilson",
      commission: "15%",
      sales: "$12,500",
      status: "Active",
    },
    {
      id: 2,
      name: "Fashion Hub",
      owner: "Sarah Lee",
      commission: "12%",
      sales: "$8,750",
      status: "Pending",
    },
    {
      id: 3,
      name: "Home Goods",
      owner: "Tom Clark",
      commission: "18%",
      sales: "$15,200",
      status: "Active",
    },
  ]);

  return (
    <div className="space-y-6 bg-white">
      <Card>
        <CardHeader>
          <CardTitle>Store Management</CardTitle>
          <CardDescription>
            Supervise and manage all stores on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stores.map((store) => (
              <div
                key={store.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{store.name}</p>
                  <p className="text-sm text-gray-600">Owner: {store.owner}</p>
                  <p className="text-sm text-gray-600">
                    Sales: {store.sales} | Commission: {store.commission}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      store.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {store.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Store Investment Conditions</CardTitle>
          <CardDescription>
            Set conditions for stores that invest in the system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Minimum Investment Amount ($)
            </label>
            <Input type="number" placeholder="5000" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Investment Benefits</label>
            <Textarea placeholder="Describe benefits for investing stores" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Reduced Commission Rate (%)
            </label>
            <Input type="number" placeholder="10" />
          </div>
          <Button className="w-full">Update Conditions</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stores;
