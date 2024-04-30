import { ReactNode } from 'react'

import {
  Modal as ModalContainer,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

interface ModalComponentProps {
  onCloseModal: () => void
  isOpenModal: boolean
  children: ReactNode
}

export function ModalComponent({
  isOpenModal,
  onCloseModal,
  children,
}: ModalComponentProps) {
  return (
    <ModalContainer onClose={onCloseModal} isOpen={isOpenModal}>
      <ModalOverlay />
      <ModalContent bg={'#5041BC'}>
        <ModalHeader>
          <p className="text-primary-white">Visualização do Aluno</p>
        </ModalHeader>
        <ModalCloseButton textColor={'white'} fontSize={14} />

        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalContainer>
  )
}
