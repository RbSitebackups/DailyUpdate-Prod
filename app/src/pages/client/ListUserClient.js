import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import Loading from '../../components/Loading'
import UserClientBox from './UserClientBox'
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

const ListUserClient = () => {
    const {
        rows,
        pages,
        isLoading,
        numOfPages,
        totalRows,
        getUserClient,
        selectedClient,
        getIndUser,
    } = useAppContext()

    useEffect(() => {
        getUserClient()
    }, [])

    if (isLoading) {
        return <Loading />
    }

    if (totalRows === 0) {
        return (
            <Center>
                <h2>No records to display...</h2>
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
                {rows.map((ind_client) => (
                    <UserClientBox
                        key={ind_client._id}
                        rows={ind_client}
                        totalRows={totalRows}
                        custom_ind={custom_ind++}
                    />
                ))}
            </Box>
        </>
    )
}
export default ListUserClient
