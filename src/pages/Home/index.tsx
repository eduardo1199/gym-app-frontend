import { useState } from 'react'

import { useForm } from 'react-hook-form'
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

type IFormInput = {
  cpf: string
  password: string
}

export function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IFormInput>()

  const dispatch = useAppDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  const cookies = new Cookies()

  const [profile, setProfile] = useState<ProfileType>()
  const [isLoading, setIsLoading] = useState(false)

  const HandleSubmitLogin = async () => {
    const { cpf, password } = getValues()

    if (!profile) {
      toast({
        title: 'Selecione o tipo do seu perfil!',
        status: 'info',
        isClosable: true,
      })

      return
    }

    setIsLoading(true)

    try {
      if (profile === ProfileType.Student) {
        const response = await api.post<{ id: string }>(
          '/user/authentication',
          { cpf },
        )

        setIsLoading(false)

        if (response.data.id) {
          const id = response.data.id

          navigate(`/user/${id}`)
        }
      } else {
        const response = await api.post<string>('/admin/authentication', {
          cpf,
          password,
        })

        setIsLoading(false)

        if (response.data) {
          cookies.set('@gymapp-admin', response.data)
          dispatch(setToken(response.data))
          navigate('/dashboard')
        }
      }
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
          <div className="flex flex-col gap-4">
            <span
              className="text-primary-white text-2xl font-bold"
              data-testid="home-form-title"
            >
              Você é aluno ou gerente?
            </span>

            <div className="flex gap-20">
              <SelectButton
                handleSelected={() => setProfile(ProfileType.Student)}
                active={profile === ProfileType.Student}
                type="button"
                title="aluno"
              >
                Aluno
              </SelectButton>
              <SelectButton
                handleSelected={() => setProfile(ProfileType.Manager)}
                active={profile === ProfileType.Manager}
                type="button"
                title="gerente"
              >
                Gerente
              </SelectButton>
            </div>
          </div>

          <form
            className="mt-8 flex flex-col gap-2 w-full"
            onSubmit={handleSubmit(HandleSubmitLogin)}
          >
            <Input
              placeholder="insira seu CPF (somente números)"
              label="Informe seu CPF"
              error={errors}
              {...register('cpf', {
                maxLength: {
                  value: 14,
                  message: 'Quantidade máxima de caracteres é 14.',
                },
                required: {
                  value: true,
                  message: 'Obrigatório',
                },
                validate: (value) => {
                  return (
                    [/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/].every((pattern) =>
                      pattern.test(value),
                    ) || 'CPF inválido'
                  )
                },
              })}
            />

            {profile === ProfileType.Manager && (
              <Input
                type="password"
                placeholder="digite sua senha"
                label="Informe sua senha"
                error={errors}
                {...register('password', {
                  required: { value: true, message: 'Obrigatório' },
                })}
              />
            )}

            <ButtonLoading type="submit" isLoading={isLoading}>
              Entrar
            </ButtonLoading>
          </form>
        </div>
      </div>
    </div>
  )
}
