import { ReactNode } from 'react'

interface TrBodyProps {
  children: ReactNode
}

export function TrBody({ children }: TrBodyProps) {
  return (
    <tr className="bg-primary-white border border-tertiary-pink rounded-t-2xl rounded-b-2xl hover:shadow-md transition-shadow rounded-tl-md rounded-bl-md">
      {children}
    </tr>
  )
}
