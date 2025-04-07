import { createContext, useContext } from "react";
import { supabase } from "../API/supabaseClient";
import { useState } from "react";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
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
  const singIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return { data, error };
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return error;
  };
  const getUser = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id_usuario", userId);
      if(error) {console.log(error)}
      else {setUser(data[0])}
    } catch (e) {
      console.error("Error fetching user:", e);
      return;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, session, singIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};
