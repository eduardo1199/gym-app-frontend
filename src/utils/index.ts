import { format, formatDistanceStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function dateFormat(date: string): string {
  return format(new Date(date), 'dd/MM/yyyy', {
    locale: ptBR
  });
}

export function getAgeDistance(date: string) {
  const [day, month, year] = date.split('/');
  const actualDate = new Date();

  const age = formatDistanceStrict(new Date(Number(year),Number(month)-1,Number(day)), actualDate, {
    locale: ptBR,
  });

  return age;
}