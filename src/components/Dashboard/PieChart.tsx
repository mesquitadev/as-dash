
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DataItem {
  itemName: string;
  totalQuantitySold: number;
  abcCategory: string;
}

interface PieChartProps {
  data: DataItem[];
}

const PieChart = ({ data }: PieChartProps) => {
  // Agrupar vendas por categoria ABC
  const categoryTotals = data.reduce<Record<string, number>>((acc, item) => {
    const category = item.abcCategory;
    acc[category] = (acc[category] || 0) + item.totalQuantitySold;
    return acc;
  }, {});

  // Preparar dados para o gráfico
  const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));

  // Cores para cada categoria ABC
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  // Calcular a porcentagem para cada categoria
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const chartDataWithPercent = chartData.map(item => ({
    ...item,
    percent: Math.round((item.value / total) * 100)
  }));

  // Função para formatar o tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-md">
          <p className="font-semibold">{`Categoria ${payload[0].name}`}</p>
          <p>{`Quantidade: ${payload[0].value}`}</p>
          <p>{`Percentual: ${payload[0].payload.percent}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Renderizar label com a porcentagem
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={chartDataWithPercent}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {chartDataWithPercent.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
