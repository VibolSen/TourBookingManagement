"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface NewsItem {
  id: number;
  imageUrl: string;
  title: string;
  date: string;
  category: string;
  description: string;
}

const FeatureNewsCard = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch data
  useEffect(() => {
    const staticNews: NewsItem[] = [
      {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        title: "Top Travel Destinations for This Summer",
        date: "2026-06-01",
        category: "Destinations",
        description: "Explore the most breathtaking beaches and secret forest getaways planned for this year's travel lists."
      },
      {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&w=800&q=80",
        title: "How to Pack Light for Short Trips",
        date: "2026-06-15",
        category: "Travel Tips",
        description: "Learn professional packing tips to fit everything into a single carry-on bag for weekend adventures."
      },
      {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
        title: "Safety Tips for Solo Adventurers",
        date: "2026-06-28",
        category: "Safety Guide",
        description: "Important details and advice for traveling alone safely in new cities and remote mountain trails."
      },
      {
        id: 4,
        imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        title: "The Ultimate Guide to Road Tripping",
        date: "2026-07-05",
        category: "Adventure",
        description: "Everything you need to know about preparing your vehicle, planning routes, and staying energized on the open road."
      },
      {
        id: 5,
        imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
        title: "Hidden Gems of Southeast Asia",
        date: "2026-07-12",
        category: "Destinations",
        description: "Escape the tourist crowds and explore these stunning off-the-beaten-path locations across Asia."
      },
      {
        id: 6,
        imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
        title: "Sustainable Travel Practices for 2026",
        date: "2026-07-20",
        category: "Ecotourism",
        description: "Simple changes you can make to minimize your environmental footprint and support local communities while exploring."
      }
    ];
    setNewsItems(staticNews);
    setLoading(false);
  }, []);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * itemsPerPage;
  const displayedItems = newsItems.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-20 bg-slate-50/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              Articles & News
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Feature News & Travel Insights
            </h2>
            <p className="text-slate-500 text-sm max-w-xl">
              Stay informed with the latest holiday advice, destination spotlights, and expert packing guides curated by our team.
            </p>
          </div>
          
          {/* Slick Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Page"
              className="flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-blue-600 hover:border-blue-500/30 transition-all duration-200 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Page"
              className="flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-blue-600 hover:border-blue-500/30 transition-all duration-200 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Animated Cards Grid */}
        <div className="min-h-[440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayedItems.map((item) => (
                <article
                  key={item.id}
                  className="group relative flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/10 transition-all duration-300"
                >
                  {/* Image Section */}
                  <div className="relative w-full h-52 overflow-hidden bg-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Glassmorphic Category Badge */}
                    <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-blue-600 backdrop-blur-sm shadow-sm border border-white/20">
                      {item.category}
                    </span>
                  </div>

                  {/* Text Details Section */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      {/* Date details */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{item.date}</span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors duration-200 mb-2 line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer link */}
                    <div className="pt-4 border-t border-slate-50">
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group/link"
                      >
                        Read Article
                        <ArrowRight className="h-4 w-4 transform transition-transform duration-200 group-hover/link:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Elegant Pagination Indicators */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to page ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentPage 
                  ? "w-8 bg-blue-600" 
                  : "w-2 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeatureNewsCard;