import {
  ListDashes,
  Student,
  Gear,
  PersonSimpleRun,
  CaretRight,
} from 'phosphor-react'
import { useContext } from 'react'

import { GymLogo } from '../Logo'
import { LinkNavigator } from './LinkNavigator'

import { ViewPortContext } from '../../context/ViewPortContext'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'

export function SideBar() {
  const match = useContext(ViewPortContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  function toggleOpenOrCloseDrawer() {
    onOpen()
  }

  if (match) {
    return (
      <>
        <button
          onClick={toggleOpenOrCloseDrawer}
          className="w-[70px] flex bg-primary-purple relative hover:bg-secondary-purple transition-colors"
        >
          <CaretRight
            size={20}
            weight="bold"
            color="#fff"
            className="fixed bottom-1/2 mx-5"
          />
        </button>
        <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
            <DrawerBody>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  return (
    <aside className="w-[320px] p-6 flex flex-col bg-primary-purple">
      <div className="h-[200px] border-b-2 border-tertiary-pink flex justify-center">
        <GymLogo height="52" width="164" />
      </div>
      <div className="flex flex-col gap-6 mt-3">
        <LinkNavigator
          href="/dashboard"
          icon={<ListDashes size="18px" weight="bold" />}
          route="Dashboard"
        />
        <LinkNavigator
          href="/students"
          icon={<Student size="18px" weight="bold" />}
          route="Alunos"
        />
        <LinkNavigator
          href="/machines"
          icon={<Gear size="18px" weight="bold" />}
          route="Máquinas"
        />
        <LinkNavigator
          href="/plans"
          icon={<PersonSimpleRun size="18px" weight="bold" />}
          route="Planos"
        />
      </div>
    </aside>
  )
}
