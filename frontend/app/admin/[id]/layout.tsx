"use client";

import React from "react";
import Dashboard from "@/components/Dashboards/AdminDashboard";
import { useAuthStore } from "../../../store/authStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { checkAuth } = useAuthStore();
  const params = useParams(); // Use `useParams` to get the dynamic route parameter
  const id = params?.id as string;

  useEffect(() => {
    checkAuth(); // Check authentication status when the component mounts
  }, [checkAuth]);

  return (
    <Dashboard id={id}>
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </Dashboard>
  );
};

export default Layout;
