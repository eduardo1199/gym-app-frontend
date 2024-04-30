import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { z } from 'zod'

import { useAppDispatch } from '../../../../app/hooks'
import { ButtonLoading } from '../../../../components/ButtonLoading'
import { Input } from '../../../../components/Input/Input'
import { setToken } from '../../../../feature/auth'
import { api } from '../../../../services/api'

const FormLoginSchema = z.object({
  cpf: z
    .string({
      required_error: 'CPF obrigatório.',
    })
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido'),
  password: z
    .string({
      required_error: 'Senha obrigatória.',
    })
    .min(6, 'Senha precisa ter pelo menos 6 dígitos!'),
})

type FormLoginSchemaType = z.infer<typeof FormLoginSchema>

export function AdminForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormLoginSchemaType>({
    resolver: zodResolver(FormLoginSchema),
  })

  const dispatch = useAppDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  const cookies = new Cookies()

  const handleSubmitLogin = async (data: FormLoginSchemaType) => {
    const { cpf, password } = data

    try {
      // TODO: use mutation redux toolkit request
      const token = await api.post<{ token: string }>('/admin/authentication', {
        cpf,
        password,
      })

      cookies.set('@gymapp-admin', token.data.token)
      dispatch(setToken(token.data.token))
      navigate('/dashboard')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data?.message ?? '',
          status: 'error',
          isClosable: true,
        })
      }
    }
  }

  return (
    <div className="flex flex-col items-center bg-primary-yellow p-10 rounded shadow-2xl">
      <form
        className="flex flex-col gap-2 w-full"
        onSubmit={handleSubmit(handleSubmitLogin)}
      >
        <label htmlFor="cpf" className="text-primary-white font-bold text-lg">
          Informe seu CPF
        </label>

        <Controller
          name="cpf"
          control={control}
          render={({ field }) => {
            return (
              <>
                <InputMask
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  mask={'999.999.999-99'}
                  placeholder="insira seu CPF (somente números)"
                  className="px-3 py-2 rounded font-bold h-11 placeholder:text-sm"
                  id="cpf"
                />
              </>
            )
          }}
        />

        {!!errors.cpf?.message && (
          <p className="text-alert-danger text-xs">
            {errors.cpf?.message?.toString()}
          </p>
        )}

        <Input
          type="password"
          placeholder="digite sua senha"
          label="Informe sua senha"
          error={errors}
          {...register('password')}
        />

        <ButtonLoading type="submit" isLoading={isSubmitting}>
          Entrar
        </ButtonLoading>
      </form>
    </div>
  )
}
