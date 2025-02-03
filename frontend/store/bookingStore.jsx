import { create } from "zustand";

import axios from "axios";
 
const API_URL = "https://tourbookingplan-backend.onrender.com/api/bookings";

// const API_URL = "http://localhost:3500/api/bookings";

export const useBookingStore = create((set) => ({
  bookings: [],
  totalBookings: 0,
  totalPendingBookings: 0,
  loading: false,
  error: null,

  // Fetch booking statistics by company ID
  fetchBookingStatisticsByCompanyId: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/statistics/totals/${id}`);
      const { totalBookings, totalPendingBookings } = response.data.statistics;

      set({
        totalBookings,
        totalPendingBookings,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to fetch booking statistics.",
        loading: false,
      });
    }
  },
  // Clear the store when needed

  // Fetch all bookings
  fetchBookings: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}`); // Replace with your API endpoint
      const data = await response.json();
      set({ bookings: data.bookings, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch a single booking by ID

  fetchBookingsBySubadmin: async (subadminId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/subadmin/${subadminId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch bookings by subadmin.");
      }
      const data = await response.json();
      set({ bookings: data.bookings, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  // Create a new booking
  createBooking: async (bookingData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      set((state) => ({
        bookings: [...state.bookings, data.booking],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Update a booking
  updateBooking: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === id ? data.booking : booking
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete a booking
  deleteBooking: async (id) => {
    set({ loading: true, error: null });
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        bookings: state.bookings.filter((booking) => booking.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
