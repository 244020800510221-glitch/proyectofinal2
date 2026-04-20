import { cn } from '@/lib/utils';

interface BadgeProps {
  text: string;
  type: 'success' | 'danger' | 'warning' | 'neutral';
}

export function Badge({ text, type }: BadgeProps): React.ReactElement {
  const colorClass =
    type === 'success'
      ? 'bg-green-100 text-exito'
      : type === 'danger'
        ? 'bg-red-100 text-error'
        : type === 'warning'
          ? 'bg-yellow-100 text-advertencia'
          : 'bg-gray-200 text-gray-700';

  return <span className={cn('rounded-full px-2 py-1 text-xs font-semibold', colorClass)}>{text}</span>;
}


