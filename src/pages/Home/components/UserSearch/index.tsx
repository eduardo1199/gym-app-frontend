import { useState } from 'react'
import InputMask from 'react-input-mask'
import { useAuthenticationUserMutation } from '../../../../feature/user/user-slice'
import { ButtonLoading } from '../../../../components/ButtonLoading'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export function UserSearch() {
  const [cpf, setCpf] = useState('')

  const [handleCreateUser, { isLoading, data }] =
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
      // TODO: verify return response or use mutation to set navigate from page user
      await handleCreateUser({ cpf })

      navigate(`/user/`)
    } catch (err) {}
  }

  return (
    <div className="flex flex-col items-center bg-primary-yellow p-10 rounded shadow-2xl mt-7">
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
