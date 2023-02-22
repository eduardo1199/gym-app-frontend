import { useRef, forwardRef, RefObject } from 'react'

import {
  AlertDialogOverlay,
  useDisclosure,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react'

interface AlertConfirmProps {
  isOpen: boolean
  onCloseAlert: () => void
}

const AlertConfirmComponent = (
  { isOpen, onCloseAlert }: AlertConfirmProps,
  ref: any,
) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={ref}
      onClose={onCloseAlert}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Customer
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <button ref={ref} onClick={onCloseAlert}>
              Cancel
            </button>
            <button onClick={onCloseAlert}>Delete</button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export const AlertConfirm = forwardRef(AlertConfirmComponent)
