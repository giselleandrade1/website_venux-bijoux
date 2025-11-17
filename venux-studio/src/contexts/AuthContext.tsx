import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../services/api";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  role?: string | null;
  login: (accessToken: string, refreshToken?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const t =
      typeof window !== "undefined"
        ? localStorage.getItem("venux:token")
        : null;
    if (t) setToken(t);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("venux:role");
      if (stored) setRole(stored);
    }

    const onAuth = (e: any) => {
      const { accessToken, refreshToken } = e?.detail || {};
      if (accessToken) {
        setToken(accessToken);
        try {
          const payload = JSON.parse(atob(accessToken.split(".")[1]));
          if (payload?.role) {
            setRole(payload.role);
            localStorage.setItem("venux:role", payload.role);
          }
        } catch {}
      }
      if (refreshToken && typeof window !== "undefined") {
        localStorage.setItem("venux:refresh", refreshToken);
      }
    };
    window.addEventListener("venux:auth", onAuth as EventListener);
    return () =>
      window.removeEventListener("venux:auth", onAuth as EventListener);
  }, []);

  const login = (accessToken: string, refreshToken?: string) => {
    setToken(accessToken);
    localStorage.setItem("venux:token", accessToken);
    if (refreshToken) localStorage.setItem("venux:refresh", refreshToken);
    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      if (payload?.role) {
        setRole(payload.role);
        localStorage.setItem("venux:role", payload.role);
      }
    } catch {}
    // notify other modules (api) that tokens changed
    try {
      window.dispatchEvent(
        new CustomEvent("venux:auth", { detail: { accessToken, refreshToken } })
      );
    } catch {}
  };
  const logout = async () => {
    // Try to revoke refresh token server-side; ignore errors but attempt to clean server state
    const refresh =
      typeof window !== "undefined"
        ? localStorage.getItem("venux:refresh")
        : null;
    if (refresh) {
      try {
        await api.post("/auth/logout", { refreshToken: refresh });
      } catch (e) {
        // swallow - still clear local state
      }
    }
    setToken(null);
    localStorage.removeItem("venux:token");
    localStorage.removeItem("venux:refresh");
    setRole(null);
    localStorage.removeItem("venux:role");
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
