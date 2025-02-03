"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // For temporary image preview
  const { image, isLoading, error, uploadImage } = useAuthStore();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Validate file type and size
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size must be less than 5MB.");
        return;
      }
      setFile(selectedFile);

      // Create a temporary URL for image preview
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      alert("Please select a valid image file (JPEG, PNG, etc.).");
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    try {
      await uploadImage(file);
      // Clear the file input and preview after successful upload
      setFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>

      {/* File Input */}
      <div>
        <label htmlFor="file-upload" className="block mb-2 font-medium">
          Choose an image:
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          aria-label="Choose an image to upload"
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={isLoading || !file}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center">
            <span>Uploading...</span>
            <span className="ml-2 animate-spin">🌀</span>
          </div>
        ) : (
          "Upload"
        )}
      </button>

      {/* Error Message */}
      {error && (
        <p className="mt-4 text-red-500">
          Error: {error.message || "Failed to upload image."}
        </p>
      )}

      {/* Image Preview */}
      {(previewUrl || image) && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Preview:</h3>
          <img
            src={previewUrl || image} // Use previewUrl for temporary preview, otherwise use the uploaded image URL
            alt="Preview"
            className="mt-2 w-48 h-auto border border-gray-300 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;