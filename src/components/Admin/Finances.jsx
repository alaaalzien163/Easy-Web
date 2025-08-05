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
import { Separator } from "../ui/separator";

const Finances = () => {
  return (
    <div className="space-y-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>
              Track revenue, expenses, and profits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Revenue</span>
              <span className="font-bold text-green-600">$125,430</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span>Total Expenses</span>
              <span className="font-bold text-red-600">$45,200</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span>Net Profit</span>
              <span className="font-bold text-blue-600">$80,230</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span>Commission Earned</span>
              <span className="font-bold text-purple-600">$18,750</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission Settings</CardTitle>
            <CardDescription>
              Manage commission rates for stores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Default Commission Rate (%)
              </label>
              <Input type="number" placeholder="15" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Premium Store Rate (%)
              </label>
              <Input type="number" placeholder="12" />
            </div>
            <Button className="w-full">Update Rates</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Finances;
