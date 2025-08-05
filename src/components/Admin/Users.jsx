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

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      name: "Alice Brown",
      type: "Customer",
      status: "Active",
      joinDate: "2024-01-10",
    },
    {
      id: 2,
      name: "Bob Wilson",
      type: "Store Owner",
      status: "Active",
      joinDate: "2024-01-08",
    },
    {
      id: 3,
      name: "Carol Davis",
      type: "Super Admin",
      status: "Active",
      joinDate: "2024-01-05",
    },
  ]);

  return (
    <div className="space-y-6 bg-white">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage all users and user types on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">Type: {user.type}</p>
                  <p className="text-xs text-gray-500">
                    Joined: {user.joinDate}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={user.status === "Active" ? "default" : "secondary"}
                  >
                    {user.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Edit
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
    </div>
  );
};

export default Users;
