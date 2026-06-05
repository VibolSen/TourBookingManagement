import { create } from "zustand";
import axios from "axios";

//  const API_URL = "https://tourbookingplan-backend.onrender.com/api/tours";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tours`;
interface TourState {
  tours: any[];
  currentTour: any;
  upcomingTours: any[];
  upcomingToursCount: number;
  totalTours: number;
  dateRangeTours: any[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;

  // Form data state
  name: string;
  description: string;
  price: string;
  duration: string;
  maxGroupSize: string;
  category: string;
  location: string;
  company: string;
  mainImage: string;
  DescriptionTip: string;
  galleryImages: any[];
  startDate: string;
  endDate: string;

  setFormData: (field: string, value: any) => void;
  resetForm: () => void;
  fetchTours: (subadminId: string | string[]) => Promise<void>;
  fetchTourById: (id: string) => Promise<any>;
  fetchUpcomingToursBySubadminId: (id: string | string[]) => Promise<void>;
  fetchToursByDateRange: (start: string, end: string) => Promise<void>;
  createTour: (id: string | string[], tourData: any) => Promise<void>;
  updateTour: (subadminId: string | string[], tourId: string, updateData: any) => Promise<void>;
  deleteTour: (subadminId: string | string[], tourId: string) => Promise<void>;
  editMainImage: (id: string, newImageUrl: string) => Promise<void>;
  deleteGalleryImage: (id: string, imageUrl: string) => Promise<void>;
  fetchTotalTours: () => Promise<void>;
  fetchAllTours: () => Promise<void>;
}

export const useTourStore = create<TourState>()((set) => ({
  tours: [],
  currentTour: null,
  upcomingTours: [],
  upcomingToursCount: 0,
  totalTours: 0,
  dateRangeTours: [],
  loading: false,
  error: null,
  successMessage: null,

  // Form data state
  name: "",
  description: "",
  price: "",
  duration: "",
  maxGroupSize: "",
  category: "",
  location: "",
  company: "",
  mainImage: "",
  DescriptionTip: "",
  galleryImages: [],
  startDate: "",
  endDate: "",

  // Action to update the form data
  setFormData: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),

  // Action to reset the form
  resetForm: () =>
    set(() => ({
      name: "",
      description: "",
      price: "",
      duration: "",
      maxGroupSize: "",
      category: "",
      location: "",
      company: "",
      mainImage: "",
      DescriptionTip: "",
      galleryImages: [],
      startDate: "",
      endDate: "",
      loading: false,
      error: null,
      successMessage: null,
    })),

  // Fetch all tours for a specific subadmin
  fetchTours: async (subadminId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/by-subadmin/${subadminId}`);
      if (!response.ok) {
        if (response.status === 404) {
          set({ tours: [], loading: false });
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      set({ tours: data.data, loading: false });
    } catch (error: any) {
      set({
        error: "Failed to fetch tours. Please check the API endpoint.",
        loading: false,
      });
    }
  },

  // Fetch a single tour by ID
  fetchTourById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/${id}`);
      const data = await response.json();
      if (response.ok) {
        set({ currentTour: data.data, loading: false });
        return data.data;
      } else {
        throw new Error(data.error || "Failed to fetch tour");
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch upcoming tours for a specific subadmin
  fetchUpcomingToursBySubadminId: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/upcoming/${id}`);
      set({
        upcomingTours: response.data.data,
        upcomingToursCount:
          response.data.upcomingTourCount || response.data.data.length, // Update the count
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data.message || error.message,
        loading: false,
      });
    }
  },

  // Fetch tours within a date range
  fetchToursByDateRange: async (start, end) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/date-range`, {
        params: { start, end },
      });
      set({ tours: response.data, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data.message || error.message,
        loading: false,
      });
    }
  },

  // Create a new tour
  createTour: async (id, tourData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/${id}/add`, tourData);
      set((state) => ({
        tours: [...state.tours, response.data.tour],
        successMessage: "Tour created successfully!",
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data.message || error.message,
        loading: false,
      });
    }
  },

  // Update a tour
  updateTour: async (subadminId, tourId, updateData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/${subadminId}/${tourId}`,
        updateData
      );
      set((state) => ({
        tours: state.tours.map((tour) =>
          tour._id === tourId ? response.data.tour : tour
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data.message || error.message,
        loading: false,
      });
    }
  },

  // Delete a tour
  deleteTour: async (subadminId, tourId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${subadminId}/${tourId}`);
      set((state) => ({
        tours: state.tours.filter((tour) => tour._id !== tourId),
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data.message || error.message,
        loading: false,
      });
    }
  },

  // Edit main image of a tour
  editMainImage: async (id, newImageUrl) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/${id}/edit-main-image`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mainImage: newImageUrl }),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          tours: state.tours.map((tour) =>
            tour._id === id ? { ...tour, mainImage: newImageUrl } : tour
          ),
          loading: false,
        }));
      } else {
        throw new Error(data.error || "Failed to update main image");
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete an image from galleryImages
  deleteGalleryImage: async (id, imageUrl) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/${id}/delete-gallery-image`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          tours: state.tours.map((tour) =>
            tour._id === id
              ? {
                  ...tour,
                  galleryImages: tour.galleryImages.filter(
                    (img: string) => img !== imageUrl
                  ),
                }
              : tour
          ),
          loading: false,
        }));
      } else {
        throw new Error(data.error || "Failed to delete gallery image");
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchTotalTours: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/total`);
      set({ totalTours: response.data.totalTours, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data.message || error.message,
        loading: false,
      });
    }
  },

  fetchAllTours: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}`);
      console.log("API Response:", response.data); // Log the response for debugging
      set({ tours: response.data.data || [], loading: false }); // Set tours with the "data" field
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        set({ tours: [], loading: false, error: null });
      } else {
        set({ error: error.message, loading: false });
      }
    }
  },
}));
