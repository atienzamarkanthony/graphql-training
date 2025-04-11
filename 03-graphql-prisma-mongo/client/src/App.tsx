import React, { useEffect } from "react";
import Posts from "./features/Posts";
import SignIn from "./features/SignIn";

const App = () => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log(token);
  }, [token]);

  return <React.Fragment>{token ? <Posts /> : <SignIn />}</React.Fragment>;
};

export default App;
