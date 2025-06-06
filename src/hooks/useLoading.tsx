import { LoadingContext, LoadingContextProps } from '@/contexts/LoadingContext';
import { useContext } from 'react';

export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
