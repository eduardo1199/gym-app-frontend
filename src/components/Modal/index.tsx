import { ReactNode } from 'react'

import {
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

export function ModalComponent({
  isOpenModalEdit,
  onCloseModalEdit,
  children,
  handleSubmit,
  visibleButtonsFooter,
}: ModalComponentProps) {
  return (
    <ModalContainer onClose={onCloseModalEdit} isOpen={isOpenModalEdit}>
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
