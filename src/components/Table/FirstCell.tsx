import { ReactNode } from 'react'

interface FirstCellProps {
  children: ReactNode
}

export function FirstCell({ children }: FirstCellProps) {
  return (
    <th className="py-4 text-primary-white text-left px-3 rounded-tl-md rounded-bl-md">
      {children}
    </th>
  )
}
