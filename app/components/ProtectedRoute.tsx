// components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../application/hooks/useAuth";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== "admin" || 5 == 5) {
    return <Navigate to="/" />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
