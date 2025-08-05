import React, { useState } from "react";
import {
  Shield,
  TrendingUp,
  Settings,
  History,
  DollarSign,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminWallet = ({
  balance = 2150.75,
  commissionRate = 15,
  onUpdateCommissionRate = () => {},
  onWithdraw = () => {},
}) => {
  const [newCommissionRate, setNewCommissionRate] = useState(
    commissionRate.toString(),
  );
  const [showSettings, setShowSettings] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showWithdraw, setShowWithdraw] = useState(false);

  const [transactions] = useState([
    {
      id: 1,
      type: "commission",
      amount: 7.5,
      store: "TechHub Damascus",
      customer: "Ahmad Hassan",
      originalAmount: 50.0,
      date: "2024-01-15",
      status: "auto-transferred",
    },
    {
      id: 2,
      type: "commission",
      amount: 18.75,
      store: "Fashion Hub",
      customer: "Sara Al-Mahmoud",
      originalAmount: 125.0,
      date: "2024-01-14",
      status: "auto-transferred",
    },
    {
      id: 3,
      type: "withdrawal",
      amount: 500.0,
      date: "2024-01-13",
      status: "completed",
    },
    {
      id: 4,
      type: "commission",
      amount: 11.29,
      store: "Home & Garden",
      customer: "Omar Khalil",
      originalAmount: 75.25,
      date: "2024-01-12",
      status: "auto-transferred",
    },
  ]);

  const handleUpdateCommissionRate = () => {
    const rate = parseFloat(newCommissionRate);
    if (rate >= 0 && rate <= 50) {
      onUpdateCommissionRate(rate);
      setShowSettings(false);
    }
  };

  const handleWithdraw = () => {
    if (
      withdrawAmount &&
      parseFloat(withdrawAmount) > 0 &&
      parseFloat(withdrawAmount) <= balance
    ) {
      onWithdraw(parseFloat(withdrawAmount));
      setWithdrawAmount("");
      setShowWithdraw(false);
    }
  };

  const totalCommissions = transactions
    .filter((t) => t.type === "commission")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyCommissions = transactions
    .filter(
      (t) =>
        t.type === "commission" &&
        new Date(t.date).getMonth() === new Date().getMonth(),
    )
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 bg-white">
      {/* Admin Wallet Balance */}
      <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-6 w-6" />
            <span>Admin Commission Wallet</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-purple-100 text-sm">Total Balance</p>
              <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
            </div>
            <div>
              <p className="text-purple-100 text-sm">Commission Rate</p>
              <div className="text-3xl font-bold">{commissionRate}%</div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={() => setShowWithdraw(true)}
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Withdraw
            </Button>
            <Button
              onClick={() => setShowSettings(true)}
              variant="outline"
              className="border-white text-white hover:bg-white/20"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Commission Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Commissions</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${totalCommissions.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-green-600">
                  ${monthlyCommissions.toFixed(2)}
                </p>
              </div>
              <Percent className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Settings Modal */}
      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Commission Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Commission Rate (% - Max: 50%)
              </label>
              <Input
                type="number"
                placeholder="Enter commission rate"
                value={newCommissionRate}
                onChange={(e) => setNewCommissionRate(e.target.value)}
                max="50"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                This rate will be automatically deducted from all store
                transactions
              </p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleUpdateCommissionRate} className="flex-1">
                Update Rate
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSettings(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Withdraw Funds</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Amount ($ - Max: ${balance.toFixed(2)})
              </label>
              <Input
                type="number"
                placeholder="Enter withdrawal amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleWithdraw} className="flex-1">
                Withdraw
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowWithdraw(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5" />
            <span>Commission History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {transaction.type === "commission"
                      ? "Commission from"
                      : "Withdrawal"}
                    {transaction.store && ` ${transaction.store}`}
                  </p>
                  {transaction.customer && (
                    <p className="text-sm text-gray-600">
                      Customer: {transaction.customer}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                  {transaction.originalAmount && (
                    <p className="text-xs text-gray-500">
                      From ${transaction.originalAmount.toFixed(2)} transaction
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transaction.type === "withdrawal"
                        ? "text-red-600"
                        : "text-purple-600"
                    }`}
                  >
                    {transaction.type === "withdrawal" ? "-" : "+"}$
                    {transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-green-500 capitalize">
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminWallet;
