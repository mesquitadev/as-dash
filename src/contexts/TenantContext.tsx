import { setTenantId as setTenantIdAction } from '@/features/selectedTenantSlice';
import { useOidc } from '@/oidc';
import { apiSlice } from '@/services/apiSlice';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export interface TenantOption {
  value: string;
  label: string;
}

export interface TenantContextProps {
  tenantId: string;
  setTenantId: (tenantId: string) => void;
  tenantOptions: TenantOption[];
}

export const TenantContext = createContext<TenantContextProps | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { decodedIdToken } = useOidc();
  const dispatch = useDispatch();
  const [tenantId, setTenantIdState] = useState<string>('');
  const [tenantOptions, setTenantOptions] = useState<TenantOption[]>([]);

  const setTenantId = useCallback(
    (id: string) => {
      if (id !== tenantId) {
        setTenantIdState(id);
        dispatch(setTenantIdAction(id));
        dispatch(apiSlice.util.resetApiState());
      }
    },
    [dispatch, tenantId],
  );

  useEffect(() => {
    if (decodedIdToken) {
      const empresas = decodedIdToken.empresas || [];

      const options = empresas.map((empresa: string) => ({
        value: empresa,
        label: empresa.toUpperCase(),
      }));

      setTenantOptions(options);

      if (!tenantId && options.length > 0) {
        const defaultTenantId = options[0].value;
        setTenantIdState(defaultTenantId);
        dispatch(setTenantIdAction(defaultTenantId));
      }
    }
  }, [decodedIdToken, tenantId, dispatch]);

  return (
    <TenantContext.Provider value={{ tenantId, setTenantId, tenantOptions }}>
      {children}
    </TenantContext.Provider>
  );
};
