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
  handleSubmit: () => void
  visibleButtonsFooter: boolean
}

function ModalComponent(
  {
    isOpenModalEdit,
    onCloseModalEdit,
    children,
    handleSubmit,
    visibleButtonsFooter,
  }: ModalComponentProps,
  ref: any,
) {
  return (
    <ModalContainer
      onClose={onCloseModalEdit}
      isOpen={isOpenModalEdit}
      finalFocusRef={ref}
    >
      <ModalOverlay />
      <ModalContent bg={'#5041BC'}>
        <ModalHeader>
          <p className="text-primary-white">Visualização do Aluno</p>
        </ModalHeader>
        <ModalCloseButton textColor={'white'} fontSize={14} />

        <ModalBody>{children}</ModalBody>

        {visibleButtonsFooter && (
          <ModalFooter display="flex" justifyContent="space-between">
            <button onClick={onCloseModalEdit}>Fechar</button>
            <button type="submit" onClick={handleSubmit}>
              Salvar
            </button>
          </ModalFooter>
        )}
      </ModalContent>
    </ModalContainer>
  )
}

export const Modal = forwardRef(ModalComponent)
