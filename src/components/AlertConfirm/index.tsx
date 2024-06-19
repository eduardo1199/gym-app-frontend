import { useRef } from 'react'

import {
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react'

interface AlertConfirmProps {
  isOpen: boolean
  onCloseAlert: () => void
  onSubmit: () => Promise<void>
  title: string
}

export const AlertConfirm = ({
  isOpen,
  onCloseAlert,
  onSubmit,
  title,
}: AlertConfirmProps) => {
  const cancelRef = useRef(null)

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCloseAlert}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg="#5041BC">
          <AlertDialogHeader fontSize="lg" fontWeight="bold" color="white">
            Confirmação de exclusão
          </AlertDialogHeader>

          <AlertDialogBody>
            <span className="text-white font-semibold">{title}</span>
          </AlertDialogBody>

          <AlertDialogFooter display="flex" justifyContent="space-between">
            <button
              ref={cancelRef}
              onClick={onCloseAlert}
              className="bg-primary-yellow px-3 py-2 text-base text-white font-bold rounded-lg focus:outline-none focus:ring focus:ring-secondary-yellow"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="bg-alert-danger px-3 py-2 text-base text-white font-bold rounded-lg focus:outline-none focus:ring focus:ring-secondary-alert-danger"
            >
              Delete
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
