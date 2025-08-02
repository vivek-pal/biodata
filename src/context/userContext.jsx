import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
const defaultUserState = {
    token: '',
    isLoggedIn: false,
    isRegisteredUser: false,
    isProfileUploaded: false,
    mobileNumber: '',
    userId: '',
    userName: '',
    countryCode: '+91', // Default country code
  };

  const [userState, setUserState] = useState(defaultUserState);

  const updateUser = (updates) => {
    setUserState((prev) => ({ ...prev, ...updates }));
  };

    // Reset user state to default  
    const resetUser = () => {
    setUserState(defaultUserState);
  };    


  return (
    <UserContext.Provider value={{ userState, updateUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = () => useContext(UserContext);
