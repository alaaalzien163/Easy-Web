import React, { useState } from "react";
import { Wallet, Plus, Send, History, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomerWallet = ({
  balance = 250.75,
  onAddFunds = () => {},
  onSendFunds = () => {},
}) => {
  const [addAmount, setAddAmount] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showSendFunds, setShowSendFunds] = useState(false);

  const [transactions] = useState([
    {
      id: 1,
      type: "sent",
      amount: 50.0,
      recipient: "TechHub Damascus",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      type: "added",
      amount: 100.0,
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 3,
      type: "sent",
      amount: 25.5,
      recipient: "Beauty Corner Homs",
      date: "2024-01-13",
      status: "completed",
    },
  ]);

  const handleAddFunds = () => {
    if (addAmount && parseFloat(addAmount) > 0) {
      onAddFunds(parseFloat(addAmount));
      setAddAmount("");
      setShowAddFunds(false);
    }
  };

  const handleSendFunds = () => {
    if (sendAmount && parseFloat(sendAmount) > 0 && recipient) {
      onSendFunds(parseFloat(sendAmount), recipient);
      setSendAmount("");
      setRecipient("");
      setShowSendFunds(false);
    }
  };

  return (
    <div className="space-y-6 bg-white">
      {/* Wallet Balance */}
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-6 w-6" />
            <span>My Wallet</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-4">${balance.toFixed(2)}</div>
          <div className="flex space-x-3">
            <Button
              onClick={() => setShowAddFunds(true)}
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Funds
            </Button>
            <Button
              onClick={() => setShowSendFunds(true)}
              variant="outline"
              className="border-white text-white hover:bg-white/20"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Funds
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Add Funds to Wallet</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Amount ($)
              </label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddFunds} className="flex-1">
                Add Funds
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddFunds(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Send Funds Modal */}
      {showSendFunds && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="h-5 w-5" />
              <span>Send Funds</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Recipient
              </label>
              <Input
                placeholder="Store name or recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Amount ($)
              </label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSendFunds} className="flex-1">
                Send Funds
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSendFunds(false)}
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
                    {transaction.type === "sent" ? "Sent to" : "Added funds"}
                    {transaction.recipient && ` ${transaction.recipient}`}
                  </p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transaction.type === "sent"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {transaction.type === "sent" ? "-" : "+"}$
                    {transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
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

export default CustomerWallet;
