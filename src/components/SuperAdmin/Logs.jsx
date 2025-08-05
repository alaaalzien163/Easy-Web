import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

const Logs = () => {
  const [systemLogs] = useState([
    {
      id: 1,
      action: "User Registration",
      user: "Alice Brown",
      timestamp: "2024-01-15 14:30",
      status: "Success",
    },
    {
      id: 2,
      action: "Store Approval",
      user: "Admin John",
      timestamp: "2024-01-15 13:15",
      status: "Success",
    },
    {
      id: 3,
      action: "Payment Processing",
      user: "System",
      timestamp: "2024-01-15 12:45",
      status: "Failed",
    },
    {
      id: 4,
      action: "Database Backup",
      user: "System",
      timestamp: "2024-01-15 02:00",
      status: "Success",
    },
  ]);

  return (
    <div className="space-y-6 bg-white">
      <Card>
        <CardHeader>
          <CardTitle>System Activity Logs</CardTitle>
          <CardDescription>
            Monitor all system activities and events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{log.action}</p>
                  <p className="text-sm text-gray-600">User: {log.user}</p>
                  <p className="text-xs text-gray-500">{log.timestamp}</p>
                </div>
                <Badge
                  variant={log.status === "Success" ? "default" : "destructive"}
                >
                  {log.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;
