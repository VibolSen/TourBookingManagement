"use client";

import { useParams } from "next/navigation";
import { useAuthStore } from "../../../../store/authStore";
import { useEffect } from "react";
import { Users } from "lucide-react"; // Import the Users icon
import { Card } from "@/components/ui/card"; // Import the Card component
import { useBookingStore } from "../../../../store/bookingStore";
import { useTourStore } from "../../../../store/package";

const DashboardPage = () => {
  const { id } = useParams(); // Get the company ID from the URL
  const { fetchUpcomingToursBySubadminId, upcomingToursCount } =
    useTourStore();
  const { user, image, isLoading, error, fetchImage, fetchCompanyById } =
    useAuthStore(); // Destructure Zustand store
  const {
    company,
    totalBookings,
    totalPendingBookings,
    loading,

    fetchBookingStatisticsByCompanyId,
  } = useBookingStore(); // Destructure booking store

  useEffect(() => {
    // Fetch booking statistics by company ID
    if (id) {
      fetchBookingStatisticsByCompanyId(id);
    }
  }, [id, fetchBookingStatisticsByCompanyId]);

  useEffect(() => {
    fetchUpcomingToursBySubadminId(id);
  }, [id, fetchUpcomingToursBySubadminId]);

  // Fetch company details when the component mounts or when the ID changes
  useEffect(() => {
    fetchCompanyById(id).catch((err) =>
      console.error("Error in fetchCompanyById:", err)
    );
  }, [id, fetchCompanyById]);

  // Mock counts data (replace with actual data from your API)
  const counts = {
    users: 0,
    subAdmins: 0,
    bookings: 0,
  };

  // Fetch company details when the component mounts or when the ID changes
  useEffect(() => {
    fetchCompanyById(id).catch((err) =>
      console.error("Error in fetchCompanyById:", err)
    );
  }, [id, fetchCompanyById]);

  // Fetch image when the user object is available
  useEffect(() => {
    if (user?._id) {
      fetchImage(user._id).catch((err) =>
        console.error("Error in fetchImage:", err)
      );
    }
  }, [user, fetchImage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading company details...</p>
      </div>
    ); // Show loading state
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    ); // Show error message
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          {
            count: totalBookings,
            label: "Total Booking",
            color: "text-blue-600",
          },
          {
            count: totalPendingBookings,
            label: " Total pandding",
            color: "text-green-600",
          },
          {
            count: upcomingToursCount,  
            label: "Total Upcomming",
            color: "text-purple-600",
          },
        ].map((stat, index) => (
          <Card className="p-4" key={index}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.count}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Header */}
      <header className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Company Dashboard</h1>
        <p className="text-gray-600">Company ID: {id}</p>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Information Card */}
        {user && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              User Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-lg font-medium text-gray-800">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="text-lg font-medium text-gray-800">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Profile Image Card */}
        {image && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Profile Image
            </h2>
            <img
              src={image}
              alt="Profile"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Additional Cards (Example: Statistics, Actions, etc.) */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-4">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
              Manage Employees
            </button>
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
              View Reports
            </button>
            <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200">
              Settings
            </button>
          </div>
        </div>

        {/* Example: Statistics Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Company Statistics
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-lg font-medium text-gray-800">120</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="text-lg font-medium text-gray-800">15</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Revenue (Last Month)</p>
              <p className="text-lg font-medium text-gray-800">$250,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
