import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
        console.log("EVENT in authProvider is - " + event);
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });    
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);


  console.log("Session User - " + JSON.stringify(user));
  console.log("Session Auth - " + auth);


  return (
    <AuthContext.Provider value={{ user, login, signOut, auth }}>     
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;