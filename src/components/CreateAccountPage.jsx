import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("customer");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          phone_number: formData.phoneNumber.trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: accountType,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Registration failed.");
      } else {
        setSuccess("Account created successfully!");
        setTimeout(() => {
     
          if (accountType === "customer") {
            navigate("/clientinterface");
          } else {
            navigate("/store-dashboard");
          }
        }, 1000);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="create-account-page-root"
      className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white shadow-xl border border-purple-100">
          <CardHeader className="relative pb-4">
            <button
              onClick={handleBackToHome}
              className="absolute left-4 top-4 text-purple-400 hover:text-purple-600"
            >
              ← Back
            </button>
            <div className="flex justify-center mb-4">
              <img
                src="/images/logo.png"
                alt="Easy Logo"
                className="h-16 w-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Join Easy Shopping
            </h2>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input
                type="text"
                placeholder="Enter your first name"
                className="w-full border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Input
                type="text"
                placeholder="Enter your last name"
                className="w-full border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                placeholder="Create a password"
                className="w-full border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                className="w-full border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Account Type
              </label>
              <select
                className="w-full p-2 border border-purple-200 rounded-md focus:border-purple-500 focus:ring-purple-500 bg-white"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="customer">Customer</option>
                <option value="shop_owner">Shop Owner</option>
              </select>
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6"
              onClick={handleCreateAccount}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-purple-300 hover:bg-purple-50 text-gray-700"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={handleSwitchToLogin}
                  className="text-purple-600 hover:text-purple-700 hover:underline font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateAccountPage;
