import React, { useState, useEffect } from "react";

const TrendingCard = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trending`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTrendingData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-8">
      <h2 className="text-center text-3xl font-bold mb-8">
        Trending Destinations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trendingData.map((destination, index) => (
          <div
            key={index}
            className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 hover:rotate-1"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform transform hover:scale-110 duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
              <h3 className="text-white text-xl font-semibold">
                {destination.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCard;
