'use client';

import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export function SalidaButton(): React.ReactElement {
  const router = useRouter();
  return (
    <Button type="button" variant="ghost" onClick={() => router.push('/cerrar-sesion')}>
      Salida
    </Button>
  );
}
