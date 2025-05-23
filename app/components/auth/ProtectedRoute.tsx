"use client";
import { useAuth } from "@/app/application/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("ProtectedRoute - État:", { user, loading });

    if (!loading && (!user || user.role !== "admin" || !user.emailVerified)) {
      console.log("Redirection vers /login - Raisons:", {
        pasUtilisateur: !user,
        pasAdmin: user && user.role !== "admin",
        emailNonVerifie: user && !user.emailVerified,
      });
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    console.log("ProtectedRoute - Chargement en cours");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin" || !user.emailVerified) {
    console.log("ProtectedRoute - Accès refusé");
    return null;
  }

  console.log("ProtectedRoute - Accès autorisé");
  return <>{children}</>;
};
