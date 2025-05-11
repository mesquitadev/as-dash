
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useMemo } from 'react';

interface DataItem {
  itemName: string;
  totalQuantitySold: number;
  abcCategory: string;
}

interface LineChartProps {
  data: DataItem[];
  maxItems?: number;
}

const LineChart = ({ data, maxItems = 10 }: LineChartProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Ordenar e filtrar dados
  const chartData = useMemo(() => {
    // Filtrar por categoria, se selecionada
    const filteredData = selectedCategory 
      ? data.filter(item => item.abcCategory === selectedCategory)
      : data;

    // Ordenar por quantidade vendida (decrescente)
    const sortedData = [...filteredData].sort((a, b) => b.totalQuantitySold - a.totalQuantitySold);
    
    // Limitar aos primeiros N itens
    return sortedData.slice(0, maxItems);
  }, [data, selectedCategory, maxItems]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };

  // Preparar dados para o gráfico
  const formattedData = chartData.map((item, index) => ({
    name: item.itemName.length > 15 ? `${item.itemName.substring(0, 12)}...` : item.itemName,
    quantidade: item.totalQuantitySold,
    category: item.abcCategory,
    fullName: item.itemName,
  }));

  // Função para formatar o tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
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
    <div className="w-full">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 text-sm rounded-md ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Todos
        </button>
        <button
          onClick={() => handleCategoryClick('A')}
          className={`px-3 py-1 text-sm rounded-md ${selectedCategory === 'A' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
        >
          Categoria A
        </button>
        <button
          onClick={() => handleCategoryClick('B')}
          className={`px-3 py-1 text-sm rounded-md ${selectedCategory === 'B' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Categoria B
        </button>
        <button
          onClick={() => handleCategoryClick('C')}
          className={`px-3 py-1 text-sm rounded-md ${selectedCategory === 'C' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        >
          Categoria C
        </button>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <RechartsLineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
        >
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
          <Line 
            type="monotone" 
            dataKey="quantidade" 
            name="Quantidade Vendida"
            stroke="#8884d8" 
            strokeWidth={2}
            activeDot={{ r: 6 }} 
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
