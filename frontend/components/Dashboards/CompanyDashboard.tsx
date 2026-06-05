"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import SidebarCompany from "../Sidebars/CompanySidebar";
import CompanyHeader from "../header/CompanyHeader";

interface CompanyDashboardProps {
  children: React.ReactNode;
  id: string | string[] | undefined;
}

const CompanyDashboard = ({ children, id }: CompanyDashboardProps) => {
  const { fetchCompanyById } = useAuthStore();

  useEffect(() => {
    console.log("ID passed to CompanyDashboard:", id);
    if (id) {
      fetchCompanyById(id).catch((err) =>
        console.error("Failed to fetch company data:", err)
      );
    }
  }, [id, fetchCompanyById]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarCompany id={id} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Extracted Company Header */}
        <CompanyHeader />

        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">{children}</div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
