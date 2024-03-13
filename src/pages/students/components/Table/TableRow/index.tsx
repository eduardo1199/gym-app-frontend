import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from '@chakra-ui/react'

import { DotsThreeVertical, Trash, Pencil, Files } from 'phosphor-react'
import { Table } from '../../../../../components/Table'

interface TableRowProps {
  name: string
  startDatePlan: string
  ageUser: number
  weight: number
  id: string
  active: boolean
  onOpenAlertDelete: (id: string) => void
  onOpenModalEdit: (id: string) => void
  onOpenSlide: (id: string) => void
}

export const TableRow = (props: TableRowProps) => {
  return (
    <>
      <Table.TrBody>
        <Table.FirstCellBody>{props.name}</Table.FirstCellBody>
        <Table.CellBody>{props.startDatePlan}</Table.CellBody>
        <Table.CellBody>{props.ageUser} anos</Table.CellBody>
        <Table.CellBody>{props.weight}kg</Table.CellBody>
        <td>
          <Tooltip
            hasArrow
            label={`${
              props.active
                ? 'Usuário está com plano em dia'
                : 'Usuário está com plano vencido'
            }`}
            bg={`${props.active ? 'green.600' : 'red.600'}`}
          >
            <button
              className={`w-4 h-4 ${
                props.active ? 'bg-green-600' : 'bg-red-600'
              } rounded-full`}
            />
          </Tooltip>
        </td>
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
                  _hover={{ textColor: 'purple.600', background: 'white' }}
                  _focus={{ textColor: 'purple.600', background: 'white' }}
                  display="flex"
                  justifyContent="space-between"
                  onClick={() => props.onOpenSlide(props.id)}
                >
                  Visualizar
                  <Files size={20} />
                </MenuItem>
                <MenuItem
                  fontWeight="bold"
                  textColor="white"
                  _hover={{ textColor: 'purple.600', background: 'white' }}
                  _focus={{ textColor: 'purple.600', background: 'white' }}
                  display="flex"
                  justifyContent="space-between"
                  onClick={() => props.onOpenModalEdit(props.id)}
                >
                  Editar
                  <Pencil size={20} />
                </MenuItem>
                <MenuItem
                  fontWeight="bold"
                  textColor="white"
                  _hover={{ textColor: 'purple.600', background: 'white' }}
                  _focus={{ textColor: 'purple.600', background: 'white' }}
                  display="flex"
                  justifyContent="space-between"
                  onClick={() => props.onOpenAlertDelete(props.id)}
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
}
