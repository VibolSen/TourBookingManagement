"use client";

import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AttractionsPage() {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/attractions"); // Updated API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setAttractions(data); // Assuming the API returns an array of attraction objects
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (loading) {
  //     return <div className="text-center py-5">Loading...</div>;
  // }

  // if (error) {
  //     return <div className="text-center py-5 text-red-500">Error: {error}</div>;
  // }
  return (
    <div>
      <section className="flex flex-col md:flex-row items-center justify-center p-8 md:p-12 bg-white">
        {/* Image Section */}
        <div className="grid grid-cols-2 gap-4 w-full md:w-1/2 mb-8 md:mb-0">
          {/* Image 1 */}
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="https://images.ctfassets.net/i3kf1olze1gn/3pFHM6fHHgCqqMBjMmDpPc/05dc4091da335778e3586f516e6c49f9/relaxing_beach_hero.jpg"
              alt="Location 1"
              className="w-full h-48 md:h-64 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
          </div>

          {/* Image 2 */}
          <div className="relative group overflow-hidden rounded-lg mt-7">
            <img
              src="https://www.tricitymed.org/wp-content/uploads/2017/12/shutterstock_495636001.jpg"
              alt="Location 2"
              className="w-full h-48 md:h-64 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
          </div>

          {/* Image 3 */}
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="https://img.jakpost.net/c/2017/08/31/2017_08_31_31849_1504162869._large.jpg"
              alt="Location 3"
              className="w-full h-48 md:h-64 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
          </div>

          {/* Image 4 */}
          <div className="relative group overflow-hidden rounded-lg mt-7">
            <img
              src="https://www.learnersandmakers.com/wp-content/uploads/2023/01/Angkor-with-kids-travel-guide-hero.jpg"
              alt="Location 4"
              className="w-full h-48 md:h-64 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-center md:items-start md:ml-8 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-4">
            We offer tours in a range of locations
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-black">
            the most popular for you guys!
          </p>
          <div className="flex mt-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7750/7750718.png"
              alt="Airplane Icon"
              className="w-16 h-16 md:w-20 md:h-20 mr-2 transform transition-transform duration-300 hover:scale-110"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/7893/7893979.png"
              alt="Airplane Icon"
              className="w-16 h-16 md:w-20 md:h-20 transform transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>
      </section>
      <div className="px-4 sm:px-6 lg:px-20 py-8">
        <h1 className="text-4xl font-bold p-2 mt-5">
          Our Most Popular Attractions
        </h1>
        <div className="text-right mb-8">
          <button className="text-blue-500 font-semibold hover:text-blue-600 transition duration-200">
            See All
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-lg overflow-hidden relative transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={attraction.image}
                alt={attraction.title}
                className="w-full h-[200px] sm:h-[200px] object-cover"
              />
              <i className="fas fa-heart absolute top-4 right-4 text-white bg-black/30 p-2 rounded-full shadow-md cursor-pointer hover:bg-red-500 hover:text-white transition duration-200"></i>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-500 mr-1"></i>
                    <span className="text-sm text-gray-500">
                      {attraction.reviews} Reviews
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-500">
                    {attraction.price}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  {attraction.title}
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  {attraction.duration}
                </p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
