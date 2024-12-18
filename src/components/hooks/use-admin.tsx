'use client';

import { type ObscuredUser } from '@/utils/user';
import React from 'react';

export const AdminContext = React.createContext<ObscuredUser | undefined>(undefined);

export function AdminProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: ObscuredUser;
}) {
  return <AdminContext.Provider value={user}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = React.useContext(AdminContext);

  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }

  return context;
}
