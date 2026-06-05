"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Compass, MapPin, Award, ShieldCheck, Heart, Star, Calendar } from "lucide-react";

interface Attraction {
  image: string;
  title: string;
  reviews: number;
  price: string;
  duration: string;
  id: string;
}

interface TourData {
  mainImage: string;
  name: string;
  reviews?: number;
  price: number;
  duration: number;
  _id: string;
}

export default function AttractionsPage() {
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id || "";
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [likedStatus, setLikedStatus] = useState<Record<string, boolean>>({});

  // Load favorites from localStorage
  useEffect(() => {
    if (userId) {
      const stored = localStorage.getItem(`favorites_${userId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const statusMap: Record<string, boolean> = {};
          parsed.forEach((favId: string) => {
            statusMap[favId] = true;
          });
          setLikedStatus(statusMap);
        } catch (e) {
          console.error("Failed to parse favorites", e);
        }
      }
    }
  }, [userId]);

  // Toggle favorite helper and persist in localStorage
  const toggleLike = (tourId: string) => {
    setLikedStatus((prev) => {
      const updated = { ...prev, [tourId]: !prev[tourId] };
      if (userId) {
        const favIds = Object.keys(updated).filter((key) => updated[key]);
        localStorage.setItem(`favorites_${userId}`, JSON.stringify(favIds));
      }
      return updated;
    });
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3500/api'}/tours`);
        let data = { data: [] };
        if (response.ok) {
          data = await response.json();
        } else if (response.status === 404) {
          data = { data: [] };
        } else {
          throw new Error("Failed to fetch data");
        }
        const mappedData = (data.data || []).map((tour: TourData) => ({
          image: tour.mainImage,
          title: tour.name,
          reviews: tour.reviews || 120,
          price: `$${tour.price}`,
          duration: `${tour.duration} days`,
          id: tour._id
        }));
        setAttractions(mappedData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-50/20 min-h-screen">
      
      {/* Hero / About Split Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Asymmetrical Masonry Image Grid (7 cols on large screens) */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
          {/* Image 1 */}
          <div className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 w-full h-44 sm:h-56 md:h-64">
            <Image
              src="/attraction-1.jpg"
              alt="Immersive Temple Exploration"
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/20 transition-colors duration-300" />
          </div>

          {/* Image 2 (shifted down for asymmetric masonry look) */}
          <div className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 w-full h-44 sm:h-56 md:h-64 mt-6">
            <Image
              src="/attraction-2.jpg"
              alt="Cultural Performance Landmark"
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/20 transition-colors duration-300" />
          </div>

          {/* Image 3 */}
          <div className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 w-full h-44 sm:h-56 md:h-64 -mt-6">
            <Image
              src="/attraction-3.jpg"
              alt="Scenic Local Village Tour"
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/20 transition-colors duration-300" />
          </div>

          {/* Image 4 */}
          <div className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 w-full h-44 sm:h-56 md:h-64">
            <Image
              src="/attraction-4.jpg"
              alt="Tropical Coastline Attraction"
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/20 transition-colors duration-300" />
          </div>
        </div>

        {/* Text and Badges Section (5 cols on large screens) */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left lg:pl-4">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              Explore Destinations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              We Offer Tours in a Wide Range of Locations
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed pt-2">
              Discover stunning historical ruins, pristine beaches, and vibrant local communities. We bundle premium security, transport, and handpicked local guide networks to give you the most unforgettable trips.
            </p>
          </div>

          {/* Feature Badge Grid */}
          <div className="grid grid-cols-3 gap-3 pt-4 max-w-md mx-auto lg:mx-0">
            <div className="flex flex-col items-center p-3 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <MapPin className="h-6 w-6 text-blue-500 mb-1.5" />
              <span className="text-xs font-bold text-slate-800">50+ Spots</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <Award className="h-6 w-6 text-emerald-500 mb-1.5" />
              <span className="text-xs font-bold text-slate-800">Top Guides</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <ShieldCheck className="h-6 w-6 text-indigo-500 mb-1.5" />
              <span className="text-xs font-bold text-slate-800">100% Safe</span>
            </div>
          </div>
        </div>

      </section>

      {/* Attractions Grid List Section */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-20">
        
        {/* Section Title */}
        <div className="flex justify-between items-end mb-10 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Featured Listings
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Most Popular Attractions
            </h1>
          </div>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
            See All
          </button>
        </div>

        {attractions.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {attractions.map((attraction, index) => (
              <article
                key={index}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                
                {/* Image Section */}
                <div className="relative w-full h-[220px] overflow-hidden bg-slate-100">
                  <Image
                    src={attraction.image}
                    alt={attraction.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Glassmorphic Favorite Heart Button */}
                  <button
                    onClick={() => toggleLike(attraction.id)}
                    aria-label="Add to favorites"
                    className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/85 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 z-10"
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors duration-200 ${
                        likedStatus[attraction.id]
                          ? "fill-red-500 text-red-500"
                          : "text-slate-500 hover:text-red-500"
                      }`}
                    />
                  </button>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & Pricing Row */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-slate-500">
                          {attraction.reviews} Reviews
                        </span>
                      </div>
                      <span className="text-base font-extrabold text-blue-600">
                        {attraction.price}
                      </span>
                    </div>

                    {/* Attraction Title */}
                    <h3 className="font-extrabold text-lg text-slate-800 group-hover:text-blue-600 transition-colors duration-200 mb-2 line-clamp-2 leading-snug">
                      {attraction.title}
                    </h3>
                  </div>

                  {/* Duration and Call to Action */}
                  <div className="mt-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-4">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{attraction.duration}</span>
                    </div>
                    
                    <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200">
                      Book Now
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>
        ) : (
          <div className="min-h-[30vh] flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 rounded-2xl border border-gray-100 my-10 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-500 shadow-inner">
              <Compass className="w-8 h-8 text-blue-500 animate-spin-slow" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Attractions Found</h3>
            <p className="text-gray-500 max-w-md">
              There are currently no active attractions matching in our database. We are adding new exciting packages soon!
            </p>
          </div>
        )}
      </section>

    </div>
  );
}
