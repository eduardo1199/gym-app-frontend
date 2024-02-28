import { ReactNode } from 'react'

interface LastCellProps {
  children?: ReactNode
}

export function LastCell({ children }: LastCellProps) {
  return <th className="rounded-tr-md rounded-br-md">{children}</th>
}
