'use client';

import { type ObscuredUser } from '@/utils/user';
import React from 'react';

export const AdminContext = React.createContext<ObscuredUser | undefined>(undefined);

export default function AdminProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: ObscuredUser;
}) {
  return <AdminContext.Provider value={user}>{children}</AdminContext.Provider>;
}
