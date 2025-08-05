import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Lock } from "lucide-react";

const Security = () => {
  return (
    <div className="space-y-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Overview</CardTitle>
            <CardDescription>Monitor platform security status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Failed Login Attempts (24h)</span>
              <span className="font-bold text-red-600">23</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Suspicious Activities</span>
              <span className="font-bold text-yellow-600">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Active Sessions</span>
              <span className="font-bold text-green-600">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Security Score</span>
              <span className="font-bold text-blue-600">94/100</span>
            </div>
            <Button className="w-full" variant="outline">
              <Lock className="mr-2 h-4 w-4" />
              Run Security Audit
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Access Control</CardTitle>
            <CardDescription>
              Manage system access and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">
              View IP Whitelist
            </Button>
            <Button className="w-full" variant="outline">
              Manage API Keys
            </Button>
            <Button className="w-full" variant="outline">
              Two-Factor Authentication
            </Button>
            <Button className="w-full" variant="destructive">
              Emergency Lockdown
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Security;
