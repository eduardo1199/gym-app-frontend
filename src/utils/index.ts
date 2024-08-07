import { format, isWithinInterval } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function dateFormat(date: string): string {
  const dateParsed = new Date(date)

  return format(dateParsed, 'dd/MM/yyyy', {
    locale: ptBR,
    useAdditionalDayOfYearTokens: true,
  })
}

export function isActivePlanUser(
  initialDate: string,
  endDate: string,
): boolean {
  const currentDate = new Date()

  const isBetweenDateCurrentInitialDateAndEndDate = isWithinInterval(
    currentDate,
    {
      end: new Date(endDate),
      start: new Date(initialDate),
    },
  )

  return isBetweenDateCurrentInitialDateAndEndDate
}
