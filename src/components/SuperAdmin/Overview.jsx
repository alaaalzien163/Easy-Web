import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Crown,
  Shield,
  Users,
  DollarSign,
  Store,
  BarChart3,
  Database,
  FileText,
  AlertTriangle,
} from "lucide-react";

const Overview = ({
  platformStats = {
    totalRevenue: "",
    totalUsers: "",
    totalStores: "",
    totalAdmins: "",
    systemUptime: "",
    dailyTransactions: "",
    serverLoad: "",
    storageUsed: "",
  },
}) => {
  return (
    <div className="space-y-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">
              {platformStats.totalRevenue}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {platformStats.totalUsers.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Stores</CardTitle>
            <Store className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {platformStats.totalStores}
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              {platformStats.systemUptime}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Real-time system performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Server Load</span>
              <span className="font-bold text-green-600">
                {platformStats.serverLoad}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Storage Used</span>
              <span className="font-bold text-blue-600">
                {platformStats.storageUsed}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Daily Transactions</span>
              <span className="font-bold">
                {platformStats.dailyTransactions.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Active Admins</span>
              <span className="font-bold">{platformStats.totalAdmins}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used administrative actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              System Security Scan
            </Button>
            <Button className="w-full" variant="outline">
              <Database className="mr-2 h-4 w-4" />
              Create Database Backup
            </Button>
            <Button className="w-full" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Platform Report
            </Button>
            <Button className="w-full" variant="outline">
              <AlertTriangle className="mr-2 h-4 w-4" />
              View System Alerts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
