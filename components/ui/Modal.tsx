import { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

interface ModalProps {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

export function Modal({ open, title, onConfirm, onCancel, children }: ModalProps): React.ReactElement | null {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 dark:bg-black/60">
      <div className="w-full max-w-md rounded-xl border border-guinda/10 bg-surface p-6 text-center shadow-xl dark:border-dorado/20">
        <h3 className="mb-4 text-xl font-bold text-guinda">{title}</h3>
        {children}
        <div className="mt-4 flex justify-center gap-3">
          <Button variant="secondary" onClick={onConfirm}>sí</Button>
          <Button variant="ghost" onClick={onCancel}>no</Button>
        </div>
      </div>
    </div>
  );
}


