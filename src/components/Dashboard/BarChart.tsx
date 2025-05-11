
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DataItem {
  itemName: string;
  totalQuantitySold: number;
  abcCategory: string;
}

interface BarChartProps {
  data: DataItem[];
  maxItems?: number;
}

const BarChart = ({ data, maxItems = 10 }: BarChartProps) => {
  // Ordenar os dados por quantidade vendida (em ordem decrescente)
  const sortedData = [...data].sort((a, b) => b.totalQuantitySold - a.totalQuantitySold);
  
  // Pegar apenas os primeiros N itens
  const limitedData = sortedData.slice(0, maxItems);
  
  // Preparar dados para o gráfico com nomes simplificados
  const chartData = limitedData.map(item => ({
    name: item.itemName.length > 15 ? `${item.itemName.substring(0, 15)}...` : item.itemName,
    quantidade: item.totalQuantitySold,
    category: item.abcCategory,
    fullName: item.itemName,
  }));

  // Função para formatar o tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const fullItemName = payload[0].payload.fullName;
      return (
        <div className="bg-white p-3 border rounded shadow-md">
          <p className="font-semibold">{fullItemName}</p>
          <p>Quantidade: <span className="font-semibold">{payload[0].value}</span></p>
          <p>Categoria ABC: <span className="font-semibold">{payload[0].payload.category}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsBarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 70 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          angle={-45} 
          textAnchor="end"
          height={70}
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          dataKey="quantidade" 
          name="Quantidade Vendida" 
          fill="#8884d8"
          radius={[4, 4, 0, 0]}
          fillOpacity={0.8}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
