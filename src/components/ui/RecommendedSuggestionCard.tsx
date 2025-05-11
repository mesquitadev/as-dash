import { Calendar, Package, Star, TrendingUp } from "lucide-react";
import { Card } from "./card";
import { Button } from "./Button";

interface RecommendedProductProps {
  title: string;
  description: string;
  period: string;
  type: "week" | "month";
  sales?: string;
  action?: string;
  imageUrl?: string;
}

const RecommendedProductCard = ({
  title = "Produto Recomendado",
  description = "Este produto está em alta demanda este mês.",
  period = "Maio 2025",
  type = "month",
  sales = "Vendas 23% acima da média",
  action = "Ver produto",
  imageUrl
}: RecommendedProductProps) => {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-white border-blue-100">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          {type === "week" ? (
            <Calendar className="h-5 w-5 text-blue-500" />
          ) : (
            <Package className="h-5 w-5 text-blue-500" />
          )}
          <span className="text-sm font-medium text-blue-700">
            Produto Recomendado {type === "week" ? "da Semana" : "do Mês"}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-3">
          {imageUrl && (
            <div className="w-16 h-16 rounded-md bg-blue-100 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold mb-1 text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-xs font-medium text-gray-500">{period}</span>
        </div>

        {sales && (
          <div className="flex items-center gap-2 mb-6 bg-blue-50 p-2 rounded-md">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-xs font-medium text-gray-700">{sales}</span>
          </div>
        )}

        <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
          {action}
          <Star className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default RecommendedProductCard;