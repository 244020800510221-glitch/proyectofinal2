import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({ className = '', variant = 'primary', ...props }: ButtonProps): React.ReactElement {
  const variantClass =
    variant === 'primary'
      ? 'bg-guinda text-white hover:bg-guinda/90'
      : variant === 'secondary'
        ? 'bg-dorado text-guinda hover:bg-dorado/90'
        : 'bg-transparent border border-guinda text-guinda hover:bg-guinda/10';

  return <button className={cn('rounded-lg px-4 py-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50', variantClass, className)} {...props} />;
}


