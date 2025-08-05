import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const Reports = () => {
  return (
    <div className="space-y-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Reports</CardTitle>
            <CardDescription>
              Comprehensive sales statistics and trends
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Daily Sales Average</span>
              <span className="font-bold">$4,180</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Weekly Growth</span>
              <span className="font-bold text-green-600">+15.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Top Performing Category</span>
              <span className="font-bold">Electronics</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Customer Retention Rate</span>
              <span className="font-bold">78.5%</span>
            </div>
            <Button className="w-full" variant="outline">
              Generate Full Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Statistics</CardTitle>
            <CardDescription>
              Overall platform performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Transactions</span>
              <span className="font-bold">2,847</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Success Rate</span>
              <span className="font-bold text-green-600">96.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Average Order Value</span>
              <span className="font-bold">$87.50</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Customer Satisfaction</span>
              <span className="font-bold">4.6/5</span>
            </div>
            <Button className="w-full" variant="outline">
              Export Statistics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
