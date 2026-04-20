import { AlertTriangle, CheckCircle } from 'lucide-react';

interface AlertMessageProps {
  type: 'error' | 'success' | 'warning';
  message: string;
}

export function AlertMessage({ type, message }: AlertMessageProps): React.ReactElement {
  const isSuccess = type === 'success';
  return (
    <div className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${isSuccess ? 'border-green-200 bg-green-50 text-exito' : 'border-yellow-300 bg-yellow-50 text-advertencia'}`}>
      {isSuccess ? <CheckCircle className="mt-0.5 h-4 w-4" /> : <AlertTriangle className="mt-0.5 h-4 w-4" />}
      <p>{message}</p>
    </div>
  );
}


