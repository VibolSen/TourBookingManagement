"use client";

import React, { useState, useEffect } from "react";
import { Home, Calendar, Plus, User, Star, LogOut, Bell } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useAdminStore } from "../store/adminStore";
import Link from "next/link";

const Dashboard = ({ children, id }) => {
  const { logout } = useAuthStore();
  const { admin, error, loading, getAdminById } = useAdminStore();
  const [activeLink, setActiveLink] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getAdminById(id).catch((err) => {
        console.error("Failed to fetch admin data:", err);
      });
    }
  }, [id, getAdminById]);

  const handleLinkClick = (link) => setActiveLink(link);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
  };

  const navigationLinks = [
    { name: "Dashboard", icon: Home, href: `/admin/${id}/dashboard-admin/` },
    { name: "Category", icon: Calendar, href: `/admin/${id}/category/` },
    { name: "Location", icon: Plus, href: `/admin/${id}/location/` },
    { name: "Users", icon: User, href: `/admin/${id}/user/` },
    { name: "Reviews", icon: Star, href: `/admin/${id}/reviews/` },
    { name: "Logout", icon: LogOut },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="flex flex-col items-center py-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-[70px] w-auto mb-2 object-cover"
          />
        </div>

        <nav className="mt-4 space-y-1">
          {navigationLinks.map((item) => (
            <div key={item.name}>
              {item.name === "Logout" ? (
                <button
                  onClick={handleLogout}
                  className={`flex items-center w-full px-4 py-3 rounded-lg gap-4 text-sm font-medium ${
                    activeLink === item.name.toLowerCase()
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  disabled={isLoading}
                >
                  <item.icon className="w-5 h-5" />
                  {isLoading ? "Logging out..." : item.name}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center w-full px-4 py-3 rounded-lg gap-4 text-sm font-medium ${
                    activeLink === item.name.toLowerCase()
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleLinkClick(item.name.toLowerCase())}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-10 py-2 text-sm bg-gray-100 border rounded-full focus:ring focus:ring-blue-300 focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute w-5 h-5 text-gray-400 top-2.5 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
              />
            </svg>
          </div>

          <div className="flex items-center space-x-8">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                9
              </span>
            </button>

            {admin ? (
              <div className="text-right">
                <p className="text-lg font-medium">{admin.name}</p>
                <p className="text-xs text-gray-500">
                  {admin.role || " Admin"}
                </p>
              </div>
            ) : (
              <div className="text-right">
                <p className="text-lg font-medium">Guest</p>
                <p className="text-xs text-gray-500">No role available</p>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Dashboard;
