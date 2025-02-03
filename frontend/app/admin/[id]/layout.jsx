"use client";

import Dashboard from "@/components/Dashboard";
import { useAuthStore } from "../../../store/authStore";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const { id } = useParams(); // Get the company ID from the URL

  useEffect(() => {
    if (!isAuthenticated && !user) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return null; // or a loading spinner
  }

  return children;
};

const Layout = ({ children }) => {
  const { isAuthenticated, checkAuth, user, isCheckingAuth } = useAuthStore();
  const router = useRouter();
  const { id } = useParams(); // Use `useParams` to get the dynamic route parameter

  useEffect(() => {
    checkAuth(); // Check authentication status when the component mounts
  }, [checkAuth]);

  return (
    <Dashboard id={id}>
      {" "}
      {/* Pass the `id` to Dashboard */}
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </Dashboard>
  );
};

export default Layout;
