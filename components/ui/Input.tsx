import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = '', error, ...props },
  ref
): React.ReactElement {
  return (
    <div className="w-full">
      <input
        ref={ref}
        className={cn(
          'w-full rounded-lg border bg-surface px-3 py-2 text-texto outline-none focus:ring-2 focus:ring-guinda/40 dark:focus:ring-dorado/30',
          error ? 'border-error' : 'border-guinda/20 dark:border-dorado/25',
          className
        )}
        {...props}
      />
      {error ? <p className="mt-1 text-sm text-error">{error}</p> : null}
    </div>
  );
});


