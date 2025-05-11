
import { useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataItem {
  itemName: string;
  totalQuantitySold: number;
  abcCategory: string;
}

interface TopProductsTableProps {
  data: DataItem[];
  maxItems?: number;
}

const TopProductsTable = ({ data, maxItems = 10 }: TopProductsTableProps) => {
  // Ordenar e limitar os dados
  const tableData = useMemo(() => {
    return [...data]
      .sort((a, b) => b.totalQuantitySold - a.totalQuantitySold)
      .slice(0, maxItems);
  }, [data, maxItems]);

  // Calcular o total de vendas para as porcentagens
  const totalSold = useMemo(() => {
    return data.reduce((sum, item) => sum + item.totalQuantitySold, 0);
  }, [data]);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
            <TableHead className="text-center">Categoria</TableHead>
            <TableHead className="text-right">% do Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((product) => (
            <TableRow key={product.itemName}>
              <TableCell className="font-medium">{product.itemName}</TableCell>
              <TableCell className="text-right">{product.totalQuantitySold.toLocaleString()}</TableCell>
              <TableCell className="text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${product.abcCategory === 'A' ? 'bg-purple-100 text-purple-800' : 
                    product.abcCategory === 'B' ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {product.abcCategory}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {((product.totalQuantitySold / totalSold) * 100).toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopProductsTable;
