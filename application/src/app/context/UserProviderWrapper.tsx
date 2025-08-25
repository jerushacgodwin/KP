// app/context/UserProviderWrapper.tsx
'use client';

import { ReactNode } from 'react';
import { UserContext } from './UserContext';

type User = {
  id: string;
  name: string;
  role: number;
  email: string;
};

export default function UserProviderWrapper({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
