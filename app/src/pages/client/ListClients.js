import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import Loading from '../../components/Loading'
import ClientBox from './ClientBox'
import { Box, Center, Flex, Heading } from '@chakra-ui/react'

const ListClients = () => {
    const { client, isLoading, totalClients, getClients } = useAppContext()

    /* eslint-disable react-hooks/exhaustive-deps */
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
                        Clients
                    </Heading>
                    <Heading as='h5' size='sm' style={{ flex: '0 0 auto' }}>
                        {totalClients} Client
                        {totalClients > 1 ? 's' : ''} found
                    </Heading>
                    {/* <IconButton
                        icon={<AddIcon />}
                        aria-label='Edit'
                        colorScheme='green'
                        marginRight='0.5rem'
                        ml={2}
                        onClick={() => setIsFormActive(!isFormActive)}
                    /> */}
                </Flex>
                {client.map((ind_client) => (
                    <ClientBox
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
export default ListClients
