import { useDisclosure, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { AlertConfirm } from '../../components/AlertConfirm'
import { Header } from '../../components/Header'
import { ModalComponent } from '../../components/Modal'
import { TableRow } from './components/Table/TableRow'
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../feature/user/user-slice'
import { dateFormat } from '../../utils'
import { StudentForm } from './components/StudentForm'
import { LoadingSkeleton } from './components/Skeleton'
import { InputSearch } from '../../components/Header/InputSearch'
import { SlideViewStudent } from './components/SlideViewStudent'
import { Table } from '../../components/Table'
import { fakeArrayLoadingTable } from './utils'
import { RegisterFormStudent } from './components/RegisterFormStudent'

export function Students() {
  const [userId, setUserId] = useState('')

  const { data, isLoading } = useGetUsersQuery()
  const [handleDeleteUserMutation] = useDeleteUserMutation()

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure()
  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onClose: onCloseModalEdit,
  } = useDisclosure()
  const {
    isOpen: isOpenModalRegister,
    onOpen: onOpenModalRegister,
    onClose: onCloseModalRegister,
  } = useDisclosure()
  const {
    isOpen: isOpenSlide,
    onOpen: onOpenSlide,
    onClose: onCloseSlide,
  } = useDisclosure()

  const toast = useToast()

  function handleOpenAlertConfirm(id: string) {
    setUserId(id)
    onOpenAlert()
  }

  function handleOpenModalEdit(id: string) {
    setUserId(id)
    onOpenModalEdit()
  }

  function handleOpenSlide(id: string) {
    setUserId(id)
    onOpenSlide()
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
      onCloseAlert()
    }
  }

  function handleOnCloseAlertDeleteStudent() {
    onCloseAlert()
    setUserId('')
  }

  const isEmptyListUsers = data?.users.length === 0 && !isLoading

  return (
    <>
      <div className="p-4">
        <Header />
        <div className="h-screen mt-10">
          <div className="mb-5 flex w-full justify-between">
            <InputSearch />
            <button
              type="button"
              className="bg-primary-purple p-3 rounded opacity-95 text-base font-bold text-white hover:bg-secondary-purple transition-colors focus:outline-none focus:ring focus:ring-primary-purple"
              onClick={() => onOpenModalRegister()}
            >
              Cadastrar Aluno
            </button>
          </div>
          <Table.Root>
            <Table.THeader>
              <Table.Tr>
                <Table.FirstCell>Nome</Table.FirstCell>
                <Table.Cell>Início do plano</Table.Cell>
                <Table.Cell>Idade</Table.Cell>
                <Table.Cell>Peso</Table.Cell>
                <Table.Cell>Status</Table.Cell>
                <Table.LastCell />
              </Table.Tr>
              <tr>
                <td className="py-2"></td>
              </tr>
            </Table.THeader>
            <Table.TBody>
              {data?.users?.map((user) => {
                return (
                  <TableRow
                    key={user.id}
                    active={user.isActive}
                    ageUser={user.age}
                    id={user.id}
                    name={user.name}
                    startDatePlan={dateFormat(user.startDateForPlan)}
                    weight={user.weight}
                    onOpenAlertDelete={handleOpenAlertConfirm}
                    onOpenModalEdit={handleOpenModalEdit}
                    onOpenSlide={handleOpenSlide}
                  />
                )
              })}

              {isLoading &&
                fakeArrayLoadingTable.map((value) => {
                  return <LoadingSkeleton key={value} />
                })}
            </Table.TBody>
          </Table.Root>

          {isEmptyListUsers && (
            <div className="flex justify-center mt-6">
              <span className="text-lg font-bold text-primary-purple">
                Não existe usuários cadastrados
              </span>
            </div>
          )}
        </div>
      </div>

      <AlertConfirm
        isOpen={isOpenAlert}
        onCloseAlert={handleOnCloseAlertDeleteStudent}
        onSubmit={handleDeleteStudent}
      />

      <ModalComponent
        isOpenModal={isOpenModalEdit}
        onCloseModal={onCloseModalEdit}
        modalTitle="Visualização do Aluno"
      >
        <StudentForm onCloseModalEdit={onCloseModalEdit} userId={userId} />
      </ModalComponent>

      <ModalComponent
        isOpenModal={isOpenModalRegister}
        onCloseModal={onCloseModalRegister}
        modalTitle="Cadastrar aluno"
      >
        <RegisterFormStudent onCloseModalEdit={onCloseModalEdit} />
      </ModalComponent>

      <SlideViewStudent isOpen={isOpenSlide} onClose={onCloseSlide} />
    </>
  )
}
