import { useDisclosure, useToast } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { AlertConfirm } from '../../components/AlertConfirm'
import { Header } from '../../components/Header'
import { Modal } from '../../components/Modal'
import { TableRow } from './components/Table/TableRow'
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../feature/user/user-slice'
import { dateFormat } from '../../utils'
import { StudentForm } from './components/StudentForm'
import { LoadingSkeleton } from './components/Skeleton'

export function Students() {
  const [userId, setUserId] = useState('')

  const { data: users, isLoading } = useGetUsersQuery()
  const [handleDeleteUserMutation] = useDeleteUserMutation()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onClose: onCloseModalEdit,
  } = useDisclosure()

  const toast = useToast()

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
          <div className="mb-5 flex w-full justify-end">
            <button
              type="button"
              className="bg-primary-purple p-3 rounded opacity-95 text-base font-bold text-white hover:bg-secondary-purple transition-colors focus:outline-none focus:ring focus:ring-primary-purple"
              onClick={() => handleOpenModalEdit('')}
            >
              Cadastrar Aluno
            </button>
          </div>
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

              {isLoading &&
                Array.from([1, 2, 3, 5, 6]).map((value) => {
                  return <LoadingSkeleton key={value} />
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
        visibleButtonsFooter={false}
      >
        <StudentForm onCloseModalEdit={onCloseModalEdit} userId={userId} />
      </Modal>
    </>
  )
}
