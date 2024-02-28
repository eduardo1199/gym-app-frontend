import { ReactNode } from 'react'

interface TBodyProps {
  children: ReactNode
}

export function TBody({ children }: TBodyProps) {
  return <tbody>{children}</tbody>
}
