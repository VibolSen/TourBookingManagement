import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";

interface Tour {
  image: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  _id: string;
}

interface ApiTour {
  _id: string;
  mainImage: string;
  name: string;
  rating?: number;
  reviews?: number;
  duration: number;
  price: number;
  category?: {
    categoryname?: string;
  };
}

const Traditional = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tours`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const mappedData = (data.data || [])
          .filter((tour: ApiTour) => tour.category?.categoryname?.toLowerCase().includes("traditional") || tour.category?.categoryname?.toLowerCase().includes("culture"))
          .slice(0, 4)
          .map((tour: ApiTour) => ({
            image: tour.mainImage,
            title: tour.name,
            rating: tour.rating || 4.7,
            reviews: tour.reviews || 65,
            price: tour.price,
            duration: `${tour.duration} days`,
            _id: tour._id
          }));
        
        if (mappedData.length === 0) {
          mappedData.push(...(data.data || []).slice(0, 4).map((tour: ApiTour) => ({
            image: tour.mainImage,
            title: tour.name,
            rating: tour.rating || 4.7,
            reviews: tour.reviews || 65,
            price: tour.price,
            duration: `${tour.duration} days`,
            _id: tour._id
          })));
        }
        setTours(mappedData);
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
    <div className="px-4 sm:px-6 lg:px-20 py-8">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold p-2 mb-5">
          Deals for the Traditional
        </h1>
        <button className="text-blue-500 font-semibold hover:text-blue-600 transition duration-200 mb-5">
          See All
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tours.map((tour, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg overflow-hidden relative transition-transform transform hover:scale-105"
          >
            <div className="relative w-full h-[200px]">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover"
              />
            </div>
            <i className="fas fa-heart absolute top-2 right-2 text-red-500 bg-white p-1 rounded-full shadow-md cursor-pointer hover:text-red-600"></i>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <i className="fas fa-star text-yellow-500 mr-1"></i>
                  <span className="text-sm text-gray-500">
                    {tour.rating} ({tour.reviews} reviews)
                  </span>
                </div>
                <span className="text-lg font-bold">${tour.price}</span>
              </div>
              <h2 className="text-lg font-semibold mt-2">{tour.title}</h2>
              <p className="text-gray-500">{tour.duration}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Traditional;
