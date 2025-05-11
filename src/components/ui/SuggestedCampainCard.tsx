import { Calendar, Megaphone, Star, Trophy } from "lucide-react";
import { Card } from "./card";
import { Button } from "./Button";

interface SuggestedCampaignProps {
  title: string;
  description: string;
  period: string;
  type: "week" | "month";
  potential?: string;
  action?: string;
}

const SuggestedCampaignCard = ({
  title = "Campanha de Fidelidade",
  description = "Ofereça descontos especiais para clientes recorrentes.",
  period = "Maio 2025",
  type = "month",
  potential = "Aumento de 15% nas compras recorrentes",
  action = "Ver detalhes"
}: SuggestedCampaignProps) => {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-white border-purple-100">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          {type === "week" ? (
            <Calendar className="h-5 w-5 text-purple-500" />
          ) : (
            <Megaphone className="h-5 w-5 text-purple-500" />
          )}
          <span className="text-sm font-medium text-purple-700">
            Campanha Sugerida {type === "week" ? "da Semana" : "do Mês"}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-xs font-medium text-gray-500">{period}</span>
        </div>

        {potential && (
          <div className="flex items-center gap-2 mb-6 bg-purple-50 p-2 rounded-md">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-medium text-gray-700">{potential}</span>
          </div>
        )}

        <Button className="w-full gap-2 bg-purple-600 hover:bg-purple-700">
          {action}
          <Star className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default SuggestedCampaignCard;