import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import Loading from '../../components/Loading'
import UsersBox from './UsersBox'
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    IconButton,
    Text,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useLocation } from 'react-router-dom'

const ListUsers = () => {
    const {
        client,
        pages,
        isLoading,
        numOfPages,
        totalClients,
        getClients,
        selectedClient,
    } = useAppContext()

    useEffect(() => {
        getClients()
    }, [])

    if (isLoading) {
        return <Loading />
    }

    if (totalClients === 0) {
        return (
            <Center>
                <h2>No clients to display...</h2>
            </Center>
        )
    }
    let custom_ind = 0

    return (
        <>
            <Box padding='1rem'>
                <Flex justify='space-between' align='center' mb='20px'>
                    <Heading as='h2' flex='1'>
                        {selectedClient.ClientName}
                    </Heading>
                </Flex>
                {client.map((ind_client) => (
                    <UsersBox
                        key={ind_client._id}
                        client={ind_client}
                        totalClients={totalClients}
                        custom_ind={custom_ind++}
                    />
                ))}
            </Box>
        </>
    )
}
export default ListUsers
