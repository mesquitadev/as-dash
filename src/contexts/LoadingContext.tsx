import LoadingBackdrop from '@/components/ui/LoadingBackdrop';
import React, { createContext, useState } from 'react';

export interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {isLoading && <LoadingBackdrop />}
      {children}
    </LoadingContext.Provider>
  );
};
