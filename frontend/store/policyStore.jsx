// src/store/policyStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "https://tourbookingplan-backend.onrender.com/api"; // Replace with your backend URL

//const API_URL = "http://localhost:3500/api";

const usePolicyStore = create((set) => ({
  policies: [], // Array to store policies
  policy: null, // Single policy for viewing/editing
  loading: false, // Loading state
  error: null, // Error state

  // Fetch all policies
  fetchPolicies: async (subAdminId, isActive) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/policies/${subAdminId}`, {
        params: { isActive },
      });
      set({ policies: response.data.policies, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  // Fetch a single policy by ID
  fetchPolicyById: async (subAdminId, policyId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/policies/${subAdminId}/${policyId}`
      );
      set({ policy: response.data.policy, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  // Create a new policy
  createPolicy: async (subAdminId, policyData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/policies/${subAdminId}`,
        policyData
      );
      set((state) => ({
        policies: [...state.policies, response.data.policy],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  // Update a policy
  updatePolicy: async (subAdminId, policyId, policyData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/policies/${subAdminId}/${policyId}`,
        policyData
      );
      set((state) => ({
        policies: state.policies.map((policy) =>
          policy._id === policyId ? response.data.policy : policy
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  // Delete a policy (soft delete)
  deletePolicy: async (subAdminId, policyId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/policies/${subAdminId}/${policyId}`);
      set((state) => ({
        policies: state.policies.filter((policy) => policy._id !== policyId),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },
}));

export default usePolicyStore;
