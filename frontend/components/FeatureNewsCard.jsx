import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa'; // Importing icons from react-icons

const FeatureNewsCard = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page for pagination

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/featureNews"); // Use your mock API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setNewsItems(data); // Assuming the API returns an array of news objects
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle pagination
  const itemsPerPage = 3; // Show 3 cards at a time
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  // Calculate the items to display based on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = newsItems.slice(startIndex, endIndex);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container px-4 sm:px-6 lg:px-20 py-8 m-auto">
      <div className="flex justify-between items-center mb-6 px-20">
        <h2 className="text-4xl font-bold relative z-10 ">Feature News</h2>
        <div className="flex">
          <button
            onClick={handlePrev}
            className="text-gray-600 hover:text-gray-800 transition mx-2 py-2 px-4 border-2"
          >
            &#60; {/* Left Arrow */}
          </button>
          <button
            onClick={handleNext}
            className="text-gray-600 hover:text-gray-800 transition mx-2 py-2 px-4 border-2"
          >
            &#62; {/* Right Arrow */}
          </button>
        </div>
      </div>

      {/* Centered Grid layout for 3 cards in one line */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {displayedItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FaCalendarAlt className="mr-2" /> {/* Calendar icon */}
                  <span>{item.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <a href="#" className=" text-blue-500 font-medium hover:underline flex items-center">
                  See more
                  <FaArrowRight className="ml-2" /> {/* Arrow icon */}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center py-4">
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentPage ? 'bg-black' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentPage(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureNewsCard;