import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Database } from "lucide-react";

const Backup = () => {
  return (
    <div className="space-y-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Database Backup</CardTitle>
            <CardDescription>
              Manage database backups and restoration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">
                Last Backup: January 15, 2024 at 2:00 AM
              </p>
              <p className="text-sm text-green-600">Status: Successful</p>
              <p className="text-sm">Size: 2.4 GB</p>
            </div>
            <Separator />
            <Button className="w-full">
              <Database className="mr-2 h-4 w-4" />
              Create Manual Backup
            </Button>
            <Button className="w-full" variant="outline">
              Schedule Automatic Backups
            </Button>
            <Button className="w-full" variant="outline">
              Restore from Backup
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Export</CardTitle>
            <CardDescription>
              Export system data and configurations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">
              Export User Data
            </Button>
            <Button className="w-full" variant="outline">
              Export Transaction Records
            </Button>
            <Button className="w-full" variant="outline">
              Export System Logs
            </Button>
            <Button className="w-full" variant="outline">
              Export Configuration Files
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Backup;
