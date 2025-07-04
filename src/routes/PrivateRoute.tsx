import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader } from "lucide-react";
import type { ReactElement } from "react";

export default function PrivateRoute({ children }: { children: ReactElement }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader className="animate-spin" />;

  return user ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
}
