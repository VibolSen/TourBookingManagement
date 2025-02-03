"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Import the Image component
import Service from "../components/home/Card/Service";
import { FaStar } from "react-icons/fa";
import Footer from "../components/Footer";
import ProfileUser from "../components/Profile";
import { useAuthStore } from "../store/authStore";
import { useParams } from "next/navigation";
import { useTourStore } from "../store/package";

interface Tour {
  _id: string;
  mainImage: string;
  name: string;
  rating?: number;
  reviews?: number;
  duration: number;
  price: number;
}

export default function Home() {
  const { id } = useParams();
  const { user, isLoading, error, fetchImage, fetchUserById } = useAuthStore();
  const { tours, loading, fetchAllTours } = useTourStore();

  // Ensure `id` is a string
  const userId = Array.isArray(id) ? id[0] : id || "";

  // Fetch all tours when the component mounts
  useEffect(() => {
    fetchAllTours();
  }, [fetchAllTours]);

  // Fetch user data when `userId` changes
  useEffect(() => {
    if (userId) {
      fetchUserById(userId).catch(() =>
        console.error("Error in fetchUserById:")
      );
    }
  }, [userId, fetchUserById]);

  // Fetch user image when `user._id` changes
  useEffect(() => {
    if (user?._id) {
      fetchImage(user._id).catch(() => console.error("Error in fetchImage:"));
    }
  }, [user, fetchImage]);

  // Display loading state
  if (loading || isLoading) {
    return <div>Loading tours...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ProfileUser id={userId} />
      <div className="px-20">
        <h1 className="text-3xl text-center font-bold py-5">Top Destinations</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {tours.length > 0 ? (
            tours
              .slice(0, 8) // Limit the number of tours to 3
              .map((tour: Tour) => (
                <Link
                  key={tour._id}
                  href={`/destination/${tour._id}`}
                  className="w-72 bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
                >
                  <div>
                    <Image
                      src={tour.mainImage}
                      alt={tour.name}
                      width={288} // Set the width of the image
                      height={240} // Set the height of the image
                      className="w-full h-60 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-500 font-bold flex items-center">
                          <FaStar className="mr-1" /> {tour.rating || "N/A"}
                        </span>
                        <span className="text-gray-500 text-sm">
                          ({tour.reviews || 0} reviews)
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mt-2">{tour.name}</h3>
                      <p className="text-gray-600 mt-1">{tour.duration} days</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold">
                          ${tour.price}{" "}
                          <span className="text-gray-500 text-sm">/ person</span>
                        </span>
                        <button className="bg-blue-500 text-white text-xs px-4 py-2 rounded-full shadow hover:bg-blue-700 transition-transform duration-300 transform hover:rotate-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
          ) : (
            <p>No tours available.</p>
          )}
        </div>
        <div className="flex items-center justify-center p-6">
          <Link href="/allTopTours">
            <button className="bg-blue-500 px-4 py-2 text-white font-semibold rounded hover:bg-blue-600">
              See More
            </button>
          </Link>
        </div>
      </div>
      <Service />
      <Footer />
    </div>
  );
}