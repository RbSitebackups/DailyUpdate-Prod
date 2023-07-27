import React from 'react'
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
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { useAppContext } from '../../context/appContext'
import { Link } from 'react-router-dom'

const UsersBox = ({ client, totalClients, custom_ind }) => {
    const {
        displayAlert,
        updateclient,
        setEditClient,
        delClient,
        user,
        selectedClient,
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
            <Flex align='center' justify='space-between' padding='10px'>
                <Text fontSize='sm' fontWeight='normal'>
                    <strong>{client.client_initials}</strong> -{' '}
                    {client.client_name}
                </Text>
                {user.isAdmin && (
                    <Flex>
                        <IconButton
                            icon={<DeleteIcon />}
                            aria-label='Delete'
                            colorScheme='red'
                            onClick={handleDeleteClick}
                        />
                    </Flex>
                )}
            </Flex>
            <AlertDialog // Remove isOpen prop from this component
                leastDestructiveRef={cancelRef}
                onClose={onCloseAlert} // Use the onClose prop from useDisclosure
                isOpen={isOpenAlert} // Use the isOpen prop from useDisclosure
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete client
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete {client.client_name}
                            ? <br />
                            You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseAlert}>
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

export default UsersBox
