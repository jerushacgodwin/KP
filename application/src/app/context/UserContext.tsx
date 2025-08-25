'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  role: number; // 1 for student, 2 for teacher, 3 for admin
  email: string;
};

export const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // You can load user from cookie, localStorage, or API here
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
