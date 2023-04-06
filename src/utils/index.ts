import { addHours, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function dateFormat(date: string): string {
  const dateParsed = addHours(new Date(date), 3)

  return format(dateParsed, 'dd/MM/yyyy', {
    locale: ptBR,
    useAdditionalDayOfYearTokens: true,
  })
}
