import { useAuth } from "~/context/AuthContext";
import { Navigate } from "react-router";
import type { Roles } from "~/context/AuthContext";

type RequireRoleProps = {
  allowed: Roles[];
  children: React.ReactNode;
};
export const ProtectedRoute = ({ allowed, children }: RequireRoleProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowed.includes(user.roles.name)) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};
