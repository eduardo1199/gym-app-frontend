import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function dateFormat(date: string): string {
  const dateParsed = new Date(date)

  return format(dateParsed, 'dd/MM/yyyy', {
    locale: ptBR,
    useAdditionalDayOfYearTokens: true,
  })
}
