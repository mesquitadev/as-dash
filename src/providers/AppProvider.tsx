import ErrorFallback from '@/components/ErrorBoundary';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { TenantProvider } from '@/contexts/TenantContext';
import React, { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type AppProviderProps = PropsWithChildren<Record<string, unknown>>;

const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <ErrorBoundary fallback={<ErrorFallback />}>
    <TenantProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </TenantProvider>
  </ErrorBoundary>
);

export default AppProvider;
