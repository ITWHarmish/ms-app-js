import React, { useContext, useState } from "react";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children, value }) => {
  const [userAccess, setUserAccess] = useState(null);

  const updateUserAccess = (value) => {
    setUserAccess(value);
  };

  return <AuthContext.Provider value={{ ...value, userAccess, updateUserAccess }}>{children}</AuthContext.Provider>;
};

export const useAuthValue = () => {
  return useContext(AuthContext);
};
