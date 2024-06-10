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
import { User } from 'src/types/user'
import { dateFormat, isActivePlanUser } from 'src/utils'

interface TableRowProps {
  user: User
  onOpenAlertDelete: (id: string) => void
  onOpenModalEdit: (id: string) => void
  onOpenSlide: (id: string) => void
}

export const TableRow = ({
  onOpenAlertDelete,
  onOpenModalEdit,
  onOpenSlide,
  user,
}: TableRowProps) => {
  const isActivePlan = isActivePlanUser(
    user.start_plan_date,
    user.finish_plan_date,
  )

  return (
    <>
      <Table.TrBody>
        <Table.FirstCellBody>{user.name}</Table.FirstCellBody>
        <Table.CellBody>{dateFormat(user.start_plan_date)}</Table.CellBody>
        <Table.CellBody>{user.age} anos</Table.CellBody>
        <Table.CellBody>{user.weight}kg</Table.CellBody>
        <td>
          <Tooltip
            hasArrow
            label={`${
              isActivePlan
                ? 'Usuário está com plano em dia'
                : 'Usuário está com plano vencido'
            }`}
            bg={`${isActivePlan ? 'green.600' : 'red.600'}`}
          >
            <button
              className={`w-4 h-4 ${
                isActivePlan ? 'bg-green-600' : 'bg-red-600'
              } rounded-full`}
            />
          </Tooltip>
        </td>
        <td>
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
                background="purple.600"
                _hover={{ textColor: 'purple.600', background: 'white' }}
                _focus={{ textColor: 'purple.600', background: 'white' }}
                display="flex"
                justifyContent="space-between"
                onClick={() => onOpenSlide(user.id)}
              >
                Visualizar
                <Files size={20} />
              </MenuItem>
              <MenuItem
                fontWeight="bold"
                textColor="white"
                background="purple.600"
                _hover={{ textColor: 'purple.600', background: 'white' }}
                _focus={{ textColor: 'purple.600', background: 'white' }}
                display="flex"
                justifyContent="space-between"
                onClick={() => onOpenModalEdit(user.id)}
              >
                Editar
                <Pencil size={20} />
              </MenuItem>
              <MenuItem
                fontWeight="bold"
                textColor="white"
                background="purple.600"
                _hover={{ textColor: 'purple.600', background: 'white' }}
                _focus={{ textColor: 'purple.600', background: 'white' }}
                display="flex"
                justifyContent="space-between"
                onClick={() => onOpenAlertDelete(user.id)}
              >
                Excluir
                <Trash size={20} />
              </MenuItem>
            </MenuList>
          </Menu>
        </td>
      </Table.TrBody>
      <tr>
        <td className="py-2"></td>
      </tr>
    </>
  )
}
