import { useEffect, useState } from "react";

type User = { email: string; isAdmin?: boolean } | null;

const TOKEN_KEY = "mugix_token";
const USER_KEY = "mugix_user";

export function useAuth() {
  const [user, setUser] = useState<User>(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // keep user in sync with storage
    const handle = () => {
      try {
        const raw = localStorage.getItem(USER_KEY);
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", handle);
    return () => window.removeEventListener("storage", handle);
  }, []);

  const apiBase = import.meta.env.VITE_API_URL || "/api";

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { error: new Error(data.error || "Login failed") };

      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
      return { error: null };
    } catch (err: any) {
      return { error: err };
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    return { error: null };
  }

  async function signUp(_email: string, _password: string) {
    // Sign up not implemented on server
    return { error: new Error("Sign up is not available") };
  }

  const isAdmin = Boolean(user?.isAdmin);

  return {
    user,
    session: null,
    isAdmin,
    loading,
    signIn,
    signUp,
    signOut,
  };
}
