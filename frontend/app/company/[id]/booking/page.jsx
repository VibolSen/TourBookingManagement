"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useBookingStore } from "../../../../store/bookingStore";

const GuestTable = () => {
  const { id } = useParams(); // Get company ID from the URL
  const { bookings, loading, error, fetchBookingsBySubadmin, deleteBooking } =
    useBookingStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control modal visibility
  const [selectedBookingId, setSelectedBookingId] = useState(null); // State to store the selected booking ID
  const [successMessage, setSuccessMessage] = useState(""); // State to store the success message

  // Fetch bookings when the component mounts or the ID changes
  useEffect(() => {
    if (id) {
      fetchBookingsBySubadmin(id);
    }
  }, [id, fetchBookingsBySubadmin]);

  // Handle delete button click
  const handleDeleteClick = (bookingId) => {
    setSelectedBookingId(bookingId); // Store the selected booking ID
    setShowDeleteModal(true); // Show the confirmation modal
  };

  // Handle confirmation (proceed with deletion)
  const handleConfirmDelete = async () => {
    if (selectedBookingId) {
      await deleteBooking(selectedBookingId); // Delete the booking
      fetchBookingsBySubadmin(id); // Refetch bookings to update the UI
      setSuccessMessage("Booking deleted successfully!"); // Set success message
      setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
    }
    setShowDeleteModal(false); // Close the modal
  };

  // Handle cancel (close the modal without deleting)
  const handleCancelDelete = () => {
    setShowDeleteModal(false); // Close the modal
    setSelectedBookingId(null); // Clear the selected booking ID
  };

  if (bookings.length === 0 && !loading) {
    return <p className="p-6">No policies found for this subadmin.</p>;
  }

  return (
    <div className="overflow-x-auto">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this booking?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {successMessage}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Guests</h1>
        <div className="relative flex-grow max-w-lg">
          <input
            type="text"
            placeholder="Search by name or ID"
            className="border border-gray-300 rounded p-2 pl-10 w-full h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-2.5">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </span>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: No user {error}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Package</th>
              <th className="py-3 px-6 text-left">Members</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Time</th>
              <th className="py-3 px-6 text-left">Price Tour</th>
              <th className="py-3 px-6 text-left">StartDate</th>
              <th className="py-3 px-6 text-left">EndDate</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr
                  key={booking._id || index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 font-bold text-left">
                    {booking.user?.name || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-left">{booking.tour?.name}</td>
                  <td className="py-3 px-6 text-left">
                    {booking.members || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(booking.dateOrder).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {booking.time || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {booking.tour?.price}$
                  </td>
                  <td className="py-3 px-6 text-left">
                    {booking.tour?.startDate.split("T")[0]}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {booking.tour?.endDate.split("T")[0]}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`px-3 py-2 rounded-sm text-xs font-semibold ${
                        booking.status === "Pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {booking.status || "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteClick(booking._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="py-4 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GuestTable;