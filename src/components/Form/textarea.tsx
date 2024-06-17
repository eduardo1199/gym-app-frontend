import { forwardRef, TextareaHTMLAttributes } from 'react'

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textearea = forwardRef<HTMLTextAreaElement, InputProps>(
  (props: InputProps, ref) => {
    return (
      <textarea
        className="px-2 py-3 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-40 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
        ref={ref}
        {...props}
      />
    )
  },
)

Textearea.displayName = 'Textarea'

export default Textearea
