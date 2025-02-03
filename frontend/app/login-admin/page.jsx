"use client";

import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import { useAdminStore } from "../../store/adminStore";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();
  const { loginAdmin } = useAdminStore(); // Admin login function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = await loginAdmin(email, password); // Assuming loginAdmin returns user data
      if (user && user._id) {
        router.push(`/admin/${user._id}/dashboard-admin`);
      } else {
        setError("Unable to retrieve user information.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex bg-white rounded-lg shadow-lg w-[900px] overflow-hidden">
        {/* Left Side: Form */}
        <div className="w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Welcome Back!</h1>
          <p className="text-sm text-center mb-6 text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 underline">
              Sign up
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500 mr-2"
                />
                Remember me
              </label>
              <a href="/forgot-password" className="text-blue-500 underline">
                Forgot password?
              </a>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-4 text-gray-500">or continue with</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Login */}
          <div className="flex space-x-4">
            <Button className="flex-1 bg-blue-600 text-white flex items-center justify-center space-x-1">
              <img src="/facebook.png" alt="Facebook" className="w-10 h-10" />
              <span>Facebook</span>
            </Button>
            <Button className="flex-1 bg-blue-600 text-white flex items-center justify-center space-x-1">
              <img src="/google.png" alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </Button>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="w-1/2 bg-gray-50 flex items-center justify-center">
          <img src="/form.png" alt="Login Illustration" className="w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
