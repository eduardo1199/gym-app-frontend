import { ReactNode } from 'react'

interface InputLabelProps extends React.ComponentProps<'label'> {
  children: ReactNode
}

export function InputLabel(props: InputLabelProps) {
  return (
    <label className="font-bold text-primary-pink" {...props}>
      {props.children}
    </label>
  )
}
