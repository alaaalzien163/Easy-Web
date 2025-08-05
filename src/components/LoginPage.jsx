import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Invalid credentials");
      const data = await response.json();
      if (data && data.token && data.user && data.user.role) {
        localStorage.setItem("token", data.token);

        if (data.user.role === "admin") {
          navigate("/admin");
        } else if (data.user.role === "superadmin") {
          navigate("/superadmin");
        } else if (data.user.role === "customer") {
          navigate("/clientinterface");
        } else if (data.user.role === "shop_owner") {
          navigate("/store-dashboard");
        } else {
          setError("Unauthorized role");
        }
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToCreateAccount = () => {
    navigate("/create-account");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div
      id="login-page-root"
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
              Welcome Back
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="w-full border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center font-medium">
                {error}
              </div>
            )}
            <div className="text-right">
              <button className="text-sm text-purple-600 hover:text-purple-700 hover:underline">
                Forgot your password?
              </button>
            </div>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={handleSwitchToCreateAccount}
                  className="text-purple-600 hover:text-purple-700 hover:underline font-medium"
                  disabled={loading}
                >
                  Create one here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;