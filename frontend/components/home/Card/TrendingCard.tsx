import React, { useState, useEffect } from "react";
import Image from "next/image";

interface CategoryData {
  name: string;
  image: string;
}

interface ApiCategory {
  categoryname: string;
}

const TrendingCard = () => {
  const [trendingData, setTrendingData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const categoryImages: Record<string, string> = {
      "Adventure": "https://i.pinimg.com/736x/7a/56/2e/7a562ecc26f31c61d10b2b5139a0b9df.jpg",
      "Beach": "https://i.pinimg.com/736x/e4/29/19/e42919874adba2af31ccf389c4d9d1b0.jpg",
      "Traditional": "https://i.pinimg.com/236x/58/94/95/58949541387fca8e2cbfdb5b15242249.jpg",
      "default": "https://i.pinimg.com/736x/10/00/0e/10000e026456411b41c9ead4b531ee94.jpg"
    };

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const mappedData = (data.data || []).map((cat: ApiCategory) => ({
          name: cat.categoryname,
          image: categoryImages[cat.categoryname] || categoryImages["default"]
        }));
        setTrendingData(mappedData);
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
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover transition-transform transform hover:scale-110 duration-300"
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
