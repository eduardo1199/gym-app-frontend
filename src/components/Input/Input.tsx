import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { FieldErrorsImpl } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: FieldErrorsImpl;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({label, error=null , name, ...props}: InputProps, ref) => {
  return(
    <>
      {!!props && <label htmlFor={name} className="text-primary-white font-bold text-lg">{label}</label>}
      <input 
        id={name}
        name={name}
        className={`px-3 py-2 rounded font-bold h-11 ${error[name]?.message && 'border-2 border-alert-danger'}`}
        ref={ref}
        {...props}
      />
      {!!error && (
        <p  className="text-alert-danger">{error[name]?.message.toString()}</p>
      )}
    </>
  )
}

export const Input = forwardRef(InputBase);