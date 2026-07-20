import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
  );

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
