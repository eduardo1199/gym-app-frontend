import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useToast } from '@chakra-ui/react'

/* import Logo from '../../assets/logo.svg'
 */
import { Spinner } from 'phosphor-react'
import { Input } from '../../components/Input/Input'
import { ProfileType } from '../../types/profile'

import { api } from '../../services/api'
import { AxiosError } from 'axios'

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

  const toast = useToast()
  const navigate = useNavigate()

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
        const response = await api.post<{ id: string }>(
          '/admin/authentication',
          { cpf, password },
        )

        setIsLoading(false)

        if (response.data.id) {
          /*  cookies.set('@gymapp-admin', response.data.id) */
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
    <div className="w-screen h-screen flex justify-center items-center bg-primary-purple">
      <div className="w-[1100px] flex lg:flex-row flex-col justify-between items-center">
        <div className="w-[300px] lg:w-[400px] flex flex-col items-center">
          <div className="flex flex-col gap-4">
            <span
              className="text-primary-white text-2xl font-bold"
              data-testid="home-form-title"
            >
              Você é aluno ou gerente?
            </span>

            <div className="flex gap-20">
              <button
                type="button"
                title="aluno"
                onClick={() => setProfile(ProfileType.Student)}
                className={`transition ease-in-out delay-50 ${
                  profile === ProfileType.Student
                    ? 'bg-primary-blue hover:bg-primary-blue'
                    : 'bg-secondary-orange'
                } hover:-translate-y-1 hover:scale-110 hover:bg-primary-yellow duration-300 text-primary-white font-bold px-5 py-2 rounded text-lg`}
              >
                Aluno
              </button>
              <button
                type="button"
                title="gerente"
                onClick={() => setProfile(ProfileType.Manager)}
                className={`transition ease-in-out delay-50  ${
                  profile === ProfileType.Manager
                    ? 'bg-primary-blue hover:bg-primary-blue'
                    : 'bg-primary-yellow'
                } hover:-translate-y-1 hover:scale-110 hover:bg-secondary-orange duration-300 text-primary-white font-bold px-5 py-2 rounded text-lg`}
              >
                Gerente
              </button>
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

            <button
              type="submit"
              data-testid="button-submit"
              className="bg-secondary-purple transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 font-bold text-lg text-white h-11 rounded flex justify-center items-center"
            >
              {isLoading ? (
                <Spinner className="animate-spin h-6 w-6 mr-3" />
              ) : (
                <p>Entrar</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
