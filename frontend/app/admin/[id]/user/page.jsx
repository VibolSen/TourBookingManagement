"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Import useParams
import { useAdminStore } from "../../../../store/adminStore";
import { Link, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const UserAdminTable = () => {
  const { id } = useParams(); // Get the company ID from the URL
  const [activeTable, setActiveTable] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setTheme] = useState("light");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [itemsPerPage] = useState(10); // Number of items per page

  const {
    users,
    subAdmins,
    fetchAdminUsers,
    isLoading,
    deleteUser,
    updateUserOrSubAdmin,
  } = useAdminStore();

  useEffect(() => {
    if (id) {
      fetchAdminUsers(id); // Use the company ID from the URL
    }
  }, [id, fetchAdminUsers]);

  const allUsers = [...users, ...subAdmins];

  const filteredData = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedData = activeTable
    ? filteredData.filter(
        (user) => user.role.toLowerCase() === activeTable.toLowerCase()
      )
    : filteredData;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(displayedData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    const { name, email, role, status } = selectedUser;
    try {
      await updateUserOrSubAdmin(id, selectedUser._id, {
        name,
        email,
        role,
        status,
      });
      setIsEditing(false);
      setSuccessMessage("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
      setSuccessMessage("Failed to update user. Please try again.");
    }
  };

  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(id, userToDelete);
        setSuccessMessage("User deleted successfully!");
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      } catch (error) {
        console.error("Failed to delete user:", error);
        setSuccessMessage("Failed to delete user. Please try again.");
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            User and Sub Admin Table
          </h2>
        </div>

        {successMessage && (
          <div className="mb-4 text-green-500">
            <p>{successMessage}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <Button
            onClick={() => setActiveTable("")}
            variant={activeTable === "" ? "default" : "secondary"}
          >
            All
          </Button>
          <Button
            onClick={() => setActiveTable("User")}
            variant={activeTable === "User" ? "default" : "secondary"}
          >
            User
          </Button>
          <Button
            onClick={() => setActiveTable("SubAdmin")}
            variant={activeTable === "SubAdmin" ? "default" : "secondary"}
          >
            Sub Admin
          </Button>
          <Input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Select onValueChange={(value) => setTheme(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-5 py-3 border-b-2 text-nowrap border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Booking
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user) => (
                <tr key={user.id || user.email || user.name}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        {user.profileImage ? (
                          <img
                            className="w-full h-full rounded-full"
                            src={user.profileImage}
                            alt={`${user.name}'s profile`}
                            width={40}
                            height={40}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.location}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.totalBooking}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.date}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : user.status === "Inactive"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(user)}
                        aria-label={`Edit ${user.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(user._id)}
                        aria-label={`Delete ${user.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-4 border-t">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, displayedData.length)} of{" "}
            {displayedData.length} entries
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit User</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancelEdit}
                aria-label="Cancel"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleSaveChanges}>
              <label>
                Name
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
              </label>
              <label>
                Role
                <select
                  value={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, role: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                >
                  <option value="user">User</option>
                  <option value="subadmin">SubAdmin</option>
                </select>
              </label>
              <label>
                Status
                <select
                  value={selectedUser.status || ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, status: e.target.value })
                  }
                >
                  <option value="">Select status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                </select>
              </label>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Confirm Delete</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancelDelete}
                aria-label="Cancel"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAdminTable;
