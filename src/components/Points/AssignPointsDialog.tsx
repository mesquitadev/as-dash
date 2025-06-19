import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAssignPointsMutation } from '@/features/pointsApiSlice';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  points: z.string().transform((val) => Number(val)),
  reason: z.string().min(3, 'Razão deve ter pelo menos 3 caracteres'),
});

interface AssignPointsDialogProps {
  open: boolean;
  onClose: () => void;
  customerId: string;
  customerName: string;
}

export function AssignPointsDialog({
  open,
  onClose,
  customerId,
  customerName,
}: AssignPointsDialogProps) {
  const [assignPoints] = useAssignPointsMutation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      points: 0,
      reason: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await assignPoints({
        customerId,
        points: values.points,
        reason: values.reason,
      }).unwrap();

      // @ts-ignore
      toast({
        title: 'Sucesso',
        description: 'Pontos atribuídos com sucesso!',
        variant: 'default',
      });

      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atribuir os pontos. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atribuir Pontos</DialogTitle>
          <DialogDescription>
            Atribuir pontos para o cliente {customerName}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade de Pontos</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a quantidade de pontos..."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite o motivo da atribuição dos pontos..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Atribuir Pontos</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
