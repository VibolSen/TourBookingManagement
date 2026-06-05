"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Heart, Compass, Star, Calendar, Loader2 } from "lucide-react";

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

export default function FavouritesPage() {
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id || "";

  const [favorites, setFavorites] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tours and filter by user's favorites list in localStorage
  useEffect(() => {
    const fetchAndFilterFavorites = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get favorites list from localStorage
        const stored = localStorage.getItem(`favorites_${userId}`);
        const favoriteIds: string[] = stored ? JSON.parse(stored) : [];

        if (favoriteIds.length === 0) {
          setFavorites([]);
          setLoading(false);
          return;
        }

        // Fetch all tours
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3500/api"}/tours`
        );
        
        let data = { data: [] };
        if (response.ok) {
          data = await response.json();
        } else if (response.status === 404) {
          data = { data: [] };
        } else {
          throw new Error("Failed to load tour packages");
        }

        // Filter and map only favorited tours
        const allTours: TourData[] = data.data || [];
        const favoritedTours = allTours
          .filter((tour) => favoriteIds.includes(tour._id))
          .map((tour) => ({
            image: tour.mainImage,
            title: tour.name,
            reviews: tour.reviews || 120,
            price: `$${tour.price}`,
            duration: `${tour.duration} days`,
            id: tour._id,
          }));

        setFavorites(favoritedTours);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterFavorites();
  }, [userId]);

  // Remove a tour from favorites and update localStorage
  const handleRemoveFavorite = (tourId: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((item) => item.id !== tourId);
      const updatedIds = updated.map((item) => item.id);
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedIds));
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <span className="text-sm font-semibold text-slate-500">Loading your wishlist...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-4 shadow-inner">
          <Heart className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Failed to Load Wishlist</h3>
        <p className="text-slate-500 text-sm mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl text-sm shadow hover:bg-blue-700 transition active:scale-95"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/20 min-h-screen py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center lg:text-left mb-12 space-y-2 pb-6 border-b border-slate-100">
          <span className="text-xs font-bold tracking-widest text-rose-600 uppercase">
            Wishlist
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Saved Destinations
          </h1>
          <p className="text-slate-500 text-sm max-w-xl">
            Keep track of the destinations you love, review tour durations, and manage packages before booking your next adventure.
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {favorites.map((attraction) => (
              <article
                key={attraction.id}
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
                  
                  {/* Floating Remove Heart Button */}
                  <button
                    onClick={() => handleRemoveFavorite(attraction.id)}
                    aria-label="Remove from favorites"
                    className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/85 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 z-10 text-rose-500 hover:text-rose-600"
                  >
                    <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
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

                    {/* Title */}
                    <h3 className="font-extrabold text-lg text-slate-800 group-hover:text-blue-600 transition-colors duration-200 mb-2 line-clamp-2 leading-snug">
                      {attraction.title}
                    </h3>
                  </div>

                  {/* Duration and Book button */}
                  <div className="mt-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-4">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{attraction.duration}</span>
                    </div>
                    
                    <Link href={`/profile/${userId}/topcard`}>
                      <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 text-center">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>

              </article>
            ))}
          </div>
        ) : (
          /* Empty State Layout */
          <div className="min-h-[50vh] flex items-center justify-center py-12">
            <div className="relative max-w-lg w-full bg-white/80 backdrop-blur-md border border-slate-100 shadow-lg rounded-2xl p-8 md:p-12 text-center overflow-hidden">
              
              {/* Decorative Blur Backdrops */}
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-rose-300/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-blue-300/15 rounded-full blur-3xl" />

              {/* Pulsing Heart Container */}
              <div className="relative mx-auto w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-8 shadow-inner group">
                <Heart className="w-12 h-12 text-rose-500 fill-rose-200 animate-pulse" />
              </div>

              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-4">
                No Favorites Saved Yet
              </h2>
              
              <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                You haven&apos;t added any tours to your wishlist. Explore our catalog of locations, click the heart icon on your favorite packages, and keep them grouped here!
              </p>

              <div className="flex justify-center">
                <Link href={`/profile/${userId}/topcard`}>
                  <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95">
                    <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                    Explore Tour Packages
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
