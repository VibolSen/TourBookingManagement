"use client";

import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signup, isLoading, error } = useAuthStore();
  const router = useRouter();

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      router.push("/verify-email");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="h-screen w-screen max-h-screen max-w-full flex items-center justify-center bg-slate-50/70 relative overflow-hidden p-4 sm:p-6 md:p-8">
      {/* Decorative Glow Circles */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      {/* Back to Home Navigation */}
      <Link 
        href="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors duration-150 group"
      >
        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      {/* Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex bg-white border border-slate-200/80 rounded-3xl shadow-xl w-full max-w-[950px] h-[90%] max-h-[600px] overflow-hidden z-10"
      >
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center overflow-hidden h-full">
          <div className="max-w-md w-full mx-auto space-y-3">
            <div className="space-y-0.5 text-center md:text-left">
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Create an account</h1>
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-500 font-semibold transition-colors duration-150">
                  Login
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5">
              {/* Name Input */}
              <div className="space-y-0.5">
                <Label htmlFor="name" className="text-slate-600 text-[11px] font-semibold">Name</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-slate-50/50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl py-3 text-sm h-10"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-0.5">
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
              <div className="space-y-0.5">
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center text-xs pt-0.5">
                <label className="flex items-center text-slate-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600 bg-white border-slate-300 rounded mr-2 h-3.5 w-3.5"
                    required
                  />
                  I agree to the Terms & Privacy Policy
                </label>
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
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-3">
              <hr className="flex-grow border-slate-200" />
              <span className="mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">or continue with</span>
              <hr className="flex-grow border-slate-200" />
            </div>

            {/* Google Registration */}
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
            src="https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=1200&q=80" 
            alt="Scenic Cambodia Landscape" 
            fill 
            className="object-cover"
            priority
          />
          {/* Cover Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent z-10" />

          {/* Inspirational Text overlay */}
          <div className="absolute inset-x-6 bottom-8 z-20 space-y-2 bg-white/90 backdrop-blur-md border border-slate-100 p-5 rounded-2xl shadow-lg">
            <h3 className="text-slate-800 text-base font-bold">Your Journey Begins Here</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Create an account to browse thousands of local tour attractions, configure preferences, and bookmark your next travel destinations.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
