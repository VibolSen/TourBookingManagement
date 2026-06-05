"use client";

import React, { useState } from "react";
import { Home, Calendar, Plus, User, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "../../store/authStore";
import { useAdminStore } from "../../store/adminStore";
import { usePathname, useRouter } from "next/navigation";

interface AdminSidebarProps {
  id: string | string[] | undefined;
}

const AdminSidebar = ({ id }: AdminSidebarProps) => {
  const { logout } = useAuthStore();
  const { logout: adminLogout } = useAdminStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      adminLogout();
      router.push("/login-admin");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const navigationLinks = [
    { name: "Dashboard", icon: Home, href: `/admin/${id}/dashboard-admin` },
    { name: "Category", icon: Calendar, href: `/admin/${id}/category` },
    { name: "Location", icon: Plus, href: `/admin/${id}/location` },
    { name: "Users", icon: User, href: `/admin/${id}/user` },
    { name: "Logout", icon: LogOut, href: "" },
  ];

  return (
    <aside className="w-64 bg-white border-r">
      <div className="flex flex-col items-center py-6">
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={70}
          className="h-[70px] w-auto mb-2 object-cover"
        />
      </div>

      <nav className="mt-4 space-y-1 px-2">
        {navigationLinks.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          
          return (
            <div key={item.name}>
              {item.name === "Logout" ? (
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

export default AdminSidebar;
