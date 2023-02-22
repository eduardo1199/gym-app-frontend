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
  ageUser: string
  weight: string
  id: string
  active: boolean
}

export function TableRow(props: TableRowProps) {
  return (
    <>
      <tr className="bg-primary-white border border-tertiary-pink rounded-t-2xl rounded-b-2xl hover:shadow-md transition-shadow">
        <td className="py-5 px-3">
          <span className="text-base text-primary-gray font-semibold">
            {props.name}
          </span>
        </td>
        <td>
          <span className="font-extrabold text-base text-primary-blue">
            {props.startDatePlan}
          </span>
        </td>
        <td>
          <span className="text-base text-primary-gray font-semibold">
            {props.ageUser} anos
          </span>
        </td>
        <td>
          <span className="text-base text-primary-gray font-semibold">
            {props.weight}kg
          </span>
        </td>
        <td>
          <Tooltip
            hasArrow
            label="Usuário está com plano vencido"
            bg={`${props.active ? 'green.600' : 'red.600'}`}
          >
            <button
              className={`w-4 h-4 ${
                props.active ? 'bg-green-600' : 'bg-red-600'
              } rounded-full`}
            />
          </Tooltip>
        </td>
        <td className="rounded">
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
        <td className="py-4"></td>
      </tr>
    </>
  )
}
