import React from 'react';
import LineChart from '@/components/Dashboard/LineChart';
import StatCard from '@/components/Dashboard/StatCard';
import { Card } from '@/components/ui/card';
import { Award, Calendar, ChartBar, ChartPie, ShoppingBag, Users } from 'lucide-react';

const MembersDashboard = () => {
  const membershipData = [
    { itemName: 'Jan', totalQuantitySold: 65 },
    { itemName: 'Fev', totalQuantitySold: 78 },
    { itemName: 'Mar', totalQuantitySold: 90 },
    { itemName: 'Abr', totalQuantitySold: 85 },
    { itemName: 'Mai', totalQuantitySold: 95 },
    { itemName: 'Jun', totalQuantitySold: 110 },
  ];

  const revenueData = [
    { itemName: 'Jan', totalQuantitySold: 12500 },
    { itemName: 'Fev', totalQuantitySold: 15800 },
    { itemName: 'Mar', totalQuantitySold: 14200 },
    { itemName: 'Abr', totalQuantitySold: 16500 },
    { itemName: 'Mai', totalQuantitySold: 18900 },
    { itemName: 'Jun', totalQuantitySold: 21000 },
  ];

  const indicadoresData = {
    totalSales: 0,
    totalUsers: 0,
    totalVouchersIssued: 0,
    totalVouchersRedeemed: 0,
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Dashboard do Clube</h1>
        <p className='text-gray-500 dark:text-gray-400'>Visão geral do programa de fidelidade</p>
      </div>

      {/* Stats Grid */}
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total de Produtos Vendidos'
          value={indicadoresData?.totalSales || 0}
          icon={ChartBar}
        />
        <StatCard
          title='Usuários Cadastrados'
          value={indicadoresData?.totalUsers || 0}
          icon={Users}
        />
        <StatCard
          title='Vouchers Emitidos'
          value={indicadoresData?.totalVouchersIssued || 0}
          icon={Calendar}
        />
        <StatCard
          title='Vouchers Resgatados'
          value={indicadoresData?.totalVouchersRedeemed || 0}
          icon={ChartPie}
        />
      </div>

      {/* Charts Grid */}
      <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
        <LineChart
          data={membershipData}
          title='Crescimento de Membros'
          subtitle='Últimos 6 meses'
        />
        <LineChart
          data={revenueData}
          title='Receita do Clube'
          subtitle='Últimos 6 meses'
        />
      </div>

      {/* Bottom Grid */}
      <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
        {/* Níveis do Clube */}
        <Card className='p-6'>
          <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
            <Award className='h-5 w-5 text-primary' />
            Distribuição por Nível
          </h3>
          <div className='space-y-4'>
            {[
              { name: 'Bronze', members: 1450, percentage: 51 },
              { name: 'Prata', members: 842, percentage: 29 },
              { name: 'Ouro', members: 412, percentage: 14 },
              { name: 'Platinum', members: 143, percentage: 6 },
            ].map((level) => (
              <div key={level.name} className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='font-medium'>{level.name}</span>
                  <span className='text-gray-500'>{level.members} membros</span>
                </div>
                <div className='h-2 bg-gray-100 rounded-full'>
                  <div
                    className='h-full bg-primary rounded-full'
                    style={{ width: `${level.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Últimas Transações */}
        <Card className='p-6'>
          <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
            <ShoppingBag className='h-5 w-5 text-primary' />
            Últimas Transações
          </h3>
          <div className='space-y-4'>
            {[
              { name: 'João Silva', points: 2500, date: 'Hoje, 14:30', level: 'Ouro' },
              { name: 'Maria Santos', points: 1800, date: 'Hoje, 12:15', level: 'Prata' },
              { name: 'Pedro Costa', points: 3200, date: 'Ontem, 18:45', level: 'Platinum' },
              { name: 'Ana Oliveira', points: 950, date: 'Ontem, 15:20', level: 'Bronze' },
            ].map((transaction, i) => (
              <div key={i} className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                    <Users className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <p className='font-medium'>{transaction.name}</p>
                    <p className='text-sm text-gray-500'>{transaction.date}</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium text-primary'>+{transaction.points} pts</p>
                  <p className='text-sm text-gray-500'>{transaction.level}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MembersDashboard;
