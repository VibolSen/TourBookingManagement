"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await login(email, password);

      console.log("Logged-in User:", user);

      if (!user) {
        throw new Error("Invalid password or email. Please try again.");
      }

      setShowSuccessModal(true);

      setTimeout(() => {
        const { role, id } = user;

        if (!role) {
          throw new Error("User role is not defined");
        }

        if (role === "admin") {
          router.push(`/admin/${id}/dashboard-admin`);
        } else if (role === "subadmin") {
          if (!id) {
            throw new Error("User ID is required for subadmin redirection");
          }
          router.push(`/company/${id}/dashboard`);
        } else {
          router.push(`/profile/${id}/topcard`);
        }
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Login failed. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen max-h-screen max-w-full flex items-center justify-center bg-slate-50/70 relative overflow-hidden p-4 sm:p-6 md:p-8">
      {/* Decorative Glow Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      {/* Back to Home Navigation */}
      <Link 
        href="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors duration-150 group"
      >
        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border border-slate-100 p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full"
            >
              <div className="h-16 w-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Login Successful!</h2>
              <p className="text-slate-500">Preparing your dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex bg-white border border-slate-200/80 rounded-3xl shadow-xl w-full max-w-[950px] h-[90%] max-h-[600px] overflow-hidden z-10"
      >
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center overflow-hidden h-full">
          <div className="max-w-md w-full mx-auto space-y-4">
            <div className="space-y-0.5 text-center md:text-left">
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Welcome Back</h1>
              <p className="text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:text-blue-500 font-semibold transition-colors duration-150">
                  Sign up
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email Input */}
              <div className="space-y-1">
                <Label htmlFor="email" className="text-slate-600 text-[11px] font-semibold">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-50/50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl py-3 text-sm h-10"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <Label htmlFor="password" className="text-slate-600 text-[11px] font-semibold">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-slate-50/50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl py-3 text-sm h-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex justify-between items-center text-xs pt-0.5">
                <label className="flex items-center text-slate-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600 bg-white border-slate-300 rounded mr-2 h-3.5 w-3.5"
                  />
                  Remember me
                </label>
                <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-600 text-xs font-medium">
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-blue-500/10 active:scale-[0.99] text-sm h-10"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-3">
              <hr className="flex-grow border-slate-200" />
              <span className="mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">or continue with</span>
              <hr className="flex-grow border-slate-200" />
            </div>

            {/* Google Authentication */}
            <Button
              variant="outline"
              className="w-full border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-2.5 rounded-xl flex items-center justify-center space-x-2 transition-all duration-150 text-sm h-10"
              onClick={handleGoogleLogin}
            >
              <Image src="/google.png" alt="Google" width={16} height={16} className="w-4 h-4 object-contain" />
              <span>Google Workspace</span>
            </Button>
          </div>
        </div>

        {/* Right Side: Illustration & Cover */}
        <div className="hidden md:block w-1/2 relative bg-slate-50 h-full">
          <Image 
            src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80" 
            alt="Scenic Angkor Wat Sunset" 
            fill 
            className="object-cover"
            priority
          />
          {/* Cover Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent z-10" />

          {/* Inspirational Text overlay */}
          <div className="absolute inset-x-6 bottom-8 z-20 space-y-2 bg-white/90 backdrop-blur-md border border-slate-100 p-5 rounded-2xl shadow-lg">
            <h3 className="text-slate-800 text-base font-bold">Discover Cambodia</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Explore ancient temple ruins, experience local traditions, and celebrate dynamic community festivals. Log in to coordinate your bookings.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
