import { create } from "zustand";
import axios from "axios";

const API_URL = "https://tourbookingplan-backend.onrender.com/api/admins";

//const API_URL = "http://localhost:3500/api/admins";

export const useAdminStore = create((set) => ({
  admin: null, // Admin object (or null if not logged in)
  token: null, // JWT token for authentication
  users: [],
  subAdmins: [],
  counts: { users: 0, subAdmins: 0 },
  error: null,
  loading: false,

  // Login function

  // Login action
  loginAdmin: async (email, password) => {
    try {
      // Make a POST request to the login API
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is not successful
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Invalid email or password";
        throw new Error(errorMessage);
      }

      // Parse the response JSON
      const data = await response.json();

      // Ensure the response contains the required fields
      if (!data.token || !data.user) {
        throw new Error("Incomplete response from the server");
      }

      // Update Zustand store with token and user details
      set({
        token: data.token,
        user: data.user,
        isAuthenticated: true,
      });

      // Optionally, store the token in localStorage for persistence
      localStorage.setItem("token", data.token);

      // Return the user object for further processing
      return data.user;
    } catch (error) {
      console.error("Login error:", error.message || error);

      // Reset state in case of an error
      set({ token: null, user: null, isAuthenticated: false });

      // Re-throw the error to propagate it to the calling function
      throw error;
    }
  },

  // Logout function
  logout: () => {
    set({ admin: null, token: null });
    localStorage.removeItem("authToken"); // Clear token from local storage
  },

  // Fetch Admin Users
  fetchAdminUsers: async (adminId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${adminId}`);
      const { users, subAdmins, counts } = response.data;
      set({ users, subAdmins, counts, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch users",
        loading: false,
      });
    }
  },

  // Create Admin
  createAdmin: async (adminData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/admins", adminData);
      set({ admin: response.data.admin, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create admin",
        loading: false,
      });
    }
  },

  // Update User
  updateUserOrSubAdmin: async (adminId, userId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/${adminId}/user/${userId}`,
        updatedData
      );
      const { user, counts } = response.data;

      // Update Zustand store
      set((state) => ({
        users: state.users.map((u) => (u._id === userId ? user : u)),
        subAdmins: state.subAdmins.map((s) => (s._id === userId ? user : s)),
        counts,
        loading: false,
      }));

      return user;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update user",
        loading: false,
      });
      throw error;
    }
  },

  // Delete User
  deleteUser: async (adminId, userId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${adminId}/user/${userId}`);
      set((state) => ({
        users: state.users.filter((user) => user._id !== userId),
        subAdmins: state.subAdmins.filter(
          (subAdmin) => subAdmin._id !== userId
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete user",
        loading: false,
      });
    }
  },

  // fetchAdminUsers: async (adminId) => {
  //   set({ loading: true, error: null }); // Set loading state

  //   try {
  //     const response = await fetch(`${API_URL}/${adminId}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to fetch admin users");
  //     }

  //     const data = await response.json();

  //     // Update Zustand store with fetched data
  //     set({
  //       adminUsers: data.users,
  //       subAdmins: data.subAdmins,
  //       userCounts: data.counts,
  //       loading: false,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching admin users:", error.message || error);
  //     set({
  //       loading: false,
  //       error: error.message || "An error occurred while fetching users.",
  //     });
  //   }
  // },\

  // Fetch a single admin by ID

  getAdminById: async (id) => {
    set({ loading: true, error: null }); // Set loading state

    try {
      const response = await axios.get(`${API_URL}/get-admin/${id}`);
      const { admin } = response.data;

      // Update the Zustand store with the fetched admin details
      set({
        admin,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching admin by ID:", error.message || error);

      // Handle errors by updating the state
      set({
        error: error.response?.data?.message || "Failed to fetch admin",
        loading: false,
      });
    }
  },

  // Clear admin and error state
  clearAdminState: () => {
    set({
      admin: null,
      error: null,
    });
  },
}));
