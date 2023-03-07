import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { CaretDown } from 'phosphor-react'

interface LogoutProps {
  userName: string
}

export function Logout({ userName }: LogoutProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar
        src="https://avatars.githubusercontent.com/u/62710668?v=4"
        size="md"
      />
      <span className="text-secondary-gray font-normal text-sm hidden xl:flex">
        {userName}
      </span>
      <Menu>
        <MenuButton as={Button} rightIcon={<CaretDown />} />
        <MenuList>
          <MenuItem>Sair</MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
