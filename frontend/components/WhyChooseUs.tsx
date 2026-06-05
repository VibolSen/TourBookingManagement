"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag, ShieldCheck, Compass, Headphones, ArrowRight } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Competitive Pricing",
      description: "We negotiate directly with local suppliers to offer you the best possible rates with zero hidden fees.",
      Icon: Tag,
      color: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    },
    {
      title: "Secure Booking",
      description: "Your peace of mind is our priority. All transactions are protected by industry-standard encryption protocols.",
      Icon: ShieldCheck,
      color: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    },
    {
      title: "Seamless Experience",
      description: "Easily manage, customize, and track your travel bookings in real-time from any device.",
      Icon: Compass,
      color: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
    },
    {
      title: "24/7 Expert Support",
      description: "Our local experts and customer care team are available around the clock to support your journey.",
      Icon: Headphones,
      color: "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white",
    },
  ];

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Section Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 lg:max-w-md"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                We Provide the Best Travel Experiences
              </h2>
            </div>
            
            <p className="text-slate-500 text-sm leading-relaxed">
              We are dedicated to making travel planning simple, secure, and memorable. From curation to coordination, our platform connects you with authentic experiences supported by premium safety and service.
            </p>
            
            <div className="pt-2">
              <Link
                href="/allTopTours"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 group active:scale-95"
              >
                Explore Tours
                <ArrowRight className="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column - 2x2 Feature Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-2"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.Icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative flex flex-col p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-500/10 hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-blue-500/5 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon Wrapper */}
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${feature.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;