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
} from '@chakra-ui/react'
import AlertHelper from '../../components/alert/AlertHelper'
import { useAppContext } from '../../context/appContext'
import ListClients from './ListClients'

const Client = () => {
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
          <Heading
            size='md'
            color='red'
          >
            This will only have the client list assigned list for specific user.
            <br />
            Clients section will only have edit facility. <br />
            Daily update will be a separate menu
          </Heading>
          <ListClients />
        </Box>

        <Box
          p={{ base: 4, md: 8 }}
          bg='gray.50'
          boxShadow='md'
          borderRadius='md'
        >
          <form onSubmit={handleSubmit}>
            <Heading
              mb={4}
              size='lg'
            >
              {isEditing === true ? 'Edit' : 'Add'} Client
            </Heading>
            {showAlert && <AlertHelper />}
            <Stack spacing={4}>
              <FormControl>
                <FormLabel htmlFor='client_name'>Client Name</FormLabel>
                <Input
                  id='client_name'
                  placeholder='Enter new client'
                  value={client_name}
                  name='client_name'
                  onChange={handleClientInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='client_initials'>Client Initials</FormLabel>
                <Input
                  id='client_initials'
                  placeholder='Client initials'
                  value={client_initials}
                  name='client_initials'
                  onChange={handleClientInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='contact_name'>
                  Contact Person Name
                </FormLabel>
                <Input
                  id='contact_name'
                  placeholder='Contact Person'
                  value={contact_name}
                  name='contact_name'
                  onChange={handleClientInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='contact_email'>Email</FormLabel>
                <Input
                  id='contact_email'
                  placeholder='Email'
                  value={contact_email}
                  name='contact_email'
                  onChange={handleClientInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='contact_phone'>Contact No.</FormLabel>
                <Input
                  id='contact_phone'
                  placeholder='Contact no.'
                  value={contact_phone}
                  name='contact_phone'
                  onChange={handleClientInput}
                />
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
export { Client }
