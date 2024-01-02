import { useState } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../app/hooks'

import { useToast } from '@chakra-ui/react'
import { Input } from '../../components/Input/Input'
import { ProfileType } from '../../types/profile'

import { api } from '../../services/api'
import { AxiosError } from 'axios'
import { setToken } from '../../feature/auth'
import Cookies from 'universal-cookie'
import { GymLogo } from '../../components/Logo'
import { SelectButton } from './components/SelectButton'
import { ButtonLoading } from '../../components/ButtonLoading'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import InputMask from 'react-input-mask'

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

export function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormLoginSchemaType>({
    resolver: zodResolver(FormLoginSchema),
  })

  const dispatch = useAppDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  const cookies = new Cookies()

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitLogin = async (data: FormLoginSchemaType) => {
    const { cpf, password } = data

    setIsLoading(true)

    try {
      /*  const response = await api.post<{ id: string }>(
          '/user/authentication',
          { cpf },
        )

        setIsLoading(false)

        if (response.data.id) {
          const id = response.data.id

          navigate(`/user/${id}`)
        } */

      /*  const response = await api.post<string>('/admin/authentication', {
        cpf,
        password,
      }) */

      setIsLoading(false)

      cookies.set('@gymapp-admin', '65a1d65aw1d65a')
      dispatch(setToken('65a1d65aw1d65a'))

      /*   if (response.data) {
        cookies.set('@gymapp-admin', response.data)
        dispatch(setToken(response.data))
        navigate('/dashboard')
      } */
    } catch (error) {
      if (error instanceof AxiosError) {
        setIsLoading(false)
        toast({
          title: error.response?.data?.message ?? '',
          status: 'error',
          isClosable: true,
        })
      }
    }
  }

  return (
    <div className="w-screen h-screen flex items-center">
      <div className="max-w-lg bg-primary-purple flex h-full p-10">
        <GymLogo height="100%" />
      </div>
      <div className="flex flex-1 justify-center">
        <div className="flex flex-col items-center bg-primary-yellow p-10 rounded shadow-2xl">
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={handleSubmit(handleSubmitLogin)}
          >
            <label
              htmlFor="cpf"
              className="text-primary-white font-bold text-lg"
            >
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

            <ButtonLoading type="submit" isLoading={isLoading}>
              Entrar
            </ButtonLoading>
          </form>
        </div>
      </div>
    </div>
  )
}
