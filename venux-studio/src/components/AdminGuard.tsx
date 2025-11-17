import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

const AdminGuard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/auth/login");
    else if (role !== "admin") router.push("/");
  }, [isAuthenticated, role]);

  if (!isAuthenticated || role !== "admin") return null;
  return <>{children}</>;
};

export default AdminGuard;
