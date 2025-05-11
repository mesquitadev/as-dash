
import { ChartPie, Users, Calendar } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-medium">
            {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
