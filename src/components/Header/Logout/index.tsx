import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { CaretDown } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

interface LogoutProps {
  userName: string
}

export function Logout({ userName }: LogoutProps) {
  const navigation = useNavigate()
  const cookies = new Cookies()

  function handleLogout() {
    cookies.remove('@gymapp-admin')
    navigation('/')
  }

  return (
    <div className="flex items-center gap-2">
      <Avatar
        src="https://avatars.githubusercontent.com/u/62710668?v=4"
        size="md"
      />
      <span className="text-secondary-gray font-normal text-sm hidden xl:flex">
        {userName}
      </span>
      <Menu offset={[0, 28]}>
        <MenuButton
          as={Button}
          rightIcon={<CaretDown className="mr-2" />}
          display="flex"
          bg="transparent"
          p="0"
          height="15px"
          width="15px"
          padding="15px"
          minWidth="0"
          border="none"
          _hover={{ bg: 'transparent' }}
          _group
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
            onClick={handleLogout}
          >
            Sair
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
