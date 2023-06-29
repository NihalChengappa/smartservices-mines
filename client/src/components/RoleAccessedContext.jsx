import React, { createContext, useState } from 'react';

export const RoleAccessedContext = createContext();

export const RoleAccessedProvider = ({ children }) => {
  const [roleAccessed, setRoleAccessed] = useState('');

  return (
    <RoleAccessedContext.Provider value={{ roleAccessed, setRoleAccessed }}>
      {children}
    </RoleAccessedContext.Provider>
  );
};
