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
import { useState } from 'react'
import { AlertConfirm } from 'src/components/AlertConfirm'
import { Header } from 'src/components/Header'
import { InputSearch } from 'src/components/Header/InputSearch'
import { ModalComponent } from 'src/components/Modal'
import { Table } from 'src/components/Table'
import {
  useDeletePlanMutation,
  useGetPlansQuery,
} from 'src/feature/plan/plan-slice'
import { FormRegisterPlan } from './components/FormRegister'

export function Plans() {
  const { data } = useGetPlansQuery()

  const [deletePlanFn] = useDeletePlanMutation()

  const [planId, setPlanId] = useState('')

  const toast = useToast()

  const {
    isOpen: isOpenModalRegister,
    onOpen: onOpenModalRegister,
    onClose: onCloseModalRegister,
  } = useDisclosure()

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure()

  async function handleDeletePlan() {
    try {
      await deletePlanFn({
        planId,
      })

      toast({
        status: 'success',
        title: 'Plano deletado com sucesso!',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        status: 'error',
        title: 'Error ao deletar plano!',
        duration: 9000,
        isClosable: true,
      })
    }

    onCloseAlert()
  }

  function handleOnCloseAlertDeleteStudent() {
    setPlanId('')
    onCloseAlert()
  }

  return (
    <div className="p-8">
      <Header />
      <div className="h-screen mt-10">
        <div className="mb-5 flex w-full justify-between">
          <InputSearch />
          <button
            type="button"
            onClick={onOpenModalRegister}
            className="bg-primary-purple p-3 rounded opacity-95 text-base font-bold text-white hover:bg-secondary-purple transition-colors focus:outline-none focus:ring focus:ring-primary-purple"
          >
            Cadastrar plano
          </button>
        </div>
        <Table.Root>
          <Table.THeader>
            <Table.Tr>
              <Table.FirstCell>Nome</Table.FirstCell>
              <Table.Cell>Período</Table.Cell>
              <Table.Cell>Preço</Table.Cell>
              <Table.LastCell />
            </Table.Tr>
            <tr>
              <td className="py-2"></td>
            </tr>
          </Table.THeader>
          <Table.TBody>
            {data?.plans.map((plan) => {
              return (
                <>
                  <Table.TrBody key={plan.id}>
                    <Table.FirstCellBody>{plan.name}</Table.FirstCellBody>
                    <Table.CellBody>{plan.plan_month_time}</Table.CellBody>

                    <Table.CellBody>{plan.price}</Table.CellBody>
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
                              onClick={onOpenAlert}
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

      <AlertConfirm
        isOpen={isOpenAlert}
        onCloseAlert={handleOnCloseAlertDeleteStudent}
        onSubmit={handleDeletePlan}
        title="Tem certeza que deseja excluir esse plano?"
      />

      <ModalComponent
        isOpenModal={isOpenModalRegister}
        modalTitle="Cadastrar Plano"
        onCloseModal={onCloseModalRegister}
      >
        <FormRegisterPlan onCloseModalRegister={onCloseModalRegister} />
      </ModalComponent>
    </div>
  )
}
