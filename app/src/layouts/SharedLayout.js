import { Outlet } from 'react-router-dom'
import MainSidebar from './MainSidebar'
import { Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import Navbar from './Navbar'

const SharedLayout = () => {
  const [navSize, setNavSize] = useState(true)

  const toggleNavSize = () => {
    setNavSize(!navSize)
  }

  const mainSidebarWidth = navSize ? '250px' : '75px' // Adjust the width as needed

  return (
    <>
      <Flex bg='blackAlpha.800'>
        <Navbar
          navSize={navSize}
          toggleNavSize={toggleNavSize}
        />
      </Flex>
      <Flex>
        <MainSidebar navSize={navSize} />
        <Flex
          flexDir='column'
          w='100%'
        >
          <Box
            p='50px'
            bg='brown'
            w='100%'
            minH='100vh'
          >
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default SharedLayout
