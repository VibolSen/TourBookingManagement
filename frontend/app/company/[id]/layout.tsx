"use client";
import { useParams } from "next/navigation";

import DashboardCompany from "@/components/Dashboards/CompanyDashboard";

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams();
  return <DashboardCompany id={id}>{children}</DashboardCompany>;
};

export default Layout;
