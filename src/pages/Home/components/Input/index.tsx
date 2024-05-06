import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react'
import { FieldErrors, FieldValues } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  error: FieldErrors<FieldValues>
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, name, ...props }: InputProps,
  ref,
) => {
  return (
    <>
      {!!props && (
        <label htmlFor={name} className="text-primary-white font-bold text-lg">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={`px-2 py-3 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700`}
        ref={ref}
        {...props}
      />
      {!!error && (
        <p className="text-alert-danger text-xs">
          {error[name]?.message?.toString()}
        </p>
      )}
    </>
  )
}

export const Input = forwardRef(InputBase)
