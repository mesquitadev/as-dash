// @ts-nocheck
import { useMemo, useState } from 'react';
import { Calendar, ChartBar, ChartPie, Search, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import StatCard from '@/components/Dashboard/StatCard';
import ChartCard from '@/components/Dashboard/ChartCard';
import BarChart from '@/components/Dashboard/BarChart';
import PieChart from '@/components/Dashboard/PieChart';
import LineChart from '@/components/Dashboard/LineChart';
import TopProductsTable from '@/components/Dashboard/TopProductsTable';
import CategoryDistributionCard from '@/components/Dashboard/CategoryDistributionCard';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import { useGetIndicadoresQuery, useGetMostSoldItemsQuery } from '@/features/indicatorsApiSlice';
import { DateRangePicker } from '@/components/ui/DateRangePicker'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // const { data: mostSoldItemsData, isLoading: isLoadingMostSold } = useGetMostSoldItemsQuery({});
  // const { data: indicadoresData, isLoading: isLoadingIndicadores } = useGetIndicadoresQuery({});
  const [startDate, setStartDate] = useState<Date>(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [endDate, setEndDate] = useState<Date>(new Date());

  // Consulta usando o hook gerado pelo RTK Query
  const { data: mostSoldItemsData, isLoading: isLoadingMostSold } = useGetMostSoldItemsQuery({
    size: 10,
    sort: 'name,asc',
    startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
    endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
  });


  const { data: indicadoresData, isLoading: isLoadingIndicadores } = useGetIndicadoresQuery({
    size: 10,
    sort: 'name,asc',
    startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
    endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
  });


  // Filter the fetched data based on the search term
  const filteredSalesData = useMemo(() => {
    if (!mostSoldItemsData) return [];
    return mostSoldItemsData.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, mostSoldItemsData]);

  // Calculate the total sales from the filtered data
  const totalSales = useMemo(() => {
    return filteredSalesData.reduce((sum, item) => sum + item.totalQuantitySold, 0);
  }, [filteredSalesData]);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        <DashboardHeader
          title='Dashboard de Vendas'
          subtitle='Análise de produtos e métricas de negócio'
        />

        {/* Filtros */}
        <Card className='p-4'>
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
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              className='min-w-[300px]'
            />
          </div>
        </Card>

        {(isLoadingMostSold || isLoadingIndicadores) ? (
          <p>Carregando dados...</p>
        ) : (
          <>
            {/* Métricas Principais */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
              <StatCard
                title='Total de Produtos Vendidos'
                value={indicadoresData?.totalSales}
                icon={<ChartBar className='w-5 h-5' />}
              />
              <StatCard
                title='Usuários Cadastrados'
                value={indicadoresData?.totalUsers || 0}
                icon={<Users className='w-5 h-5' />}
              />
              <StatCard
                title='Vouchers Emitidos'
                value={indicadoresData?.totalVouchersIssued || 0}
                icon={<Calendar className='w-5 h-5' />}
              />
              <StatCard
                title='Vouchers Resgatados'
                value={indicadoresData?.totalVouchersRedeemed || 0}
                icon={<ChartPie className='w-5 h-5' />}
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