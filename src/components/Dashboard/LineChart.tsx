import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMemo } from 'react';
import { Card } from '../ui/card';

interface DataItem {
  itemName: string;
  totalQuantitySold: number;
}

interface LineChartProps {
  data: DataItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-300">{label}</p>
        <p className="text-lg font-bold text-primary">
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const LineChart = ({ data, title, subtitle, className }: LineChartProps) => {
  const chartData = useMemo(() => {
    return data.map(item => ({
      name: item.itemName,
      value: item.totalQuantitySold
    }));
  }, [data]);

  return (
    <Card className={className}>
      {(title || subtitle) && (
        <div className="p-6 pb-0">
          {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}

      <div className="p-6 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            onMouseMove={(e: any) => {
              if (e && e.activePayload) {
                // Do something with e.activePayload[0].value if needed
              }
            }}
            onMouseLeave={() => {
              // Handle mouse leave if needed
            }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(147, 51, 234)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="rgb(147, 51, 234)" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dx={-10}
            />

            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="value"
              stroke="rgb(147, 51, 234)"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                stroke: 'rgb(147, 51, 234)',
                strokeWidth: 2,
                fill: 'white'
              }}
              fill="url(#colorGradient)"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default LineChart;
