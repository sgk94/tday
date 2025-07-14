// components/RequireRole.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";
import { Loader } from "lucide-react";

type RequireRoleProps = {
  allowed: string | string[];
};

export default function RequireRole({ allowed }: RequireRoleProps) {
  const { user, role: userRole, loading } = useAuth();

  if (loading)
    return (
      <Loader className="flex size-8 animate-spin items-center justify-center" />
    );

  const allowedArray = Array.isArray(allowed) ? allowed : [allowed];

  if (!user || !allowedArray.includes(userRole ?? "")) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <Outlet />;
}
