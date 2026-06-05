'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Use next/navigation for navigation
import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from 'next/image';
import { Compass } from 'lucide-react';

interface Attraction {
  id: string;
  image: string;
  title: string;
  reviews: number;
  price: string;
  duration: string;
}

interface Tour {
  _id: string;
  mainImage: string;
  name: string;
  reviews?: number;
  price: number;
  duration: number;
  category?: {
    categoryname: string;
  };
}

export default function Localculture() {
    const { id } = useParams(); // Get User ID from URL path
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); // Initialize the router

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3500/api'}/tours`); // Updated API endpoint
                let data = { data: [] };
                if (response.ok) {
                    data = await response.json();
                } else if (response.status === 404) {
                    data = { data: [] };
                } else {
                    throw new Error("Failed to fetch data");
                }
                const filteredData = (data.data || [])
                    .filter((tour: Tour) => tour.category?.categoryname?.toLowerCase().includes("culture") || tour.category?.categoryname?.toLowerCase().includes("traditional"))
                    .map((tour: Tour) => ({
                        id: tour._id,
                        image: tour.mainImage,
                        title: tour.name,
                        reviews: tour.reviews || 92,
                        price: `$${tour.price}`,
                        duration: `${tour.duration} days`
                    }));
                
                setAttractions(filteredData); // Assuming the API returns an array of attraction objects
                setLoading(false);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "An unknown error occurred");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to handle card click
    const handleCardClick = (tourId: string) => {
        router.push(`/profile/${id}/DetailPageCard/${tourId}`); // Navigate to the fixed detail page
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
            {attractions.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {attractions.map((attraction) => (
                        <div
                            key={attraction.id} // Use the attraction's ID as the key
                            className="border rounded-lg shadow-lg overflow-hidden relative transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
                            onClick={() => handleCardClick(attraction.id)} // Handle click event
                        >
                            <div className="relative w-full h-[200px]">
                                <Image
                                    src={attraction.image}
                                    alt={attraction.title}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>
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
            ) : (
                <div className="min-h-[30vh] flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 rounded-2xl border border-gray-100 my-10 max-w-2xl mx-auto shadow-sm">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-500 shadow-inner">
                        <Compass className="w-8 h-8 text-blue-500 animate-spin-slow" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No Cultural Places Found</h3>
                    <p className="text-gray-500 max-w-md">
                        There are currently no active cultural packages in our database. Please check back later!
                    </p>
                </div>
            )}
        </div>
    );
}