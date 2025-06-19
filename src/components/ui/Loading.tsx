import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg';
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  default: 'w-8 h-8',
  lg: 'w-12 h-12'
};

export function Loading({
  size = 'default',
  fullScreen = false,
  className,
  ...props
}: LoadingProps) {
  const Wrapper = fullScreen ? FullScreenWrapper : React.Fragment;

  return (
    <Wrapper>
      <div
        className={cn(
          'flex items-center justify-center',
          fullScreen && 'fixed inset-0 bg-background/80 backdrop-blur-sm',
          className
        )}
        {...props}
      >
        <Loader2 className={cn(
          'animate-spin text-primary',
          sizeClasses[size]
        )} />
      </div>
    </Wrapper>
  );
}

const FullScreenWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {children}
  </div>
);
