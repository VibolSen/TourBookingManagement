'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image'; // Import the Image component from Next.js

const HistoricalDetail = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [attraction, setAttraction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3002/historical/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch attraction details");
                }
                const data = await response.json();
                setAttraction(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div className="text-center py-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-5 text-red-500">Error: {error}</div>;
    }

    if (!attraction) {
        return <div className="text-center py-5">No data found.</div>;
    }

    return (
        <div className="px-4 sm:px-6 lg:px-20 py-8">
            <h1 className="text-4xl font-bold p-2 mt-5 text-center my-4">{attraction.title}</h1>
            <div className="max-w-4xl mx-auto">
                {/* Replace <img> with <Image /> */}
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                    <Image
                        src={attraction.image}
                        alt={attraction.title}
                        fill // Use fill to make the image fill the container
                        style={{ objectFit: 'cover' }} // Ensure the image covers the container
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" // Optimize for different screen sizes
                    />
                </div>
                <div className="mt-6">
                    <p className="text-gray-500 text-sm mb-4">{attraction.duration}</p>
                    <p className="text-lg text-gray-700">{attraction.description}</p>
                </div>
            </div>
        </div>
    );
};

export default HistoricalDetail;