"use client";

import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";

const CompanyHeader = () => {
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleDropdownOutsideClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target && !target.closest(".dropdown")) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("click", handleDropdownOutsideClick);
    } else {
      document.removeEventListener("click", handleDropdownOutsideClick);
    }
    return () =>
      document.removeEventListener("click", handleDropdownOutsideClick);
  }, [showDropdown]);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <p className="text-lg font-medium text-gray-800">
        Welcome, {user?.name || "Guest"}
      </p>
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-600 hover:text-blue-600 relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>
        <div className="relative dropdown">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-2 text-gray-600 hover:text-blue-600"
          >
            <Image
              src={user?.image || "/default-avatar.png"}
              alt="User"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">
              {user?.name || "User"}
            </span>
            <span className="text-sm font-medium">
              {user?.role || "Company"}
            </span>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default CompanyHeader;
