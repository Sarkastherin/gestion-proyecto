import { useAuth } from "~/context/AuthContext";
import { Navigate } from "react-router";
import type { Roles } from "~/context/AuthContext";
import { useEffect } from "react";

type RequireRoleProps = {
  allowed: Roles[];
  children: React.ReactNode;
};
export const ProtectedRoute = ({ allowed, children }: RequireRoleProps) => {
  const { user } = useAuth();
  const includesRole = (role: Roles) => {
    return allowed.includes(role);
  }
  const includesUsername = (username: string) => {
    return allowed.includes(username as Roles);
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!includesRole(user.roles.name) && !includesUsername(user.user_name))
    return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};
