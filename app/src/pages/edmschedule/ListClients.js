import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import Loading from '../../components/Loading'
import ClientBox from './ClientBox'
import {
    Box,
    Center,
    Flex,
    Heading,
    Icon,
    IconButton,
    Text,
    Tooltip,
} from '@chakra-ui/react'
import { BsChevronRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const ListClients = () => {
    const { client, isLoading, totalClients, getClients, setSelectedClient } =
        useAppContext()

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
            <Box padding='1rem' width='100%'>
                <Flex justify='space-between' align='center' mb='20px'>
                    <Heading as='h2' flex='1'>
                        EDM Schedules
                    </Heading>
                    <Heading as='h5' size='sm' style={{ flex: '0 0 auto' }}>
                        {totalClients} Client
                        {totalClients > 1 ? 's' : ''} found
                    </Heading>
                </Flex>
                {client.map((ind_client) => (
                    <Box
                        borderWidth='1px'
                        borderBottomWidth={
                            totalClients === custom_ind++ + 1 ? '1px' : '0'
                        }
                        width='100%'
                    >
                        <Link
                            to='/listschedule'
                            onClick={() =>
                                setSelectedClient(
                                    ind_client._id,
                                    ind_client.client_name
                                )
                            }
                        >
                            <Box _hover={{ backgroundColor: '#f7f7f7' }}>
                                <Flex
                                    align='center'
                                    justify='space-between'
                                    padding='10px'
                                    key={ind_client._id}
                                >
                                    <Text fontSize='sm' fontWeight='normal'>
                                        <strong>
                                            {ind_client.client_initials}
                                        </strong>{' '}
                                        - {ind_client.client_name}
                                    </Text>

                                    <Flex>
                                        <Tooltip
                                            label='List Schedules'
                                            placement='top'
                                        >
                                            <IconButton
                                                aria-label='Users'
                                                background='#313131'
                                                colorScheme='gray'
                                                marginRight='0.5rem'
                                                as={Link}
                                                _hover={{
                                                    color: '#313131',
                                                }}
                                                to='/listschedule'
                                                onClick={() =>
                                                    setSelectedClient(
                                                        client._id,
                                                        client.client_name
                                                    )
                                                }
                                                borderRadius='50%'
                                            >
                                                <Icon
                                                    as={BsChevronRight}
                                                    color='white'
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Link>
                    </Box>
                ))}
            </Box>
        </>
    )
}
export default ListClients
