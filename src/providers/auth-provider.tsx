"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { clearLocalUser, getLocalUser, isLocalTestingMode } from "@/lib/local-mode";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLocalTestingMode) {
      const localUser = getLocalUser();
      setSession(null);
      setUser((localUser as unknown as User | null) ?? null);
      setLoading(false);

      const onStorage = () => {
        const current = getLocalUser();
        setUser((current as unknown as User | null) ?? null);
      };

      window.addEventListener("storage", onStorage);
      window.addEventListener("mynbala-local-auth-changed", onStorage);
      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener("mynbala-local-auth-changed", onStorage);
      };
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession ?? null);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const value: AuthContextValue = {
    user,
    session,
    loading,
    signOut: async () => {
      if (isLocalTestingMode) {
        clearLocalUser();
        setUser(null);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("mynbala-local-auth-changed"));
        }
        return;
      }
      await supabase.auth.signOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
