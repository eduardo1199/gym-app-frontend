import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from '@chakra-ui/react'
import { DotsThreeVertical, Files, Pencil, Trash } from 'phosphor-react'
import { Header } from 'src/components/Header'
import { InputSearch } from 'src/components/Header/InputSearch'
import { Table } from 'src/components/Table'
import { useGetMachinesQuery } from 'src/feature/machine/machine-slice'

export function Machines() {
  const { data } = useGetMachinesQuery()

  return (
    <div className="p-8">
      <Header visibleSearchBar />
      <div className="h-screen mt-10">
        <div className="mb-5 flex w-full justify-between">
          <InputSearch />
          <button
            type="button"
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
                  <Table.TrBody>
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
    </div>
  )
}
