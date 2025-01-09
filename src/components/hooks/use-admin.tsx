'use client';

import React from 'react';

type AdminProviderProps = {
  isSuperAdmin: boolean;
};

export const AdminContext = React.createContext<AdminProviderProps>({ isSuperAdmin: false });

export function AdminProvider({
  isSuperAdmin,
  children,
}: React.PropsWithChildren<AdminProviderProps>) {
  return <AdminContext.Provider value={{ isSuperAdmin }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  return React.useContext(AdminContext);
}
