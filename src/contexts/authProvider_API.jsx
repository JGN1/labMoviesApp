import React, { useState, useContext, createContext } from "react";
import { login, signup } from "../api/ewd-api-jn-2023";

// export const AuthContext = createContext(null);

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [email, setEmail] = useState("");

  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  // const login = async (email, password) => {
  const authenticate = async (email, password) => {
    const result = await login(email, password);
    if (result.token) {
      console.log("in login set token area");
      setToken(result.token)
      setAuth(true);
      setEmail(email);
      setUser(email);
    }
  };

  const register = async (email, password, firstName, lastName) => {
    const result = await signup(email, password, firstName, lastName);
    console.log(result.code);
    return (result.code == 201) ? true : false;
  };

  const signout = () => {
    setTimeout(() => setAuth(false), 100);
  }

    return (
      <AuthContext.Provider
        value={{
          user,
          // login,
          authenticate,
          // register,
          signout,
          auth
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );

};

export default AuthContextProvider;
