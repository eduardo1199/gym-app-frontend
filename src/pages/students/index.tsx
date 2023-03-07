import { useDisclosure, useToast } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { AlertConfirm } from '../../components/AlertConfirm'
import { Header } from '../../components/Header'
import { Modal } from '../../components/Modal'
import { TableRow } from '../../components/Table/TableRow'
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../feature/user/user-slice'
import { dateFormat } from '../../utils'

export function Students() {
  const [userId, setUserId] = useState('')

  const toast = useToast()

  const { data: users } = useGetUsersQuery()
  const [handleDeleteUserMutation, { isLoading, isSuccess, isError }] =
    useDeleteUserMutation()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onClose: onCloseModalEdit,
  } = useDisclosure()

  function handleOpenAlertConfirm(id: string) {
    setUserId(id)
    onOpen()
  }

  function handleOpenModalEdit(id: string) {
    setUserId(id)
    onOpenModalEdit()
  }

  async function handleDeleteStudent() {
    try {
      await handleDeleteUserMutation(userId)

      toast({
        title: 'Usuário deletado com sucesso!',
        status: 'success',
        isClosable: true,
      })

      setUserId('')
    } catch {
      toast({
        title: 'Erro ao deletar usuário!',
        status: 'error',
        isClosable: true,
      })
    } finally {
      onClose()
    }
  }

  function handleOnCloseAlertDeleteStudent() {
    onClose()
    setUserId('')
  }

  const ref = useRef(null)

  return (
    <>
      <div className="p-8">
        <Header visibleSearchBar />
        <div className="h-screen mt-10">
          <table className="w-full">
            <thead>
              <tr className="bg-primary-purple opacity-95">
                <th className="py-4 text-primary-white text-left px-3 rounded-tl-md rounded-bl-md">
                  Nome
                </th>
                <th className="text-primary-white text-left">
                  Início do plano
                </th>
                <th className="text-primary-white text-left">Idade</th>
                <th className="text-primary-white text-left">Peso</th>
                <th className="text-primary-white text-left">Status</th>
                <th className="rounded-tr-md rounded-br-md" />
              </tr>
              <tr>
                <td className="py-2"></td>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                return (
                  <TableRow
                    key={user.id}
                    active={user.isActive}
                    ageUser={user.age}
                    id={user.id}
                    name={user.name}
                    startDatePlan={dateFormat(user.startDateForPlan)}
                    weight={user.weight}
                    ref={ref}
                    onOpenAlertDelete={handleOpenAlertConfirm}
                    onOpenModalEdit={handleOpenModalEdit}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AlertConfirm
        ref={ref}
        isOpen={isOpen}
        onCloseAlert={handleOnCloseAlertDeleteStudent}
        onSubmit={handleDeleteStudent}
      />

      <Modal
        isOpenModalEdit={isOpenModalEdit}
        onCloseModalEdit={onCloseModalEdit}
        ref={ref}
        handleSubmit={() => {}}
      >
        <form action="" className="flex flex-col gap-2" onSubmit={() => {}}>
          <label htmlFor="name">Nome do alunos</label>
          <input type="text" id="name" placeholder="Nome do aluno" />

          <label htmlFor="age">Idade</label>
          <input type="number" id="age" placeholder="Idade do aluno" />

          <label htmlFor="weight">Peso</label>
          <input type="text" id="weight" placeholder="Peso do aluno" />

          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" placeholder="CPF do aluno" />

          <label htmlFor="plan">Plano</label>
          <input type="text" id="plan" placeholder="Plano do aluno" />

          <label htmlFor="startDateForPlan">Data de início do plano</label>
          <input type="date" id="startDateForPlan" />
        </form>
      </Modal>
    </>
  )
}
