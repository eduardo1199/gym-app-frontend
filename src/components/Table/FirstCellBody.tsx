import { ReactNode } from 'react'

interface FirstCellBodyProps {
  children: ReactNode
}

export function FirstCellBody({ children }: FirstCellBodyProps) {
  return (
    <td className="py-5 px-3 text-base text-primary-gray font-semibold">
      {children}
    </td>
  )
}
