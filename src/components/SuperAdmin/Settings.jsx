import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Settings = () => {
  return (
    <div className="space-y-6 bg-white">
      <Card>
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
          <CardDescription>Configure global platform settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Platform Name</label>
            <Input defaultValue="Easy Shopping Platform" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Support Email</label>
            <Input defaultValue="support@easyshop.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Maximum File Upload Size (MB)
            </label>
            <Input type="number" defaultValue="50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Session Timeout (minutes)
            </label>
            <Input type="number" defaultValue="30" />
          </div>
          <Button className="w-full">Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
