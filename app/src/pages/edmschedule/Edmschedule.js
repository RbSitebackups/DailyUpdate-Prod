import React, { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    Input,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react'
import { useAppContext } from '../../context/appContext'
import ListClients from './ListClients'

const Edmschedule = () => {
    const {
        isEditing,
        isLoading,
        showAlert,
        displayAlert,
        client_name,
        client_initials,
        contact_name,
        contact_email,
        contact_phone,
        handleChange,
        clearValues,
        createClient,
        getClients,
        setEditClient,
        editClient,
        delClient,
        isFormActive,
    } = useAppContext()

    const handleClientInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!client_name || !client_initials) {
            displayAlert()
            return
        }

        if (isEditing) {
            editClient()
            getClients()
            return
        }

        createClient()
        getClients()
    }

    useEffect(() => {
        sessionStorage.removeItem('ClientID')
        sessionStorage.removeItem('ClientName')
    }, [])

    return (
        <>
            <Flex width='100%'>
                <Box
                    bg='gray.100'
                    p='30px'
                    borderRadius='md'
                    boxShadow='md'
                    flex='1'
                >
                    <ListClients />
                </Box>
            </Flex>
        </>
    )
}
export { Edmschedule }
