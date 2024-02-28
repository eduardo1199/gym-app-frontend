import { ReactNode } from 'react'

interface CellProps {
  children: ReactNode
}

export function Cell({ children }: CellProps) {
  return <th className="text-primary-white text-left">{children}</th>
}
