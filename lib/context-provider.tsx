'use client';

import { createContext, useContext } from 'react';

export const TenantContext = createContext(null);

export function TenantContextProvider({ children, sessionClaims }: {children: any, sessionClaims: any}) {
    return (
        <TenantContext.Provider value={sessionClaims}>
            {children}
        </TenantContext.Provider>
    );
}

export function useTenantContext() {
    return useContext(TenantContext);
}