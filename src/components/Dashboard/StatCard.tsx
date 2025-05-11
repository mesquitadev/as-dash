
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
  bgColor?: string;
  change?: number;
}

const StatCard = ({ title, value, icon, bgColor = "bg-white", change }: StatCardProps) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6 flex flex-col border border-gray-100`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>
      <div className="flex items-end mt-2">
        <span className="text-2xl font-bold">{value}</span>
        {change !== undefined && (
          <div className={`ml-2 text-xs ${change >= 0 ? "text-green-500" : "text-red-500"} flex items-center`}>
            {change >= 0 ? "+" : ""}{change}%
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
