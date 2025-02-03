'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for navigation
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Localculture() {
    const [attractions, setAttractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter(); // Initialize the router

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3002/historical"); // Updated API endpoint
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

    // Function to handle card click
    const handleCardClick = (id) => {
        router.push(`/localculture/${id}`); // Navigate to the detail page with the attraction's ID
    };

    if (loading) {
        return <div className="text-center py-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-5 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="px-4 sm:px-6 lg:px-20 py-8">
            <h1 className="text-4xl font-bold p-2 mt-5 text-center my-4">
                We Offer the Best Popular Local Cultural Places
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {attractions.map((attraction) => (
                    <div
                        key={attraction.id} // Use the attraction's ID as the key
                        className="border rounded-lg shadow-lg overflow-hidden relative transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
                        onClick={() => handleCardClick(attraction.id)} // Handle click event
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
                                    <span className="text-sm text-gray-500">{attraction.reviews} Reviews</span>
                                </div>
                                <span className="text-lg font-bold text-blue-500">{attraction.price}</span>
                            </div>
                            <h2 className="text-xl font-semibold mb-2">{attraction.title}</h2>
                            <p className="text-gray-500 text-sm mb-4">{attraction.duration}</p>
                            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}