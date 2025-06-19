import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
  valuePrefix,
  valueSuffix
}: StatCardProps) => {
  return (
    <Card className={cn(
      "relative overflow-hidden",
      "bg-gradient-to-br from-white to-gray-50/80",
      "dark:from-gray-900 dark:to-gray-800/50",
      "border border-gray-100 dark:border-gray-800",
      className
    )}>
      <div className="p-6 flex flex-col h-full relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-xl bg-primary/10 dark:bg-primary/20">
            <Icon size={24} className="text-primary" />
          </div>
          {trend && (
            <span className={cn(
              "flex items-center text-sm font-medium rounded-lg px-2.5 py-0.5",
              trend.isPositive ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100",
              "dark:text-white dark:bg-opacity-10"
            )}>
              <span className="mr-1">{trend.isPositive ? '↑' : '↓'}</span>
              {Math.abs(trend.value)}%
            </span>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {valuePrefix}{value}{valueSuffix}
          </p>
        </div>
      </div>

      {/* Decorative background */}
      <div className="absolute right-0 top-0 -mt-4 -mr-4 h-24 w-24 rounded-full
                    bg-primary/5 dark:bg-primary/10 blur-2xl transform rotate-45" />
      <div className="absolute left-0 bottom-0 -mb-4 -ml-4 h-24 w-24 rounded-full
                    bg-primary/5 dark:bg-primary/10 blur-2xl transform -rotate-45" />
    </Card>
  );
};

export default StatCard;
