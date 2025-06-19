import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const MembersList = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Input placeholder="Buscar membro..." className="w-64" />
          <select className="rounded-md border p-2">
            <option value="">Todos os Níveis</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Prata</option>
            <option value="gold">Ouro</option>
            <option value="platinum">Platinum</option>
          </select>
        </div>
        <Button>Adicionar Membro</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Membro</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead>Pontos</TableHead>
              <TableHead>Data de Adesão</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <div>
                      <p className="font-medium">João Silva</p>
                      <p className="text-sm text-gray-600">joao@email.com</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                    Ouro
                  </span>
                </TableCell>
                <TableCell>1,250</TableCell>
                <TableCell>15/06/2023</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                    Ativo
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Anterior</Button>
        <Button variant="outline">Próximo</Button>
      </div>
    </div>
  );
};

export default MembersList;
