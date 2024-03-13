/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react'

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
}

const AlertConfirmComponent = (
  { isOpen, onCloseAlert, onSubmit }: AlertConfirmProps,
  ref: any,
) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={ref}
      onClose={onCloseAlert}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg="#5041BC">
          <AlertDialogHeader fontSize="lg" fontWeight="bold" color="white">
            Confirmação de exclusão
          </AlertDialogHeader>

          <AlertDialogBody>
            <span className="text-white font-semibold">
              Tem certeza que deseja excluir esse alunos?
            </span>
          </AlertDialogBody>

          <AlertDialogFooter display="flex" justifyContent="space-between">
            <button
              ref={ref}
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

export const AlertConfirm = forwardRef<any, AlertConfirmProps>(
  AlertConfirmComponent,
)
