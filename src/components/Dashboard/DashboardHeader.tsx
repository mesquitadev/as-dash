interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  return (
    <div className='flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
        {subtitle && <p className='text-muted-foreground'>{subtitle}</p>}
      </div>
    </div>
  );
};

export default DashboardHeader;
