import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    isLoggedIn: false,
    isRegisteredUser: false,
    isProfileUploaded: false,
    mobileNumber: '',
    userId: '',
    userName: '',
    countryCode: '+91', // Default country code
  });

  const updateUser = (updates) => {
    setUserState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ userState, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = () => useContext(UserContext);
