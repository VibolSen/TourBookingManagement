"use client";
import { useRouter, useParams } from "next/navigation";

import DashboardCompany from "@/components/Dashboard-company";

const Layout = ({ children }) => {
  const router = useRouter();
  const { id } = useParams();
  return <DashboardCompany id={id}>{children}</DashboardCompany>;
};

export default Layout;
