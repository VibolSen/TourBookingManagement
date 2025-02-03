"use client";
import React, { useState, useEffect } from "react";
import { useTourStore } from "../../../../store/package";
import { useParams } from "next/navigation"; // Assuming you're using Next.js for routing

const DetailPageCard = () => {
  const { id } = useParams(); // Get the tour ID from the URL
  const { tours, loading, error, fetchAllTours } = useTourStore();
  const [quantity, setQuantity] = useState(0);

  // Fetch all tours when the component mounts
  useEffect(() => {
    fetchAllTours();
  }, [fetchAllTours]);

  // Find the specific tour based on the ID
  const tour = tours.find((tour) => tour._id === id);

  // Handle case where the tour is not found
  if (!tour) {
    return <div>Tour not found</div>;
  }

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Helper functions for quantity adjustment
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  // Calculate total payment
  const totalPayment = quantity * tour.price;

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <section>
          <h1 className="text-4xl font-bold mb-2">{tour.name}</h1>
          <p className="mb-4 text-yellow-600">
            📍 {tour.location} • ⭐⭐⭐⭐⭐ (120 reviews)
          </p>
        </section>

        {/* Gallery Section */}
        <section className="grid grid-cols-3 gap-4 mb-8">
          <img
            src={tour.mainImage}
            alt="Gallery Image 1"
            className="rounded-lg h-64 w-full object-cover"
          />
          {tour.galleryImages?.length > 2 && (
            <div className="relative h-64 w-full">
              <img
                src={tour.galleryImages[2]}
                alt="Gallery Image 3"
                className="rounded-lg h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white text-xl font-bold">
                  More Photos
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Overview Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed">{tour.description}</p>
        </section>

        {/* Plan Package Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan Package Section */}
          <div className="col-span-1">
            <h2 className="text-xl text-blue-600 font-semibold mb-2">
              Plan Package
            </h2>
            <div>
              <div className="rounded-lg px-4 mb-4 mt-6">
                <h3 className="font-semibold text-lg text-blue-400">Day</h3>
                <p className="text-gray-600 mt-2">{tour.PackageDescription}</p>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="col-span-1 bg-white shadow-lg rounded-lg p-6">
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-5">
                Most popular facilities that we provide
              </h3>
              <div className="items-center space-x-6 text-gray-700">
                {/* Private parking */}
                <div className="flex mx-5 items-center space-x-2 mb-2">
                  <span className="text-green-600 text-xl">Ⓟ</span>
                  <span>Private parking</span>
                </div>
                {/* Free WiFi */}
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-600 text-xl">📶</span>
                  <span>Free WiFi</span>
                </div>
                {/* Family rooms */}
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-600 text-xl">👨‍👩‍👧‍👦</span>
                  <span>Family rooms</span>
                </div>
                {/* Non-smoking rooms */}
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-600 text-xl">🚭</span>
                  <span>Non-smoking rooms</span>
                </div>
                {/* Good breakfast */}
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 text-xl">☕</span>
                  <span>Good breakfast</span>
                </div>
              </div>
              <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-md">
                <h1 className="text-lg font-semibold">
                  one package per{" "}
                  <span className="text-red-500">${tour.price}</span>
                </h1>

                {/* Quantity Selector */}
                <div className="mt-4 flex items-center bg-gray-200 rounded-lg p-2">
                  <label className="text-gray-700 mr-4 font-medium">
                    Quantity
                  </label>
                  <button
                    className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex justify-center items-center hover:bg-gray-400"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg font-medium">{quantity}</span>
                  <button
                    className="w-8 h-8 bg-blue-500 text-white rounded-full flex justify-center items-center hover:bg-blue-600"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>

                {/* Total Payment */}
                <div className="mt-6">
                  <h2 className="text-gray-700 font-semibold">Total Payment</h2>
                  <p className="text-2xl font-bold">${totalPayment}</p>
                </div>

                {/* Book Now Button */}
                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailPageCard;
