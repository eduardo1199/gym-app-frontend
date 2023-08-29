import { Spinner } from 'phosphor-react'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonLoadingProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading: boolean
}

export function ButtonLoading({ children, isLoading }: ButtonLoadingProps) {
  return (
    <button className="bg-secondary-purple transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 font-bold text-lg text-white h-11 rounded flex justify-center items-center">
      {isLoading ? (
        <Spinner className="animate-spin h-6 w-6 mr-3" />
      ) : (
        <p>{children}</p>
      )}
    </button>
  )
}
