import { createContext, useContext } from "react";

import type { User, UserCredential } from "firebase/auth";

export type AuthContextType = {
  user: User | null | undefined;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  role: string | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
