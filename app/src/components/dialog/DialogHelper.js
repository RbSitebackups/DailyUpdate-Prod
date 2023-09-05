import React, { useState, useEffect } from 'react'
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useAppContext } from '../../context/appContext'

const DialogHelper = () => {
  const { showDialog, hideDialog, rowID, endPointTarget, delRecord, callback } =
    useAppContext()
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure() // Renamed to avoid conflict

  useEffect(() => {
    onOpenAlert() // Automatically open the AlertDialog
  }, []) // Empty dependency array ensures this effect runs once

  const handleCloseDialog = () => {
    hideDialog()
    onCloseAlert()
  }

  return (
    <div>
      {showDialog && (
        <AlertDialog
          isOpen={isOpenAlert}
          onClose={handleCloseDialog}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
                fontSize='lg'
                fontWeight='bold'
              >
                Delete
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete? <br />
                You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button
                  colorScheme='red'
                  ml={3}
                  onClick={() => delRecord(rowID, endPointTarget, callback)}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </div>
  )
}

export default DialogHelper
