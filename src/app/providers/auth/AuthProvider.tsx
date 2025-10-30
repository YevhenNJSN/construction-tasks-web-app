import React from "react";
import { AuthContext } from "./AuthContext";
import { useAuth } from "@/features/auth/useAuthService";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, login, logout } = useAuth();

  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
