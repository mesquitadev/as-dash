// @ts-nocheck
import { useMemo, useState } from 'react';
import { ChartBar, ChartPie, Users, Calendar } from "lucide-react";
import StatCard from "@/components/Dashboard/StatCard";
import ChartCard from "@/components/Dashboard/ChartCard";
import BarChart from "@/components/Dashboard/BarChart";
import PieChart from "@/components/Dashboard/PieChart";
import LineChart from "@/components/Dashboard/LineChart";
import TopProductsTable from "@/components/Dashboard/TopProductsTable";
import CategoryDistributionCard from "@/components/Dashboard/CategoryDistributionCard";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { useGetMostSoldItemsQuery, useGetIndicadoresQuery } from "@/features/indicatorsApiSlice";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from the API
  const { data: mostSoldItemsData, isLoading: isLoadingMostSold } = useGetMostSoldItemsQuery({});
  const { data: indicadoresData, isLoading: isLoadingIndicadores } = useGetIndicadoresQuery({});

  // Filter the fetched data based on the search term
  const filteredSalesData = useMemo(() => {
    if (!mostSoldItemsData) return [];
    return mostSoldItemsData.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, mostSoldItemsData]);

  // Calculate the total sales from the filtered data
  const totalSales = useMemo(() => {
    return filteredSalesData.reduce((sum, item) => sum + item.totalQuantitySold, 0);
  }, [filteredSalesData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DashboardHeader
          title="Dashboard de Vendas"
          subtitle="Análise de produtos e métricas de negócio"
        />

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {(isLoadingMostSold || isLoadingIndicadores) ? (
          <p>Carregando dados...</p>
        ) : (
          <>
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard
                title="Total de Produtos Vendidos"
                value={totalSales.toLocaleString()}
                icon={<ChartBar className="w-5 h-5" />}
              />
              <StatCard
                title="Usuários Cadastrados"
                value={indicadoresData?.totalUsers || 0}
                icon={<Users className="w-5 h-5" />}
              />
              <StatCard
                title="Vouchers Emitidos"
                value={indicadoresData?.totalVouchersIssued || 0}
                icon={<Calendar className="w-5 h-5" />}
              />
              <StatCard
                title="Vouchers Resgatados"
                value={indicadoresData?.totalVouchersRedeemed || 0}
                icon={<ChartPie className="w-5 h-5" />}
              />
            </div>

            {/* Segunda linha - Gráficos principais */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Gráfico de Barras - Top Produtos */}
              <div className="lg:col-span-2">
                <ChartCard title="Top 10 Produtos Mais Vendidos">
                  <BarChart data={filteredSalesData} maxItems={10} />
                </ChartCard>
              </div>

              {/* Gráfico de Pizza - Distribuição por Categorias */}
              <div className="lg:col-span-1">
                <ChartCard title="Distribuição por Categorias ABC">
                  <PieChart data={filteredSalesData} />
                </ChartCard>
              </div>
            </div>

            {/* Terceira linha - Tabela + Distribuição */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Tabela de produtos */}
              <div className="lg:col-span-2">
                <ChartCard title="Top 15 Produtos por Volume de Vendas">
                  <TopProductsTable data={filteredSalesData} maxItems={15} />
                </ChartCard>
              </div>

              {/* Card de distribuição de categorias */}
              <div className="lg:col-span-1">
                <CategoryDistributionCard data={filteredSalesData} />
              </div>
            </div>

            {/* Quarta linha - Gráfico de linha */}
            <div className="mb-6">
              <ChartCard
                title="Análise de Vendas por Produtos"
                description="Filtre por categorias para uma análise detalhada"
              >
                <LineChart data={filteredSalesData} maxItems={15} />
              </ChartCard>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;