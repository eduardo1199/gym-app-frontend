import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function dateFormat(date: string): string {
  return format(new Date(date), 'dd/MM/yyyy', {
    locale: ptBR
  });
}