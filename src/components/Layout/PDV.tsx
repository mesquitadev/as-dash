import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, Eye, EyeOff, Plus, Power, RefreshCw, Store, Trash2 } from 'lucide-react';
import { useCreatePDVMutation, useGetPDVsQuery } from '@/features/pdvApiSlice';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  identifier: z.string().min(3, 'Identificador deve ter pelo menos 3 caracteres'),
  storeId: z.string().min(1, 'Selecione uma loja'),
});

// Dados mockados de lojas - substitua pela sua API real
const mockStores = [
  { id: '1', name: 'Loja Centro' },
  { id: '2', name: 'Loja Shopping' },
  { id: '3', name: 'Loja Norte' },
];

const PDV = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { data, isLoading } = useGetPDVsQuery({
    page: 1,
    limit: 10
  });
  const pdvs = data?.data || [];
  const [createPDV, { isLoading: isCreating }] = useCreatePDVMutation();
  const [showKey, setShowKey] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      identifier: '',
      storeId: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createPDV(values).unwrap();
      setOpenCreateModal(false);
      form.reset();
      toast({
        title: 'PDV criado',
        description: 'PDV criado com sucesso!',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao criar PDV. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copiado!',
      description: 'Chave API copiada para a área de transferência',
    });
  };

  const toggleKeyVisibility = (id: string) => {
    setShowKey(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className='container mx-auto py-6'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>PDVs</h1>
          <p className='text-muted-foreground'>
            Gerencie os Pontos de Venda do sistema
          </p>
        </div>
        <Button onClick={() => setOpenCreateModal(true)}>
          <Plus className='w-4 h-4 mr-2' />
          Novo PDV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de PDVs</CardTitle>
          <CardDescription>
            Todos os PDVs cadastrados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Carregando...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Identificador</TableHead>
                  <TableHead>Loja</TableHead>
                  <TableHead>Chave API</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pdvs.map((pdv) => (
                  <TableRow key={pdv.id}>
                    <TableCell className='font-medium'>{pdv.name}</TableCell>
                    <TableCell>{pdv.identifier}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Store className='w-4 h-4' />
                        {mockStores.find(store => store.id === pdv.storeId)?.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <code className='text-sm bg-secondary/10 px-2 py-1 rounded'>
                          {showKey[pdv.id] ? pdv.apiKey : '•'.repeat(20)}
                        </code>
                        <button
                          onClick={() => toggleKeyVisibility(pdv.id)}
                          className='text-muted-foreground hover:text-foreground'
                        >
                          {showKey[pdv.id] ? (
                            <EyeOff className='w-4 h-4' />
                          ) : (
                            <Eye className='w-4 h-4' />
                          )}
                        </button>
                        <button
                          onClick={() => copyToClipboard(pdv.apiKey)}
                          className='text-muted-foreground hover:text-foreground'
                        >
                          <Copy className='w-4 h-4' />
                        </button>
                        <button
                          className='text-muted-foreground hover:text-foreground'
                        >
                          <RefreshCw className='w-4 h-4' />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={pdv.status === 'active' ? 'success' : 'secondary'}>
                        {pdv.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button variant='ghost' size='icon'>
                          <Power className='w-4 h-4' />
                        </Button>
                        <Button variant='ghost' size='icon'>
                          <Trash2 className='w-4 h-4 text-destructive' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialog de Criação de PDV */}
      <Dialog open={openCreateModal} onOpenChange={setOpenCreateModal}>
        <DialogContent className='sm:max-w-[500px] bg-background'>
          <DialogHeader>
            <DialogTitle>Novo PDV</DialogTitle>
            <DialogDescription>
              Cadastre um novo Ponto de Venda no sistema
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do PDV</FormLabel>
                    <FormControl>
                      <Input placeholder='Ex: Caixa 01' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='identifier'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identificador</FormLabel>
                    <FormControl>
                      <Input placeholder='Ex: PDV-001' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='storeId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loja</FormLabel>
                    <FormControl>
                      <select
                        className='w-full p-2 rounded-lg border bg-background'
                        {...field}
                      >
                        <option value=''>Selecione uma loja</option>
                        {mockStores.map((store) => (
                          <option key={store.id} value={store.id}>
                            {store.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type='button' variant='outline' onClick={() => setOpenCreateModal(false)}>
                  Cancelar
                </Button>
                <Button type='submit' disabled={isCreating}>Criar PDV</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PDV;

