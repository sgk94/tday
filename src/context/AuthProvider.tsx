import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  onIdTokenChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { auth } from "../firebase/config";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./AuthContext";
import { Loader } from "lucide-react";

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const firstRun = { current: true }; // local refish—no re-render need

    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (firstRun.current) {
        setLoading(false); // unblock UI after first answer
        firstRun.current = false;
      }
    });

    const unsubToken = onIdTokenChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setRole(null);
        return;
      }

      setUser(u); // keep user fresh
      try {
        const { claims } = await u.getIdTokenResult();
        setRole(typeof claims.role === "string" ? claims.role : null);
      } catch (err) {
        console.error("token listener", err);
      }
    });

    return () => {
      unsubAuth();
      unsubToken();
    };
  }, []);

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const register = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  const logout = () => signOut(auth);

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    resetPassword,
    logout,
    role,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader
            aria-label="Loading"
            role="status"
            className="size-8 animate-spin"
          />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
