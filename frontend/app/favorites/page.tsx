"use client";

import Link from "next/link";
import { Heart, Lock, ArrowRight } from "lucide-react";
import ProfileUser from "@/components/header/Navbar";
import Footer from "@/components/Footer";

export default function GuestFavoritesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30">
      <ProfileUser />
      
      <main className="flex-1 flex items-center justify-center p-6 md:p-12 my-10">
        <div className="relative max-w-lg w-full bg-white/80 backdrop-blur-md border border-slate-100 shadow-xl rounded-2xl p-8 md:p-12 text-center overflow-hidden">
          
          {/* Decorative Glowing Backdrop circles */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-rose-400/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-blue-400/15 rounded-full blur-3xl" />

          {/* Icon Container with heartbeat and keyhole lock effect */}
          <div className="relative mx-auto w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-8 shadow-inner animate-pulse">
            <Heart className="w-12 h-12 text-rose-500 fill-rose-100" />
            <div className="absolute bottom-1 right-1 bg-white p-2.5 rounded-full shadow-md border border-slate-100 flex items-center justify-center">
              <Lock className="w-4 h-4 text-slate-700" />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-4">
            Save Your Favorite Tours
          </h2>
          
          <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            Create an account or sign in to save your favorite destinations, track package pricing, and coordinate your next perfect holiday adventure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login" className="w-full sm:w-auto">
              <button className="w-full sm:w-60 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95">
                Sign In
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
            
            <Link href="/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-60 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl border border-slate-200 shadow-sm transition-all duration-200 active:scale-95">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
