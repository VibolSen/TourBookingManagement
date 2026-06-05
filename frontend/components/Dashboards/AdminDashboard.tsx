"use client";

import React, { useEffect } from "react";
import { useAdminStore } from "../../store/adminStore";
import Sidebar from "../Sidebars/AdminSidebar";
import AdminHeader from "../header/AdminHeader";

interface AdminDashboardProps {
  children: React.ReactNode;
  id: string | string[] | undefined;
}

const AdminDashboard = ({ children, id }: AdminDashboardProps) => {
  const { admin, getAdminById } = useAdminStore();

  useEffect(() => {
    if (id) {
      getAdminById(id).catch((err: unknown) => {
        console.error("Failed to fetch admin data:", err);
      });
    }
  }, [id, getAdminById]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar id={id} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Extracted Admin Header */}
        <AdminHeader />

        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
