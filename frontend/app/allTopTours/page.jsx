"use client";
// import Footer from "../components/Footer";
// import Footer from "../components/Footer"; 
import Footer from "../../components/Footer"; 
import ProfileUser from "../../components/Profile";
import { useEffect } from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useTourStore } from "../../store/package";

export default function AllToursPage() {
  const { tours, loading, fetchAllTours } = useTourStore();

  // Fetch all tours when the component mounts
  useEffect(() => {
    fetchAllTours();
  }, [fetchAllTours]);

  // Display loading state
  if (loading) {
    return <div>Loading tours...</div>;
  }

  return (
    <div>
    <ProfileUser />
    <div className="px-20 py-10">
      <h1 className="text-3xl text-center font-bold py-5">All Tours</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {tours.length > 0 ? (
          tours.map((tour) => (
            <Link
              key={tour._id}
              href={`/destination/${tour._id}`}
              className="w-72 bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
            >
              <div>
                <img
                  src={tour.mainImage}
                  alt={tour.name}
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
    </div>
    <Footer />
    </div>
  );
}