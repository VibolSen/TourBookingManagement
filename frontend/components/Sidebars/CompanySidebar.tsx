"use client";

import React, { useState } from "react";
import { Home, Calendar, Plus, User, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "../../store/authStore";

interface CompanySidebarProps {
  id: string | string[] | undefined;
}

const CompanySidebar = ({ id }: CompanySidebarProps) => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const navigationItems = [
    { name: "Dashboard", icon: Home, href: `/company/${id}/dashboard` },
    { name: "Booking", icon: Calendar, href: `/company/${id}/booking` },
    { name: "Add Package", icon: Plus, href: `/company/${id}/addpackage` },
    { name: "Policy", icon: User, href: `/company/${id}/policy` },
    { name: "Logout", icon: LogOut, isLogout: true, href: "" },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm">
      <div className="flex flex-col items-center py-6">
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={70}
          className="h-[70px] w-auto mb-2"
        />
        <h2 className="text-xl font-semibold text-gray-800">Company Name</h2>
      </div>
      <nav className="mt-4 space-y-1 px-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <div key={item.name}>
              {item.isLogout ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 rounded-lg gap-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  disabled={isLoading}
                >
                  <item.icon className="w-5 h-5" />
                  {isLoading ? "Logging out..." : item.name}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center w-full px-4 py-3 rounded-lg gap-4 text-sm font-medium ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default CompanySidebar;
