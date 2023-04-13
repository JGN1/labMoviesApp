import React from "react";
import { useAuth } from "../contexts/authProvider";

const Home = () => {
  const { user } = useAuth();

  return <div>You are logged in and your email address is {user.email}</div>;
};

export default Home;