import { Navigate } from "react-router-dom";
import { ROUTES } from "@/shared/lib/routes";
import { useAuthContext } from "@/app/providers/auth/useAuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthGuard = ({ children, requireAuth = true }: AuthGuardProps) => {
  const { user } = useAuthContext();

  if (requireAuth && !user) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  if (!requireAuth && user) {
    return <Navigate to={ROUTES.PLAN} replace />;
  }

  return <>{children}</>;
};
