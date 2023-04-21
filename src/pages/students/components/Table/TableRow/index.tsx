import { forwardRef } from 'react'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from '@chakra-ui/react'

import { DotsThreeVertical, Trash, Pencil, Files } from 'phosphor-react'

interface TableRowProps {
  name: string
  startDatePlan: string
  ageUser: number
  weight: number
  id: string
  active: boolean
  onOpenAlertDelete: (id: string) => void
  onOpenModalEdit: (id: string) => void
}

const TableRowComponent = (props: TableRowProps, ref: any) => {
  return (
    <>
      <tr className="bg-primary-white border border-tertiary-pink rounded-t-2xl rounded-b-2xl hover:shadow-md transition-shadow rounded-tl-md rounded-bl-md">
        <td className="py-5 px-3 text-base text-primary-gray font-semibold">
          {props.name}
        </td>
        <td className="font-extrabold text-base text-primary-blue">
          {props.startDatePlan}
        </td>
        <td className="text-base text-primary-gray font-semibold">
          {props.ageUser} anos
        </td>
        <td className="text-base text-primary-gray font-semibold">
          {props.weight}kg
        </td>
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
                  ref={ref}
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
                  ref={ref}
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
                  ref={ref}
                >
                  Excluir
                  <Trash size={20} />
                </MenuItem>
              </MenuList>
            </Menu>
          </Tooltip>
        </td>
      </tr>
      <tr>
        <td className="py-2"></td>
      </tr>
    </>
  )
}

export const TableRow = forwardRef(TableRowComponent)
