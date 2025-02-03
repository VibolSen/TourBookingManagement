import { create } from "zustand";

const API_CATEGORY_URL =
  "https://tourbookingplan-backend.onrender.com/api/categories";

// const API_CATEGORY_URL = "http://localhost:3500/api/categories";
// Helper function to handle API requests
const fetchApi = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,

  // Fetch all categories from the API
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchApi(`${API_CATEGORY_URL}`);
      set({ categories: data.data || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add a new category
  addCategory: async (newCategory) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchApi(`${API_CATEGORY_URL}`, {
        method: "POST",
        body: JSON.stringify(newCategory),
      });
      if (data.data) {
        set((state) => ({
          categories: [...state.categories, data.data],
          loading: false,
        }));
      }
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Failed to add category:", error.message);
    }
  },

  // Update an existing category
  updateCategory: async (id, updatedCategory) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchApi(`${API_CATEGORY_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedCategory),
      });
      if (data.data) {
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat._id === id ? data.data : cat
          ),
          loading: false,
        }));
      }
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Failed to update category:", error.message);
    }
  },

  // Delete a category
  deleteCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchApi(`${API_CATEGORY_URL}/${id}`, {
        method: "DELETE",
      });
      if (data.message === "Category deleted successfully.") {
        set((state) => ({
          categories: state.categories.filter((cat) => cat._id !== id),
          loading: false,
        }));
      }
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Failed to delete category:", error.message);
    }
  },
}));
