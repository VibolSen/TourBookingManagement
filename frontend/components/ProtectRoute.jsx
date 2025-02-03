import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      console.log(
        "User not authenticated or role mismatch. Redirecting to login..."
      );
      router.replace("/login");
    }
  }, [isAuthenticated, user, router, requiredRole, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== requiredRole) {
    return null; // Prevent rendering protected content while redirecting
  }

  return <>{children}</>;
};

export default ProtectedRoute;
