import React, { useEffect } from 'react'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    Select,
    Stack,
} from '@chakra-ui/react'
import AlertHelper from '../../components/alert/AlertHelper'
import { useAppContext } from '../../context/appContext'
import ListUserClient from './ListUserClient'

const Userclient = () => {
    const {
        userlist,
        isLoading,
        showAlert,
        handleChange,
        clearValues,
        createUserClient,
        getUserClient,
        getUserlist,
    } = useAppContext()

    const handleClientInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createUserClient()
        getUserClient()
    }

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        getUserlist()
    }, [])

    return (
        <>
            <Grid
                templateColumns={{ base: '1fr', md: '2fr 1fr' }}
                gap={{ base: 4, md: 8 }}
            >
                <Box
                    p={{ base: 4, md: 8 }}
                    bg='gray.100'
                    borderRadius='md'
                    boxShadow='md'
                >
                    <ListUserClient />
                </Box>

                <Box
                    p={{ base: 4, md: 8 }}
                    bg='gray.50'
                    boxShadow='md'
                    borderRadius='md'
                >
                    <form onSubmit={handleSubmit}>
                        <Heading mb={4} size='lg'>
                            Assign User
                        </Heading>
                        {showAlert && <AlertHelper />}
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel htmlFor='UserID'>
                                    Assignee Name
                                </FormLabel>
                                <Select
                                    placeholder='Select a user'
                                    onChange={handleClientInput}
                                    name='assigned_id'
                                >
                                    {userlist.map((user) => (
                                        <option value={user._id} key={user._id}>
                                            {user.name} {user.lastName}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>

                            <Flex
                                flexDirection={{
                                    base: 'column',
                                    md: 'row',
                                }}
                                justifyContent='space-between'
                            >
                                <Button
                                    type='submit'
                                    colorScheme='teal'
                                    isLoading={isLoading}
                                    flex={{ base: '1', md: 'auto' }}
                                    mb={{ base: '4', md: '0' }}
                                    mr={{ md: '2' }}
                                >
                                    Submit
                                </Button>
                                <Button
                                    colorScheme='orange'
                                    type='button'
                                    onClick={clearValues}
                                    flex={{ base: '1', md: 'auto' }}
                                    ml={{ md: '2' }}
                                >
                                    Clear
                                </Button>
                            </Flex>
                        </Stack>
                    </form>
                </Box>
            </Grid>
        </>
    )
}
export { Userclient }
