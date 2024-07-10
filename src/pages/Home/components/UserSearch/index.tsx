import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { useAuthenticationUserMutation } from '../../../../feature/user/user-slice'
import { ButtonLoading } from '../../../../components/ButtonLoading'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export interface UserDataMutation {
  name: string
  weight: number
  cpf: string
  age: number
  planId: string
  startDateForPlan: string | undefined
  id: string
}

export function UserSearch() {
  const [cpf, setCpf] = useState('')

  const [handleViewProfileUser, { isLoading, data: userResponse }] =
    useAuthenticationUserMutation()

  const toast = useToast()
  const navigate = useNavigate()

  async function handleNavigateToViewProfileUser() {
    if (!cpf.trim()) {
      toast({
        title: 'Insira um valor válido!',
        status: 'warning',
        isClosable: true,
      })

      return
    }

    try {
      await handleViewProfileUser({ cpf })
    } catch (error) {
      toast({
        title: 'Error ao buscar usuário, tente novamente!',
        status: 'error',
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    if (userResponse) {
      const { user } = userResponse

      navigate(`/user/${user.id}`)
    }
  }, [userResponse, navigate])

  return (
    <div className="flex flex-col items-center bg-primary-yellow p-10 rounded shadow-2xl">
      <span className="text-base font-bold text-primary-purple mb-4">
        É aluno? Então vem dar uma olhada na sua matrícula
      </span>

      <div className="flex flex-col items-start w-full">
        <label htmlFor="cpf" className="text-primary-white font-bold text-lg">
          Informe seu CPF
        </label>
        <InputMask
          onChange={(event) => setCpf(event.target.value)}
          value={cpf}
          mask={'999.999.999-99'}
          placeholder="insira seu CPF (somente números)"
          className="px-3 py-2 rounded font-bold h-11 placeholder:text-sm w-full mb-4"
          id="cpf"
        />

        <ButtonLoading
          type="button"
          isLoading={isLoading}
          onClick={handleNavigateToViewProfileUser}
        >
          Buscar
        </ButtonLoading>
      </div>
    </div>
  )
}
