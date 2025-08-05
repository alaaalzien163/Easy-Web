import React, { useState } from "react";
import { Store, TrendingUp, Download, History, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StoreWallet = ({
  balance = 1250.5,
  pendingBalance = 340.25,
  onWithdraw = () => {},
  storeName = "TechHub Damascus",
}) => {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [transactions] = useState([
    {
      id: 1,
      type: "received",
      amount: 50.0,
      customer: "Ahmad Hassan",
      date: "2024-01-15",
      status: "completed",
      adminShare: 7.5,
    },
    {
      id: 2,
      type: "received",
      amount: 125.0,
      customer: "Sara Al-Mahmoud",
      date: "2024-01-14",
      status: "completed",
      adminShare: 18.75,
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
      type: "received",
      amount: 75.25,
      customer: "Omar Khalil",
      date: "2024-01-12",
      status: "pending",
      adminShare: 11.29,
    },
  ]);

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

  const totalEarnings = transactions
    .filter((t) => t.type === "received" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalAdminShares = transactions
    .filter((t) => t.type === "received" && t.status === "completed")
    .reduce((sum, t) => sum + (t.adminShare || 0), 0);

  return (
    <div className="space-y-6 bg-white">
      {/* Store Wallet Balance */}
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Store className="h-6 w-6" />
            <span>{storeName} Wallet</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-green-100 text-sm">Available Balance</p>
              <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
            </div>
            <div>
              <p className="text-green-100 text-sm">Pending Balance</p>
              <div className="text-2xl font-bold">
                ${pendingBalance.toFixed(2)}
              </div>
            </div>
          </div>
          <Button
            onClick={() => setShowWithdraw(true)}
            className="bg-white text-green-600 hover:bg-gray-100"
          >
            <Download className="h-4 w-4 mr-2" />
            Withdraw Funds
          </Button>
        </CardContent>
      </Card>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-xl font-bold text-green-600">
                  ${totalEarnings.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admin Shares Paid</p>
                <p className="text-xl font-bold text-purple-600">
                  ${totalAdminShares.toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net Earnings</p>
                <p className="text-xl font-bold text-blue-600">
                  ${(totalEarnings - totalAdminShares).toFixed(2)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Withdraw Modal */}
      {showWithdraw && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Withdraw Funds</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Amount ($ - Max: ${balance.toFixed(2)})
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                placeholder="Enter withdrawal amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                max={balance}
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
            <span>Transaction History</span>
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
                    {transaction.type === "received"
                      ? "Payment from"
                      : "Withdrawal"}
                    {transaction.customer && ` ${transaction.customer}`}
                  </p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                  {transaction.adminShare && (
                    <p className="text-xs text-purple-600">
                      Admin share: ${transaction.adminShare.toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transaction.type === "withdrawal"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {transaction.type === "withdrawal" ? "-" : "+"}$
                    {transaction.amount.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm capitalize ${
                      transaction.status === "completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
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

export default StoreWallet;
