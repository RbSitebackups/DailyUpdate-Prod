import React, { useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import ListClients from './ListClients'

const Edmschedule = () => {
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
