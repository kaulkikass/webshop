import React from "react";
import { useState } from "react";

                      // null asemel saan kirjutada mis väärtused tal on
                      // kui vajutan muutuja peale punkti
const AuthContext = React.createContext({
  loggedIn: false,
  login: () => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(determineIfLoggedIn);


  function determineIfLoggedIn() {
    if (sessionStorage.getItem("userData")) {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      if (new Date(userData.expires).getTime() > (new Date().getTime())) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  
 
  const loginHandler = () => {
    setLoggedIn(true);
  }

  const logoutHandler = () => {
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{
      loggedIn: isLoggedIn,
      login: loginHandler,
      logout: logoutHandler
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;