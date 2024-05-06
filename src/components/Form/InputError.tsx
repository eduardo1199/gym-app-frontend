import { ReactNode } from 'react'

interface InputLabelProps {
  children: ReactNode
}

export function InputError({ children }: InputLabelProps) {
  return <p className="text-alert-danger text-xs">{children}</p>
}
