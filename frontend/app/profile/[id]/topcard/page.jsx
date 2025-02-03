"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaStar, FaCheckCircle } from "react-icons/fa"; // Import FaCheckCircle for the success icon
import { useAuthStore } from "../../../../store/authStore";
import { useParams } from "next/navigation";
import { useTourStore } from "../../../../store/package";
import Services from "../../../../components/home/Card/Service";

export default function ProfilePage() {
  const { id } = useParams();
  const { user, isLoading, error, fetchImage, fetchUserById } = useAuthStore();
  const { tours, loading, fetchAllTours } = useTourStore();

  // Ensure `id` is a string
  const userId = Array.isArray(id) ? id[0] : id || "";

  // State to manage loading and error for each tour's booking
  const [bookingStates, setBookingStates] = useState({});

  // State to manage success modal visibility
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  // Function to handle booking for a specific tour
  const handleBooking = async (tourId, companyId) => {
    // Set loading state for this specific tour
    setBookingStates((prev) => ({
      ...prev,
      [tourId]: { loading: true, error: null },
    }));

    try {
      const bookingData = {
        tour: tourId,
        company: companyId,
        members: 1, // Replace with actual number of members
      };

      const response = await fetch(
        `https://tourbookingplan-backend.onrender.com/api/bookings/${userId}`,
        //`http://localhost:3500/api/bookings/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const data = await response.json();
      console.log("Booking created:", data.booking);

      // Show success modal
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000); // Hide success modal after 3 seconds
    } catch (error) {
      // Set error state for this specific tour
      setBookingStates((prev) => ({
        ...prev,
        [tourId]: { loading: false, error: error.message },
      }));
      console.error("Error creating booking:", error);
    } finally {
      // Reset loading state for this specific tour
      setBookingStates((prev) => ({
        ...prev,
        [tourId]: { loading: false, error: null },
      }));
    }
  };

  // Display loading state
  if (!isLoading || loading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Booking Successful!</h2>
            <p className="text-gray-600">
              Your booking has been created successfully.
            </p>
          </div>
        </div>
      )}

      <div className="px-20">
        <h1 className="text-3xl text-center font-bold py-5">
          Top Destinations
        </h1>
        <div className="flex flex-wrap justify-center gap-6">
          {tours.length > 0 ? (
            tours
              .slice(0, 8) // Limit the number of tours to 8
              .map((tour) => (
                <div
                  key={tour._id} // Use tour._id as the key
                  className="w-72 bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
                >
                  <Link href={`/destination/${tour._id}`}>
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
                        <h3 className="text-lg font-semibold mt-2">
                          {tour.name}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {tour.duration} days
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xl font-bold">
                            ${tour.price}{" "}
                            <span className="text-gray-500 text-sm">
                              / person
                            </span>
                          </span>
                          <button
                            className="bg-blue-500 text-white text-xs px-4 py-2 rounded-full shadow hover:bg-blue-700 transition-transform duration-300 transform hover:rotate-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                            onClick={(e) => {
                              e.preventDefault(); // Prevent Link navigation
                              handleBooking(tour._id, tour.company); // Trigger booking for this tour
                            }}
                            disabled={bookingStates[tour._id]?.loading} // Disable button while booking is in progress
                          >
                            {bookingStates[tour._id]?.loading
                              ? "Booking..."
                              : "Book Now"}
                          </button>
                        </div>
                        {bookingStates[tour._id]?.error && (
                          <div className="text-red-500 text-sm mt-2">
                            {bookingStates[tour._id].error}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
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
      <Services />
    </div>
  );
}
