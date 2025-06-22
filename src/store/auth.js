import { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [allUserData, setAllUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useMemo(() => {
    return {
      user_id: allUserData?.user_id || null,
      username: allUserData?.username || null,
    };
  }, [allUserData]);

  const isLoggedIn = useMemo(() => {
    return allUserData !== null;
  }, [allUserData]);

  const value = {
    allUserData,
    loading,
    user,
    isLoggedIn,
    setUser: setAllUserData,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);