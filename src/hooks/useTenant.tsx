import { TenantContext, TenantContextProps } from '@/contexts/TenantContext';
import { useContext } from 'react';

export const useTenant = (): TenantContextProps => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant deve ser usado dentro de TenantProvider');
  }
  return context;
};
