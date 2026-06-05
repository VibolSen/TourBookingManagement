"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Next.js Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden p-4 sm:p-6 md:p-8">
      {/* Decorative Glow Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* Error Card Container */}
      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl text-center space-y-6 z-10">
        <div className="h-16 w-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">Something Went Wrong</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            An unexpected error occurred during rendering. If you are developing, please check the terminal console logs for details.
          </p>
        </div>

        {/* Error Detail Display (safe for development) */}
        {error.message && (
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 text-left max-h-32 overflow-y-auto">
            <span className="text-xs font-mono text-red-400 leading-relaxed block break-all">
              {error.message}
            </span>
          </div>
        )}

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={() => reset()}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>

          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="w-full border-slate-800 hover:bg-slate-800/40 text-slate-200 font-medium py-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
