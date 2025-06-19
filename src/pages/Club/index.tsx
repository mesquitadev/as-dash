import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MembersList from './MembersList';
import MembersDashboard from './MembersDashboard';
import BenefitsManagement from './BenefitsManagement';

const ClubPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Clube de Membros</h1>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="members">Membros</TabsTrigger>
          <TabsTrigger value="benefits">Benefícios</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <MembersDashboard />
        </TabsContent>

        <TabsContent value="members">
          <MembersList />
        </TabsContent>

        <TabsContent value="benefits">
          <BenefitsManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClubPage;
