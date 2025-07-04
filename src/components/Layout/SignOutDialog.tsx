import React from 'react';
import Button from '@/components/ui/Button1';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
}

const SignOutDialog = ({ open, onOpenChange, onConfirm }: SignOutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <div className='flex items-center gap-4'>
            <div
              className='mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-destructive/20 sm:mx-0'>
              <ExclamationTriangleIcon className='h-6 w-6 text-destructive' aria-hidden='true' />
            </div>
            <div>
              <DialogTitle>Sair da Plataforma</DialogTitle>
              <DialogDescription>Deseja sair da plataforma?</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className='flex justify-end gap-2 sm:justify-end'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Não
          </Button>
          <Button variant='outline' onClick={onConfirm}>
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutDialog;

