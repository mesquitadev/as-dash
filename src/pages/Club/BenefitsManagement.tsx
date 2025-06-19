 import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const BenefitsManagement = () => {
  const membershipLevels = [
    {
      name: 'Bronze',
      pointsRequired: '0-1000',
      benefits: [
        'Desconto de 5% em produtos',
        'Acesso ao clube de vantagens',
        'Newsletter exclusiva'
      ]
    },
    {
      name: 'Prata',
      pointsRequired: '1001-2500',
      benefits: [
        'Desconto de 10% em produtos',
        'Frete grátis',
        'Acesso prioritário a novos produtos',
        'Newsletter exclusiva'
      ]
    },
    {
      name: 'Ouro',
      pointsRequired: '2501-5000',
      benefits: [
        'Desconto de 15% em produtos',
        'Frete grátis',
        'Acesso VIP a eventos',
        'Presentes de aniversário',
        'Atendimento prioritário'
      ]
    },
    {
      name: 'Platinum',
      pointsRequired: '5001+',
      benefits: [
        'Desconto de 20% em produtos',
        'Frete grátis',
        'Eventos exclusivos',
        'Consultoria personalizada',
        'Presentes especiais',
        'Linha direta de atendimento'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Níveis de Associação</h2>
        <Button>Adicionar Nível</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {membershipLevels.map((level) => (
          <Card key={level.name} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{level.name}</h3>
              <Button variant="outline" size="sm">Editar</Button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Pontos necessários: {level.pointsRequired}
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Benefícios:</p>
              <ul className="text-sm space-y-1">
                {level.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Benefícios Disponíveis</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Benefício</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Nível Mínimo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  name: 'Desconto em Produtos',
                  description: 'Desconto progressivo baseado no nível',
                  minLevel: 'Bronze',
                  status: 'Ativo'
                },
                {
                  name: 'Frete Grátis',
                  description: 'Frete grátis em todas as compras',
                  minLevel: 'Prata',
                  status: 'Ativo'
                },
                {
                  name: 'Eventos Exclusivos',
                  description: 'Acesso a eventos especiais',
                  minLevel: 'Ouro',
                  status: 'Ativo'
                }
              ].map((benefit, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{benefit.name}</TableCell>
                  <TableCell>{benefit.description}</TableCell>
                  <TableCell>{benefit.minLevel}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                      {benefit.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        Desativar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default BenefitsManagement;
