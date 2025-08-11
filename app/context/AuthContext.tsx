import { createContext, useContext, useState, type ReactNode } from "react";
import { supabase } from "~/backend/supabaseClient";
import type { User, Session, AuthError } from "@supabase/supabase-js";
export type MyUser = {
  id: number;
  created_at: string;
  auth_user_id: string;
  name: string;
  last_name: string;
  roll: string;
  user_name: string;
};
type AuthContextType = {
  session: Session | null;
  user: MyUser | null;
  signIn: (params: SignInParams) => Promise<SignInResponse>;
  signOut: () => Promise<AuthError | null>;
  auth: () => Promise<() => void>;
};
type AuthProviderProps = {
  children: ReactNode;
};
type SignInParams = {
  email: string;
  password: string;
};
type SignInResponse = {
  data: {
    session: Session | null;
    user: User | null;
  } | null;
  error: AuthError | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<MyUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const auth = async () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    if (session) {
      getUser(session.user.id);
    }
    return () => subscription.unsubscribe();
  };
  const getUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("auth_user_id", userId);
      if (error) {
        alert(`No se pudo acceder al servidor: Error: ${error.message}`);
        return;
      }
      setUser(data[0]);
      return;
    } catch (e) {
      console.error("Error fetching user:", e);
      return;
    }
  };
  const signIn = async ({ email, password }: SignInParams) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return error;
    return null;
  };
  return (
    <AuthContext.Provider value={{ user, session, signIn, signOut, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
