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

const Complaints = () => {
  const [complaints] = useState([
    {
      id: 1,
      customer: "John Doe",
      issue: "Delayed delivery",
      status: "pending",
      date: "2024-01-15",
    },
    {
      id: 2,
      customer: "Jane Smith",
      issue: "Wrong item received",
      status: "resolved",
      date: "2024-01-14",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      issue: "Payment issue",
      status: "in-progress",
      date: "2024-01-13",
    },
  ]);

  return (
    <div className="space-y-6 bg-white">
      <Card>
        <CardHeader>
          <CardTitle>Customer Complaints</CardTitle>
          <CardDescription>View and manage customer complaints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{complaint.customer}</p>
                  <p className="text-sm text-gray-600">{complaint.issue}</p>
                  <p className="text-xs text-gray-500">{complaint.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      complaint.status === "resolved"
                        ? "default"
                        : complaint.status === "pending"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {complaint.status}
                  </Badge>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Complaints;
