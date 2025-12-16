// Permission.tsx
import type  React  from "react";
import { useAuth } from "~/context/AuthContext";

type PermissionProps = {
  roles: string[];
  children: React.ReactNode;
};

export const Permission = ({ roles, children }: PermissionProps) => {
  const { user } = useAuth();

  if (!user) return null;
  return roles.includes(user.roles.name) || roles.includes(user.user_name) ? <>{children}</> : null;
};
