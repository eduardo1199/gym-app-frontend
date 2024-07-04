import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { DotsThreeVertical, Files, Pencil, Trash } from 'phosphor-react'
import { Header } from 'src/components/Header'
import { InputSearch } from 'src/components/Header/InputSearch'
import { ModalComponent } from 'src/components/Modal'
import { Table } from 'src/components/Table'
import {
  useDeleteMachineMutation,
  useGetMachinesQuery,
} from 'src/feature/machine/machine-slice'
import { FormRegisterMachine } from './components/FormRegisterMachine'
import { EditFormMachine } from './components/EditFormMachine'
import { useContext, useState } from 'react'
import { AlertConfirm } from 'src/components/AlertConfirm'
import { ViewPortContext } from 'src/context/ViewPortContext'

export function Machines() {
  const { data } = useGetMachinesQuery()
  const [deleteMachineFn] = useDeleteMachineMutation()
  const [machineId, setMachineId] = useState('')

  const toast = useToast()

  const {
    isOpen: isOpenModalRegister,
    onOpen: onOpenModalRegister,
    onClose: onCloseModalRegister,
  } = useDisclosure()

  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onClose: onCloseModalEdit,
  } = useDisclosure()

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure()

  const match = useContext(ViewPortContext)

  function handleOnCloseAlertDeleteStudent() {
    onCloseAlert()
    setMachineId('')
  }

  function handleOpenModalEdit(id: string) {
    setMachineId(id)
    onOpenModalEdit()
  }

  async function handleDeleteMachine() {
    const response = await deleteMachineFn({
      machineId,
    })

    if (response.error) {
      toast({
        status: 'error',
        title: 'Error ao deletar maquinário!',
        duration: 9000,
        isClosable: true,
      })

      return
    }

    toast({
      status: 'success',
      title: 'Maquinário deletado com sucesso!',
      duration: 9000,
      isClosable: true,
    })

    handleOnCloseAlertDeleteStudent()
  }

  function handleDeleteConfirm(id: string) {
    setMachineId(id)
    onOpenAlert()
  }

  return (
    <div className={`p-2 ${match ? '' : 'ml-[350px]'}`}>
      <Header />
      <div className="h-screen mt-10">
        <div className="mb-5 flex w-full justify-between">
          <InputSearch />
          <button
            type="button"
            onClick={onOpenModalRegister}
            className="bg-primary-purple p-3 rounded opacity-95 text-base font-bold text-white hover:bg-secondary-purple transition-colors focus:outline-none focus:ring focus:ring-primary-purple"
          >
            Cadastrar maquinário
          </button>
        </div>
        <Table.Root>
          <Table.THeader>
            <Table.Tr>
              <Table.FirstCell>Nome</Table.FirstCell>
              <Table.Cell>Manutenção</Table.Cell>
              <Table.LastCell />
            </Table.Tr>
            <tr>
              <td className="py-2"></td>
            </tr>
          </Table.THeader>
          <Table.TBody>
            {data?.machines.map((machine) => {
              return (
                <>
                  <Table.TrBody key={machine.id}>
                    <Table.FirstCellBody>{machine.name}</Table.FirstCellBody>
                    <Table.CellBody>
                      <Tooltip
                        hasArrow
                        label={`${
                          machine.maintenance
                            ? 'Maquinário precisa de manutenção.'
                            : 'Maquinário funcionando.'
                        }`}
                        bg={`${machine.maintenance ? 'red.600' : 'green.600'}`}
                      >
                        <button
                          className={`w-4 h-4 ${
                            machine.maintenance ? 'bg-red-600' : 'bg-green-600'
                          } rounded-full`}
                        />
                      </Tooltip>
                    </Table.CellBody>

                    <td>
                      <Tooltip hasArrow label="Ações" bg="purple.600">
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            variant="outline"
                            border="none"
                            display="flex"
                            _hover={{ background: 'transparent' }}
                            icon={
                              <DotsThreeVertical
                                size={32}
                                weight="bold"
                                className="fill-primary-purple"
                              />
                            }
                          />
                          <MenuList
                            p="2"
                            display="flex"
                            flexDirection="column"
                            gap="2"
                            bg="purple.600"
                          >
                            <MenuItem
                              fontWeight="bold"
                              textColor="white"
                              backgroundColor="purple.600"
                              _hover={{
                                textColor: 'purple.600',
                                background: 'white',
                              }}
                              _focus={{
                                textColor: 'purple.600',
                                background: 'white',
                              }}
                              display="flex"
                              justifyContent="space-between"
                            >
                              Visualizar
                              <Files size={20} />
                            </MenuItem>
                            <MenuItem
                              fontWeight="bold"
                              textColor="white"
                              backgroundColor="purple.600"
                              _hover={{
                                textColor: 'purple.600',
                                background: 'white',
                              }}
                              _focus={{
                                textColor: 'purple.600',
                                background: 'white',
                              }}
                              display="flex"
                              justifyContent="space-between"
                              onClick={() => handleOpenModalEdit(machine.id)}
                            >
                              Editar
                              <Pencil size={20} />
                            </MenuItem>
                            <MenuItem
                              fontWeight="bold"
                              textColor="white"
                              backgroundColor="purple.600"
                              _hover={{
                                textColor: 'purple.600',
                                background: 'white',
                              }}
                              _focus={{
                                textColor: 'purple.600',
                                background: 'white',
                              }}
                              display="flex"
                              justifyContent="space-between"
                              onClick={() => handleDeleteConfirm(machine.id)}
                            >
                              Excluir
                              <Trash size={20} />
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Tooltip>
                    </td>
                  </Table.TrBody>
                  <tr>
                    <td className="py-2"></td>
                  </tr>
                </>
              )
            })}
          </Table.TBody>
        </Table.Root>
      </div>

      <ModalComponent
        isOpenModal={isOpenModalRegister}
        modalTitle="Cadastrar maquinário"
        onCloseModal={onCloseModalRegister}
      >
        <FormRegisterMachine onCloseModalRegister={onCloseModalRegister} />
      </ModalComponent>

      <ModalComponent
        isOpenModal={isOpenModalEdit}
        modalTitle="Editar maquinário"
        onCloseModal={onCloseModalEdit}
      >
        <EditFormMachine
          machineId={machineId}
          onCloseModalEdit={onCloseModalEdit}
        />
      </ModalComponent>

      <AlertConfirm
        isOpen={isOpenAlert}
        onCloseAlert={handleOnCloseAlertDeleteStudent}
        onSubmit={handleDeleteMachine}
        title="Tem certeza que deseja excluir esse maquinário?"
      />
    </div>
  )
}
