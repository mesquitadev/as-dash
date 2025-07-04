// @ts-nocheck
import { useMemo, useState } from 'react';
import { Calendar, ChartBar, ChartPie, Search, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '@components/ui/card';
import { Input } from '@components/ui/Input';
import StatCard from '@components/Dashboard/StatCard';
import ChartCard from '@components/Dashboard/ChartCard';
import BarChart from '@components/Dashboard/BarChart';
import PieChart from '@components/Dashboard/PieChart';
import LineChart from '@components/Dashboard/LineChart';
import TopProductsTable from '@components/Dashboard/TopProductsTable';
import CategoryDistributionCard from '@components/Dashboard/CategoryDistributionCard';
import DashboardHeader from '@components/Dashboard/DashboardHeader';
import { useGetIndicadoresQuery, useGetMostSoldItemsQuery } from '@features/indicatorsApiSlice';
import { DateRangePicker } from '@components/ui/DateRangePicker';
import SuggestedCampaignCard  from '@components/ui/SuggestedCampainCard';
import RecommendedProductCard from '@components/ui/RecommendedSuggestionCard';

interface MostSoldItem {
  itemName: string;
  totalQuantitySold: number;
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [startDate, setStartDate] = useState<Date>(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { data: mostSoldItemsData, isLoading: isLoadingMostSold } = useGetMostSoldItemsQuery({
    startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
    endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
  });
  const { data: indicadoresData, isLoading: isLoadingIndicadores } = useGetIndicadoresQuery({
    startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
    endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
  });

  // Filter the fetched data based on the search term
  const filteredSalesData = useMemo(() => {
    if (!mostSoldItemsData?.data) return [];
    return mostSoldItemsData.data.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, mostSoldItemsData]);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        <DashboardHeader
          title='Dashboard de Vendas'
          subtitle='Análise de produtos e métricas de negócio'
        />

        {/* Filtros */}
        <Card className='p-4 mb-5'>
          <div className='flex flex-col lg:flex-row gap-4'>
            {/* Filtro por termo de busca */}
            <div className='relative flex-1'>
              <Input
                placeholder='Filtrar por Produto...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
              <Search className='absolute left-3 top-3 h-4 w-4 text-gray-500' />
            </div>

            {/* Filtro por data */}
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={(date) => setStartDate((prev) => date ?? prev)}
              onEndDateChange={(date) => setEndDate((prev) => date ?? prev)}
            />
          </div>
        </Card>

        {/* Recommendations Cards - Campaigns and Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Suggested Campaign Card */}
          <SuggestedCampaignCard
            title="Campanha de Maio: Fidelização Premium"
            description="Ofereça vantagens exclusivas para clientes que realizarem mais de 3 compras no mês."
            period="Maio 2025"
            type="month"
            potential="Potencial de aumento de 22% na recorrência"
            action="Implementar campanha"
          />

          {/* Recommended Product Card */}
          <RecommendedProductCard
            title="Açaí com Nutella"
            description="Produto com grande potencial de vendas, ideal para cross-selling com nutella ou outros acompanhamentos."
            period="Maio 2025"
            type="month"
            sales="Crescimento de 28% nas últimas 2 semanas"
            action="Ver detalhes do produto"
          />
        </div>

        {(isLoadingMostSold || isLoadingIndicadores) ? (
          <p>Carregando dados...</p>
        ) : (
          <>
            {/* Métricas Principais */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
              <StatCard
                title='Total de Produtos Vendidos'
                value={indicadoresData?.totalSales || 0}
                icon={ChartBar}
                trend={{
                  value: 12,
                  isPositive: true
                }}
              />
              <StatCard
                title='Usuários Cadastrados'
                value={indicadoresData?.totalUsers || 0}
                icon={Users}
                trend={{
                  value: 8,
                  isPositive: true
                }}
              />
              <StatCard
                title='Vouchers Emitidos'
                value={indicadoresData?.totalVouchersIssued || 0}
                icon={Calendar}
                trend={{
                  value: 15,
                  isPositive: true
                }}
              />
              <StatCard
                title='Vouchers Resgatados'
                value={indicadoresData?.totalVouchersRedeemed || 0}
                icon={ChartPie}
                trend={{
                  value: 5,
                  isPositive: true
                }}
              />
            </div>

            {/* Segunda linha - Gráficos principais */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
              {/* Gráfico de Barras - Top Produtos */}
              <div className='lg:col-span-2'>
                <ChartCard title='Top 10 Produtos Mais Vendidos'>
                  <BarChart data={filteredSalesData} maxItems={10} />
                </ChartCard>
              </div>

              {/* Gráfico de Pizza - Distribuição por Categorias */}
              <div className='lg:col-span-1'>
                <ChartCard title='Distribuição por Categorias ABC'>
                  <PieChart data={filteredSalesData} />
                </ChartCard>
              </div>
            </div>

            {/* Terceira linha - Tabela + Distribuição */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
              {/* Tabela de produtos */}
              <div className='lg:col-span-2'>
                <ChartCard title='Top 15 Produtos por Volume de Vendas'>
                  <TopProductsTable data={filteredSalesData} maxItems={15} />
                </ChartCard>
              </div>

              {/* Card de distribuição de categorias */}
              <div className='lg:col-span-1'>
                <CategoryDistributionCard data={filteredSalesData} />
              </div>
            </div>

            {/* Quarta linha - Gráfico de linha */}
            <div className='mb-6'>
              <ChartCard
                title='Análise de Vendas por Produtos'
                description='Filtre por categorias para uma análise detalhada'
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

