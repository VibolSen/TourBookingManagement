"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import { Compass, CalendarDays, Landmark, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tag: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const ServiceCard = ({ title, description, imageUrl, link, tag, Icon }: ServiceCardProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
      className="group relative flex flex-col justify-between h-[450px] w-full max-w-sm rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/20 transition-all duration-300 overflow-hidden m-auto cursor-pointer"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />

      {/* Image Section with Overlay */}
      <div className="relative w-full h-52 overflow-hidden bg-slate-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Soft Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent z-10" />

        {/* Tag Badge */}
        <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-blue-600 backdrop-blur-sm border border-white/20 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          {tag}
        </span>

        {/* Glassmorphic Icon Circle */}
        <div className="absolute bottom-4 right-4 z-20 h-12 w-12 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="font-bold text-xl text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
            {description}
          </p>
        </div>

        {/* Footer Link / Button */}
        <div className="pt-4 mt-auto border-t border-slate-50 flex items-center">
          <Link href={link} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-150">
            Explore Service
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const { user } = useAuthStore();
  const params = useParams();
  
  // Resolve User ID for navigation
  const loggedInUserId = user?._id || user?.id;
  const singleId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const resolvedId = singleId || loggedInUserId || "";
  const isValidId = resolvedId && /^[0-9a-fA-F]{24}$/.test(resolvedId);

  const getServiceLink = (path: string) => {
    return isValidId ? `/profile/${resolvedId}${path}` : `/login?redirect=services${path}`;
  };

  const services = [
    {
      title: "Local Culture & Heritage",
      tag: "Culture",
      description:
        "Immerse yourself in Cambodia's rich cultural tapestry. Experience traditional Apsara dances, authentic Khmer cooking classes, artisan handicraft workshops, and meaningful community-led village tours.",
      imageUrl: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=800&q=80",
      link: getServiceLink("/services/local-culture"),
      Icon: Compass,
    },
    {
      title: "Festivals & Local Events",
      tag: "Celebration",
      description:
        "Join the vibrant rhythms of Cambodian celebrations. Participate in events like the traditional Water Festival (Bon Om Touk), Cambodian New Year, sacred ceremonies, and seasonal local gatherings.",
      imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      link: getServiceLink("/services/local-events"),
      Icon: CalendarDays,
    },
    {
      title: "Ancient Historical Sites",
      tag: "History",
      description:
        "Journey back in time with expert historians. Traverse the awe-inspiring ruins of Angkor Wat, explore the smiling giant stone faces of Bayon temple, and discover hidden jungle temples off the beaten path.",
      imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
      link: getServiceLink("/services/historical-sites"),
      Icon: Landmark,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-20 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest text-blue-600 uppercase"
          >
            Our Offerings
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            We Offer Best Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 text-base leading-relaxed"
          >
            Discover carefully curated local experiences, traditional events, and ancient heritage packages designed to create lifelong memories.
          </motion.p>
        </div>

        {/* Grid Container */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              tag={service.tag}
              description={service.description}
              imageUrl={service.imageUrl}
              link={service.link}
              Icon={service.Icon}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;