import React, { createContext, useState } from 'react';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage
    const storedUser = localStorage.getItem('user');
    // Check if storedUser exists AND is not the string "undefined"
    return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  });

  const loginUser = (userData) => {
    // Make sure userData has all required fields
    if (userData) {
      setUser(userData);
      localStorage.setItem('token', userData.token || '');
      localStorage.setItem('user', JSON.stringify(userData)); // Store full user data
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateUserProfile = (updatedData) => {
    // For updating user profile info such as image
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AccountContext.Provider value={{ user, loginUser, logoutUser, updateUserProfile }}>
      {children}
    </AccountContext.Provider>
  );
};