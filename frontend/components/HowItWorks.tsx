"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UserPlus, FolderPlus, CalendarRange, Coins, ArrowRight, Loader2 } from "lucide-react";

export default function HowItWorks() {
  const { user, isAuthenticated, editUser } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    if (loading) return;

    if (!isAuthenticated || !user) {
      router.push("/signup");
      return;
    }

    const id = user._id || user.id;

    if (user.role === "subadmin") {
      router.push(`/company/${id}/dashboard`);
      return;
    }

    if (user.role === "admin") {
      router.push(`/admin/${id}/dashboard-admin`);
      return;
    }

    // Upgrade normal user to "subadmin"
    setLoading(true);
    try {
      await editUser(id, user.name, user.email, "subadmin", "approved");
      router.push(`/company/${id}/dashboard`);
    } catch (error) {
      console.error("Failed to upgrade user to supplier:", error);
      alert("Failed to become a supplier. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      stepNumber: "01",
      title: "Sign Up & Verify Profile",
      description: "Fill out a simple onboarding form to establish your business account. We verify credentials to protect platform integrity.",
      Icon: UserPlus,
      color: "group-hover:bg-blue-600 group-hover:text-white",
    },
    {
      stepNumber: "02",
      title: "Create Your Listings",
      description: "Upload descriptions, package prices, itineraries, and gorgeous photos. Showcase the best experiences you have to offer.",
      Icon: FolderPlus,
      color: "group-hover:bg-emerald-600 group-hover:text-white",
    },
    {
      stepNumber: "03",
      title: "Coordinate Reservations",
      description: "Accept, schedule, and track customer bookings directly from your tailored supplier dashboard panel in real-time.",
      Icon: CalendarRange,
      color: "group-hover:bg-indigo-600 group-hover:text-white",
    },
    {
      stepNumber: "04",
      title: "Earn & Grow Capital",
      description: "Receive direct, secured payouts for finalized excursions. Benefit from our scaling network of enthusiastic travelers.",
      Icon: Coins,
      color: "group-hover:bg-violet-600 group-hover:text-white",
    },
  ];

  // Dynamic button label for better user experience
  const getButtonText = () => {
    if (loading) return "Registering...";
    if (!isAuthenticated) return "Get Started as Supplier";
    if (user?.role === "subadmin") return "Go to Supplier Dashboard";
    if (user?.role === "admin") return "Go to Admin Dashboard";
    return "Register as Supplier";
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-20 bg-gradient-to-b from-slate-50/50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest text-blue-600 uppercase"
          >
            Partnership Program
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            Empower Your Tour Business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 text-sm sm:text-base leading-relaxed"
          >
            Join our global booking platform. List your unique travel packages, reach thousands of active travelers, and coordinate reservations effortlessly.
          </motion.p>
        </div>

        {/* Dynamic Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => {
            const IconComponent = step.Icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative flex flex-col p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-500/10 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Visual Connector Lines on Desktop */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-12 left-[85%] w-[35%] h-[1px] border-t border-dashed border-slate-200 z-0 group-hover:border-slate-300 transition-colors" />
                )}

                {/* Header Row */}
                <div className="flex justify-between items-center z-10">
                  <span className="text-xs font-extrabold text-slate-300 group-hover:text-blue-500/30 transition-colors">
                    {step.stepNumber}
                  </span>
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-slate-50 text-slate-600 transition-all duration-300 ${step.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-extrabold text-lg text-slate-800 group-hover:text-blue-600 transition-colors duration-200 mt-6 mb-2 z-10">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed z-10">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Registration Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center gap-4 mt-16"
        >
          <button
            onClick={handleGetStarted}
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed group"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {getButtonText()}
            {!loading && <ArrowRight className="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />}
          </button>
          
          <span className="text-xs text-slate-400">
            No upfront setup fees. Access your partner dashboard immediately.
          </span>
        </motion.div>

      </div>
    </section>
  );
}
