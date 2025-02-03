
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

const AuthenticationRoutes = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace("/admin/dashboard-admin");
    }
  }, [isAuthenticated, user, router]);

  if (isAuthenticated && user) {
    return null; // Prevent rendering the login page if authenticated
  }

  return children;
};