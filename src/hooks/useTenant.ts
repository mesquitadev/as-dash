import { useState, useEffect } from 'react';

interface UseTenantReturn {
  tenantId: string | null;
  setTenantId: (id: string) => void;
  tenantOptions: Array<{ value: string; label: string }>;
}

export function useTenant(): UseTenantReturn {
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [tenantOptions] = useState([
    { value: '1', label: 'Tenant 1' },
    { value: '2', label: 'Tenant 2' },
  ]);

  useEffect(() => {
    // Initialize with stored tenant or default
    const storedTenant = localStorage.getItem('currentTenant');
    if (storedTenant) {
      setTenantId(storedTenant);
    }
  }, []);

  const handleSetTenantId = (id: string) => {
    setTenantId(id);
    localStorage.setItem('currentTenant', id);
  };

  return {
    tenantId,
    setTenantId: handleSetTenantId,
    tenantOptions,
  };
}
