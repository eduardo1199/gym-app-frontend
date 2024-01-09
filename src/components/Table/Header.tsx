import { ReactNode } from 'react'

interface TrProps {
  children: ReactNode
}

export function Tr({ children }: TrProps) {
  return <tr className="bg-primary-purple opacity-95">{children}</tr>
}
