"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Footer from"@/components/Footer"
import ProfileUser from "../../../../components/Profile";
const ProfilePage = () => {
  const { user, fetchUserById, logout, updateUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    profilePicture: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserById(user?.id);
        setIsLoading(false);
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          bio: user?.bio || "",
          profilePicture: user?.profilePicture || "",
        });
      } catch (err) {
        setError("Failed to load user data. Please try again later.");
        setIsLoading(false);
        console.error("Error fetching user data:", err);
      }
    };

    if (user?.id) {
      fetchData();
    } else {
      router.push("/login");
    }
  }, [user?.id, fetchUserById, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating profile with:", formData); // Debugging: Log the payload
      await updateUser(user?.id, formData);
      setIsEditing(false);
    } catch (err) {
      setError(
        err.message || "Failed to update profile. Please try again later."
      );
      console.error("Error updating user data:", err);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div>
        <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <div className="flex space-x-4">
            <Button onClick={handleEdit} variant="outline">
              Edit Profile
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              Log out
            </Button>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {formData.profilePicture ? (
                  <img
                    src={formData.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl text-gray-500">
                    {formData.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Profile Picture URL"
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Personal Info</h3>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Bio"
                rows="4"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl text-gray-500">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Personal Info</h3>
              <p className="text-gray-700">
                {user?.bio ||
                  "Hello everyone, my name is Biscuit Boy. I'm excited to be here today and look forward to getting to know everyone, learning new things, and collaborating on a project. Please feel free to ask me any questions you may have – I'm always happy to chat and share a bit more about myself."}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Role:</p>
                  <p className="text-gray-800">{user?.role || "User"}</p>
                </div>
                <div>
                  <p className="text-gray-600">Joined:</p>
                  <p className="text-gray-800">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;