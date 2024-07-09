import { forwardRef, InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    return (
      <input
        {...props}
        className="px-2 py-3 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-40 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
        ref={ref}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input
