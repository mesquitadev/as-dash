import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { PlusCircle } from 'lucide-react';
import { AssignPointsDialog } from './AssignPointsDialog';

interface AssignPointsButtonProps {
  customerId: string;
  customerName: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function AssignPointsButton({
  customerId,
  customerName,
  variant = 'default',
  size = 'default'
}: AssignPointsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(true)}
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Atribuir Pontos
      </Button>

      <AssignPointsDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        customerId={customerId}
        customerName={customerName}
      />
    </>
  );
}
