import { AlertTriangle, CheckCircle } from 'lucide-react';

interface AlertMessageProps {
  type: 'error' | 'success' | 'warning';
  message: string;
}

export function AlertMessage({ type, message }: AlertMessageProps): React.ReactElement {
  const isSuccess = type === 'success';
  const isError = type === 'error';
  const boxClass = isSuccess
    ? 'border-green-200 bg-green-50 text-exito dark:border-green-800 dark:bg-green-950/40 dark:text-green-300'
    : isError
      ? 'border-red-200 bg-red-50 text-error dark:border-red-800 dark:bg-red-950/40 dark:text-red-300'
      : 'border-yellow-300 bg-yellow-50 text-advertencia dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200';
  return (
    <div className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${boxClass}`}>
      {isSuccess ? <CheckCircle className="mt-0.5 h-4 w-4" /> : <AlertTriangle className="mt-0.5 h-4 w-4" />}
      <p>{message}</p>
    </div>
  );
}


