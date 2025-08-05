import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";

const System = () => {
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    newRegistrations: true,
    autoApproveStores: false,
    enableNotifications: true,
  });

  const handleSystemSettingChange = (setting, value) => {
    setSystemSettings((prev) => ({ ...prev, [setting]: value }));
  };

  return (
    <div className="space-y-6 bg-white">
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>
            Manage core system settings and features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Maintenance Mode</label>
              <p className="text-xs text-gray-500">
                Temporarily disable the platform for maintenance
              </p>
            </div>
            <Switch
              checked={systemSettings.maintenanceMode}
              onCheckedChange={(value) =>
                handleSystemSettingChange("maintenanceMode", value)
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">
                New User Registrations
              </label>
              <p className="text-xs text-gray-500">
                Allow new users to register on the platform
              </p>
            </div>
            <Switch
              checked={systemSettings.newRegistrations}
              onCheckedChange={(value) =>
                handleSystemSettingChange("newRegistrations", value)
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">
                Auto-Approve New Stores
              </label>
              <p className="text-xs text-gray-500">
                Automatically approve new store applications
              </p>
            </div>
            <Switch
              checked={systemSettings.autoApproveStores}
              onCheckedChange={(value) =>
                handleSystemSettingChange("autoApproveStores", value)
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">
                System Notifications
              </label>
              <p className="text-xs text-gray-500">
                Enable system-wide notifications
              </p>
            </div>
            <Switch
              checked={systemSettings.enableNotifications}
              onCheckedChange={(value) =>
                handleSystemSettingChange("enableNotifications", value)
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default System;
