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
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { useAppContext } from '../../context/appContext'
import { Link } from 'react-router-dom'

const UserClientBox = ({ rows, totalRows, custom_ind }) => {
    const { displayAlert, delUserClient, user, getIndUser } = useAppContext()
    const {
        isOpen: isOpenAlert,
        onOpen: onOpenAlert,
        onClose: onCloseAlert,
    } = useDisclosure() // Renamed to avoid conflict

    const handleDeleteClick = () => {
        onOpenAlert() // Open the AlertDialog
    }
    const cancelRef = React.useRef()

    const [userName, setUserName] = useState('')

    return (
        <Box
            borderWidth='1px'
            borderBottomWidth={totalRows === custom_ind + 1 ? '1px' : '0'}
            overflow='hidden'
            width='100%'
        >
            <Flex align='center' justify='space-between' padding='10px'>
                <Text fontSize='sm' fontWeight='normal'>
                    <strong>
                        {rows.name} {rows.lastName}
                    </strong>
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
                            Are you sure you want to delete{' '}
                            <strong>
                                {rows.name} {rows.lastName}
                            </strong>
                            ? <br />
                            You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseAlert}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme='red'
                                onClick={() => delUserClient(rows._id)}
                                value={rows._id}
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

export default UserClientBox
