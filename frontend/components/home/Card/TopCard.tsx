import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link"; // Correct import (lowercase)
import Image from "next/image";

interface CardData {
  id: string;
  image: string;
  destination: string;
  rating: number;
  reviews: number;
  duration: string;
  price: number;
}

interface ApiTour {
  _id: string;
  mainImage: string;
  name: string;
  rating?: number;
  reviews?: number;
  duration: number;
  price: number;
}

const TopCard = () => {
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tours`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const mappedData = (data.data || []).slice(0, 8).map((tour: ApiTour) => ({
          id: tour._id,
          image: tour.mainImage,
          destination: tour.name,
          rating: tour.rating || 4.8,
          reviews: tour.reviews || 120,
          duration: `${tour.duration} days`,
          price: tour.price
        }));
        setCardsData(mappedData);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="px-20">
      <h1 className="text-3xl text-center font-bold py-5">Top Destinations</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {cardsData.map((card) => (
          <Link
            key={card.id}
            href={`/destination/${card.id}`} // Wrap the entire card with Link
            className="w-72 bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
          >
            <div>
              <div className="relative w-full h-60">
                <Image
                  src={card.image}
                  alt={card.destination}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-500 font-bold flex items-center">
                    <FaStar className="mr-1" /> {card.rating}
                  </span>
                  <span className="text-gray-500 text-sm">
                    ({card.reviews} reviews)
                  </span>
                </div>
                <h3 className="text-lg font-semibold mt-2">
                  {card.destination}
                </h3>
                <p className="text-gray-600 mt-1">{card.duration}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold">
                    ${card.price}{" "}
                    <span className="text-gray-500 text-sm">/ person</span>
                  </span>
                  <button className="bg-blue-500 text-white text-xs px-4 py-2 rounded-full shadow hover:bg-blue-700 transition-transform duration-300 transform hover:rotate-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center p-6">
        <button className="bg-blue-500 px-4 py-2 text-white font-semibold rounded hover:bg-blue-600">
          See More
        </button>
      </div>
    </div>
  );
};

export default TopCard;
