"use client"; // Ensure this is at the top for client-side rendering

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import usePolicyStore from "@/store/policyStore";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa"; // Import icons

const InviteCard = () => {
  const { id } = useParams(); // Get sub-admin ID from URL params
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const [title, setTitle] = useState(""); // State for policy title
  const [description, setDescription] = useState(""); // State for policy description
  const [selectedPolicyId, setSelectedPolicyId] = useState(null); // State to track selected policy ID
  const [isActiveFilter, setIsActiveFilter] = useState(null); // State for isActive filter
  const [editingPolicy, setEditingPolicy] = useState(null); // State to track policy being edited
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for delete confirmation form
  const [policyToDelete, setPolicyToDelete] = useState(null); // Track which policy is being deleted
  const [showCreateSuccess, setShowCreateSuccess] = useState(false); // State for create success message
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false); // State for delete success message

  // Zustand store functions and state
  const {
    policies,
    policy,
    loading,
    error,
    createPolicy,
    fetchPolicies,
    fetchPolicyById,
    updatePolicy,
    deletePolicy,
  } = usePolicyStore();

  // Fetch all policies on component mount or when isActiveFilter changes
  useEffect(() => {
    fetchPolicies(id, isActiveFilter);
  }, [id, isActiveFilter, fetchPolicies]);

  // Fetch a single policy when selectedPolicyId changes
  useEffect(() => {
    if (selectedPolicyId) {
      fetchPolicyById(id, selectedPolicyId);
    }
  }, [selectedPolicyId, id, fetchPolicyById]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPolicy) {
        // Update existing policy
        await updatePolicy(id, editingPolicy._id, {
          title,
          description,
        });
      } else {
        // Create new policy
        await createPolicy(id, { title, description });
        setShowCreateSuccess(true); // Show success message
        setTimeout(() => setShowCreateSuccess(false), 3000); // Hide success message after 3 seconds
      }
      setShowForm(false); // Hide the form after submission
      setTitle(""); // Reset form fields
      setDescription("");
      setEditingPolicy(null); // Reset editing state
    } catch (err) {
      console.error("Error creating/updating policy:", err);
    }
  };

  // Handle form cancellation
  const handleCancel = () => {
    setShowForm(false); // Hide the form
    setTitle(""); // Reset form fields
    setDescription("");
    setEditingPolicy(null); // Reset editing state
  };

  // Handle "View" button click
  const handleViewPolicy = (policyId) => {
    setSelectedPolicyId(policyId); // Set the selected policy ID
  };

  // Handle "Edit" button click
  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy); // Set the policy being edited
    setTitle(policy.title); // Populate form fields
    setDescription(policy.description);
    setShowForm(true); // Show the form
  };

  // Handle "Delete" button click
  const handleDeletePolicy = async (policyId) => {
    setPolicyToDelete(policyId); // Set the policy to delete
    setShowDeleteConfirmation(true); // Show the confirmation form
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (policyToDelete) {
      await deletePolicy(id, policyToDelete);
      setShowDeleteConfirmation(false); // Hide the confirmation form
      setPolicyToDelete(null); // Reset the policy to delete
      setShowDeleteSuccess(true); // Show success message
      setTimeout(() => setShowDeleteSuccess(false), 3000); // Hide success message after 3 seconds
    }
  };

  // Handle delete cancellation
  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false); // Hide the confirmation form
    setPolicyToDelete(null); // Reset the policy to delete
  };

  // Handle isActive filter change
  const handleFilterChange = (value) => {
    setIsActiveFilter(value); // Update the isActive filter
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {/* Success Modals */}
      {showCreateSuccess && (
        <SuccessModal
          message="Policy created successfully!"
          onClose={() => setShowCreateSuccess(false)}
        />
      )}
      {showDeleteSuccess && (
        <SuccessModal
          message="Policy deleted successfully!"
          onClose={() => setShowDeleteSuccess(false)}
        />
      )}

      {/* Add New Policy Button */}
      <button
        onClick={() => setShowForm(true)}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg mb-6"
      >
        Add new policy
      </button>

      {/* Filter by isActive */}
      <div className="mb-6">
        <label className="block mb-1">Filter by Status:</label>
        <select
          value={isActiveFilter ?? ""}
          onChange={(e) => handleFilterChange(e.target.value || null)}
          className="w-full p-2 border rounded"
        >
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Policy Form (Conditionally Rendered) */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingPolicy ? "Edit Policy" : "Add New Policy"}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Policy Title */}
              <div className="mb-4">
                <label className="block mb-1">Policy Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter policy title"
                  required
                />
              </div>

              {/* Policy Description */}
              <div className="mb-4">
                <label className="block mb-1">Policy Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter policy description"
                  required
                />
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded"
                >
                  {editingPolicy ? "Update Policy" : "Create Policy"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full bg-gray-500 text-white py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display Policy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy) => (
          <div
            key={policy._id}
            className="bg-white rounded-lg shadow p-6 flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{policy.title}</h2>
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                {policy.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="mb-4">
              {/* Render description as a numbered list */}
              <ol className="text-sm text-gray-600 list-decimal list-inside">
                {policy.description.split("\n").map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </div>
            {/* Push buttons to the bottom */}
            <div className="mt-auto flex justify-between items-center">
              <button
                onClick={() => handleViewPolicy(policy._id)}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              >
                View
              </button>
              <div className="flex">
                <button
                  onClick={() => handleEditPolicy(policy)}
                  className="p-2 bg-yellow-500 text-white rounded mr-2 shadow-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 z-10"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeletePolicy(policy._id)}
                  className="p-2 bg-red-500 text-white rounded shadow-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 z-10"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Display Selected Policy Details */}
      {selectedPolicyId && policy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Policy Details</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{policy.title}</h3>
              {/* Render description as a numbered list */}
              <ol className="text-sm text-gray-600 list-decimal list-inside">
                {policy.description.split("\n").map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </div>
            <button
              onClick={() => setSelectedPolicyId(null)}
              className="w-full bg-gray-500 text-white py-2 rounded transition duration-300 ease-in-out transform hover:bg-gray-600 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

// Success Modal Component
const SuccessModal = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-4">{message}</h2>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Delete Policy</h2>
        <p className="mb-4">Are you sure you want to delete this policy?</p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="w-full bg-red-500 text-white py-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="w-full bg-gray-500 text-white py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteCard;
