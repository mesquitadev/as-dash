
import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface DataItem {
  itemName: string;
  totalQuantitySold: number;
  abcCategory: string;
}

interface CategoryDistributionCardProps {
  data: DataItem[];
}

const CategoryDistributionCard = ({ data }: CategoryDistributionCardProps) => {
  // Calcular estatísticas por categoria
  const categoryStats = useMemo(() => {
    const stats = {
      A: { count: 0, totalSold: 0 },
      B: { count: 0, totalSold: 0 },
      C: { count: 0, totalSold: 0 },
    };

    data.forEach(item => {
      const category = item.abcCategory as keyof typeof stats;
      stats[category].count += 1;
      stats[category].totalSold += item.totalQuantitySold;
    });

    const totalItems = data.length;
    const totalSold = data.reduce((sum, item) => sum + item.totalQuantitySold, 0);

    return {
      A: {
        ...stats.A,
        percentItems: (stats.A.count / totalItems) * 100,
        percentSales: (stats.A.totalSold / totalSold) * 100,
      },
      B: {
        ...stats.B,
        percentItems: (stats.B.count / totalItems) * 100,
        percentSales: (stats.B.totalSold / totalSold) * 100,
      },
      C: {
        ...stats.C,
        percentItems: (stats.C.count / totalItems) * 100,
        percentSales: (stats.C.totalSold / totalSold) * 100,
      }
    };
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Distribuição por Categoria ABC</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Categoria A */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="font-medium">Categoria A</span>
              </div>
              <span className="text-sm text-gray-500">
                {categoryStats.A.count} produtos ({categoryStats.A.percentItems.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full" 
                style={{ width: `${categoryStats.A.percentSales}%` }}
              ></div>
            </div>
            <div className="text-sm text-right text-gray-600">
              {categoryStats.A.percentSales.toFixed(1)}% das vendas
            </div>
          </div>
          
          {/* Categoria B */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-medium">Categoria B</span>
              </div>
              <span className="text-sm text-gray-500">
                {categoryStats.B.count} produtos ({categoryStats.B.percentItems.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${categoryStats.B.percentSales}%` }}
              ></div>
            </div>
            <div className="text-sm text-right text-gray-600">
              {categoryStats.B.percentSales.toFixed(1)}% das vendas
            </div>
          </div>
          
          {/* Categoria C */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="font-medium">Categoria C</span>
              </div>
              <span className="text-sm text-gray-500">
                {categoryStats.C.count} produtos ({categoryStats.C.percentItems.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${categoryStats.C.percentSales}%` }}
              ></div>
            </div>
            <div className="text-sm text-right text-gray-600">
              {categoryStats.C.percentSales.toFixed(1)}% das vendas
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryDistributionCard;
