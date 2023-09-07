import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Tooltip,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { useAppContext } from '../../context/appContext'
import { Link } from 'react-router-dom'
import { FaClipboardList } from 'react-icons/fa'

const ClientBox = ({ client, totalClients, custom_ind }) => {
  const {
    displayAlert,
    updateclient,
    setEditClient,
    delClient,
    user,
    setSelectedClient,
  } = useAppContext()

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure() // Renamed to avoid conflict

  const handleDeleteClick = () => {
    onOpenAlert() // Open the AlertDialog
  }
  const cancelRef = React.useRef()

  return (
    <Box
      borderWidth='1px'
      borderBottomWidth={totalClients === custom_ind + 1 ? '1px' : '0'}
      overflow='hidden'
      width='100%'
    >
      <Flex
        align='center'
        justify='space-between'
        padding='10px'
      >
        <Text
          fontSize='sm'
          fontWeight='normal'
        >
          <Button
            background={`#${client.bgcolor}`}
            size='xs'
            borderRadius={0}
            mr='20px'
          />
          <strong>{client.client_initials}</strong> - {client.client_name}
        </Text>

        <Flex>
          <Tooltip label='Daily Update'>
            <IconButton
              icon={<FaClipboardList />}
              aria-label='Users'
              colorScheme='blue'
              marginRight='0.5rem'
              as={Link}
              to='/dailyupdate'
              onClick={() => setSelectedClient(client._id, client.client_name)}
            />
          </Tooltip>

          <Tooltip label='View Assignee'>
            <IconButton
              icon={<ViewIcon />}
              aria-label='Users'
              colorScheme='green'
              marginRight='0.5rem'
              as={Link}
              to='/userclient'
              onClick={() => setSelectedClient(client._id, client.client_name)}
            />
          </Tooltip>

          <Tooltip label='Edit Client'>
            <IconButton
              icon={<EditIcon />}
              aria-label='Edit'
              colorScheme='orange'
              marginRight='0.5rem'
              onClick={() => setEditClient(client._id)}
            />
          </Tooltip>

          <Tooltip label='Delete Client'>
            <IconButton
              icon={<DeleteIcon />}
              aria-label='Delete'
              colorScheme='red'
              onClick={handleDeleteClick}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <AlertDialog // Remove isOpen prop from this component
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert} // Use the onClose prop from useDisclosure
        isOpen={isOpenAlert} // Use the isOpen prop from useDisclosure
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize='lg'
              fontWeight='bold'
            >
              Delete client
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete {client.client_name}
              ? <br />
              You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onCloseAlert}
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => delClient(client._id)}
                value={client._id}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default ClientBox
