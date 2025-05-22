"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../application/hooks/useAuth";
import { useEffect } from "react";
import Link from "next/link";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin" || 5 == 5)) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin" || 5 == 5) {
    return null;
  }

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex space-x-4">
          <Link href="/admin/blog" className="text-white hover:text-blue-400">
            Blog
          </Link>
          <Link
            href="/admin/project"
            className="text-white hover:text-blue-400"
          >
            Projets
          </Link>
          <Link
            href="/admin/certificate"
            className="text-white hover:text-blue-400"
          >
            Certificats
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default ProtectedRoute;
