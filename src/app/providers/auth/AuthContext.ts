import { createContext } from "react";
import type { User } from "@/entities/user/model/types";

export interface AuthContextType {
  user: User | null;
  login: (name: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
