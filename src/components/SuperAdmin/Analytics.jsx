import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const Analytics = ({
  platformStats = {
    totalRevenue: "$1,245,680",
    totalUsers: 15847,
    dailyTransactions: 1247,
  },
}) => {
  return (
    <div className="space-y-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">
              {platformStats.totalRevenue}
            </div>
            <p className="text-sm text-green-600">+22.5% vs last month</p>
            <p className="text-xs text-gray-500">Average daily: $41,522</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">
              {platformStats.totalUsers.toLocaleString()}
            </div>
            <p className="text-sm text-blue-600">+8.7% growth rate</p>
            <p className="text-xs text-gray-500">New users today: 127</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">
              {platformStats.dailyTransactions.toLocaleString()}
            </div>
            <p className="text-sm text-purple-600">+15.3% vs yesterday</p>
            <p className="text-xs text-gray-500">Success rate: 98.2%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
