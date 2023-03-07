import { forwardRef, ReactNode } from 'react'

import {
  useDisclosure,
  useToast,
  Modal as ModalContainer,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

interface ModalComponentProps {
  onCloseModalEdit: () => void
  isOpenModalEdit: boolean
  children: ReactNode
}

function ModalComponent(
  { isOpenModalEdit, onCloseModalEdit, children }: ModalComponentProps,
  ref: any,
) {
  return (
    <ModalContainer onClose={onCloseModalEdit} isOpen={isOpenModalEdit}>
      <ModalOverlay />
      <ModalContent bg={'#5041BC'} ref={ref}>
        <ModalHeader>
          <p className="text-primary-white">Visualização do Aluno</p>
        </ModalHeader>
        <ModalCloseButton textColor={'white'} fontSize={14} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <button onClick={onCloseModalEdit}>Close</button>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  )
}

export const Modal = forwardRef(ModalComponent)
