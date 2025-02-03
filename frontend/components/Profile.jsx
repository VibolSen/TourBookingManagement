"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useAuthStore } from "@/store/authStore";


const ProfileUser = ({ id }) => {
  const { user, fetchUserById } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id && fetchUserById) {
        try {
          await fetchUserById(id);
          setError(null); // Clear any previous errors
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          setError("Failed to load user data. Please try again later.");
        }
      }
    };

    fetchData();
  }, [id, fetchUserById]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const performSearch = () => {
    // Example list of locations (replace with your actual data)
    const locations = [
      { name: "Paris", description: "The capital of France" },
      { name: "New York", description: "The city that never sleeps" },
      { name: "Tokyo", description: "The capital of Japan" },
      // Add more locations as needed
    ];

    const results = locations.filter(location =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div>
      {/* Navbar Section */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-20">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-auto h-16 md:h-14 object-cover"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-14 text-gray-700 font-medium text-lg ml-12">
            <Link href={`/profile/${id}`} className="hover:text-blue-500">
              Home
            </Link>
            <Link href={`/profile/${id}/services`} className="hover:text-blue-500">
              Services
            </Link>
            <Link href={`/profile/${id}/attractions`} className="hover:text-blue-500">
              Attractions
            </Link>
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-12 ml-auto text-lg mr-8">
            <Link
              href={`/profile/${id}/favorites`}
              className="text-gray-700 hover:text-blue-500 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
              <span>Favorites</span>
            </Link>
            <Link
              href={`/profile/${id}/become-a-supplier`}
              className="text-gray-700 hover:text-blue-500 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faBriefcase} className="text-lg" />
              <span>Become a supplier</span>
            </Link>
            {user ? (
              <Link
                href={`/profile/${id}/myprofile`}
                className="px-4 py-2 hover:bg-gray-100"
              >
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-white text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : "P"}
                    </span>
                  </div>
                )}
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {isMenuOpen && (
          <div className="flex flex-col md:hidden bg-white shadow-md py-2">
            <Link href="/" className="px-4 py-2 hover:bg-gray-100">
              Home
            </Link>
            <Link href="/services" className="px-4 py-2 hover:bg-gray-100">
              Services
            </Link>
            <Link href="/attractions" className="px-4 py-2 hover:bg-gray-100">
              Attractions
            </Link>
            <div className="border-t border-gray-300"></div>
            <Link
              href="/favourites"
              className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
              <span>Favorites</span>
            </Link>
            <Link
              href="/become-a-supplier"
              className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faBriefcase} className="text-lg" />
              <span>Become a supplier</span>
            </Link>
            {user ? (
              <Link
                href={`/profile/${id}/myprofile`}
                className="px-4 py-2 hover:bg-gray-100"
              >
                My Profile
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-white text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : "P"}
                    </span>
                  </div>
                )}
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-blue-500 text-white px-6 py-2 rounded-full w-[100px] hover:bg-blue-600"
              >
                Sign in
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url('/banner.png')`, // Ensure the correct path
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4 py-20">
          <h1 className="text-white text-4xl md:text-5xl font-semibold mb-4">
            Discover Amazing Places
          </h1>
          <p className="text-white text-lg md:text-xl mb-10">
            Explore the best destinations tailored just for you.
          </p>

          <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden w-full max-w-4xl mx-auto mt-10">
            <div className="flex items-center px-6 text-gray-500 border-r border-gray-300">
              <i className="fa fa-map-marker text-blue-500 text-lg"></i>
              <span className="ml-3 font-medium">Location</span>
            </div>
            <input
              type="text"
              placeholder="Search by name of Name of package"
              className="flex-1 px-6 py-4 text-gray-700 text-base focus:outline-none placeholder-gray-400"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
            />
            <button
              className="bg-blue-500 text-white px-8 py-4 text-base font-medium hover:bg-blue-600 transition-all duration-200 ease-in-out"
              onClick={performSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Display Search Results */}
      <div className="mt-6">
        {searchResults.map((location, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-semibold">{location.name}</h3>
            <p className="text-gray-600">{location.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileUser;