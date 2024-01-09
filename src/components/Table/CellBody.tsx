import { ReactNode } from 'react'

interface CellBodyProps {
  children: ReactNode
}

export function CellBody({ children }: CellBodyProps) {
  return (
    <td className="font-extrabold text-base text-primary-gray">{children}</td>
  )
}
