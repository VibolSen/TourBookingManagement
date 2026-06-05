"use client";

import React from "react";
import { Bell } from "lucide-react";
import { useAdminStore } from "../../store/adminStore";

const AdminHeader = () => {
  const { admin } = useAdminStore();

  return (
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
              {admin.role || "Admin"}
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
  );
};

export default AdminHeader;
