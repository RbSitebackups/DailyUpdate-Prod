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
            <Flex align='center' justify='space-between' padding='10px'>
                <Text fontSize='sm' fontWeight='normal'>
                    <strong>{client.client_initials}</strong> -{' '}
                    {client.client_name}
                </Text>

                <Flex>
                    <Tooltip label='Daily Update' placement='top'>
                        <IconButton
                            icon={<FaClipboardList />}
                            aria-label='Users'
                            colorScheme='blue'
                            marginRight='0.5rem'
                            as={Link}
                            to='/dailyupdate'
                            onClick={() =>
                                setSelectedClient(
                                    client._id,
                                    client.client_name
                                )
                            }
                        />
                    </Tooltip>
                </Flex>
            </Flex>
        </Box>
    )
}

export default ClientBox
