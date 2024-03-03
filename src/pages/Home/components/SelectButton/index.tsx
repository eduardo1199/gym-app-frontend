import { ButtonHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

interface SelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  handleSelected: () => void
  active: boolean
}

export function SelectButton({
  children,
  handleSelected,
  active,
  ...props
}: SelectButtonProps) {
  return (
    <button
      {...props}
      onClick={() => handleSelected()}
      className={classNames(
        { 'bg-primary-blue hover:bg-primary-blue': active },
        'transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-secondary-orange duration-300 text-primary-white font-bold px-5 py-2 rounded text-lg',
      )}
    >
      {children}
    </button>
  )
}
