import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AssignPointsButton } from '@/components/Points/AssignPointsButton';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const MOCK_DATA = [
  {
    id: '1',
    name: 'João Silva',
    totalPoints: 1250,
    transactions: [
      { id: '1', points: 500, reason: 'Compra acima de R$ 1000', date: '2025-06-19T10:30:00' },
      { id: '2', points: 750, reason: 'Indicação de amigo', date: '2025-06-18T15:45:00' },
    ]
  },
  {
    id: '2',
    name: 'Maria Santos',
    totalPoints: 850,
    transactions: [
      { id: '3', points: 850, reason: 'Compra acima de R$ 2000', date: '2025-06-17T09:15:00' }
    ]
  },
  // Adicione mais clientes conforme necessário
];

export default function PointsPage() {
  const [selectedCustomer, setSelectedCustomer] = React.useState<typeof MOCK_DATA[0] | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCustomers = MOCK_DATA.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="px-6 py-4 border-b w-full">
        <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Pontos</h1>
        <p className="text-muted-foreground">
          Gerencie os pontos dos clientes do programa de fidelidade
        </p>
      </div>

      <div className="p-4 w-full">
        <div className="flex justify-between items-center mb-6 w-full">
          <div className="relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 w-full">
          {/* Lista de Clientes */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Clientes</CardTitle>
              <CardDescription>Lista de clientes e seus pontos</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <div className="h-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Pontos</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className='text-white'>
                            {customer.totalPoints} pts
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedCustomer(customer)}
                            >
                              Ver Detalhes
                            </Button>
                            <AssignPointsButton
                              customerId={customer.id}
                              customerName={customer.name}
                              size="sm"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Detalhes do Cliente */}
          {selectedCustomer && (
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Pontos</CardTitle>
                <CardDescription>
                  Transações de {selectedCustomer.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total de Pontos
                      </p>
                      <p className="text-2xl font-bold">
                        {selectedCustomer.totalPoints} pts
                      </p>
                    </div>
                    <AssignPointsButton
                      customerId={selectedCustomer.id}
                      customerName={selectedCustomer.name}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Histórico de Transações
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedCustomer.transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg border"
                      >
                        <div>
                          <p className="font-medium">{transaction.reason}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(transaction.date), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                          </p>
                        </div>
                        <Badge variant={transaction.points > 0 ? "default" : "destructive"}>
                          {transaction.points > 0 ? "+" : ""}{transaction.points} pts
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
