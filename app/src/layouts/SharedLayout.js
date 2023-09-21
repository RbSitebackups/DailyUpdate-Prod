import { Outlet } from 'react-router-dom'
import MainSidebar from './MainSidebar'
import { Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import Navbar from './Navbar'
import pattern from '../assets/images/pattern.png'
import { useLocation } from 'react-router-dom'

const SharedLayout = () => {
  const [navSize, setNavSize] = useState(true)

  const toggleNavSize = () => {
    setNavSize(!navSize)
  }
  const location = useLocation()

  const mainSidebarWidth = navSize ? '250px' : '75px' // Adjust the width as needed

  return (
    <>
      <Flex bg='blackAlpha.800'>
        <Navbar
          navSize={navSize}
          location={location}
          toggleNavSize={toggleNavSize}
        />
      </Flex>
      <Flex>
        <MainSidebar
          navSize={navSize}
          location={location}
        />
        <Flex
          flexDir='column'
          w='100%'
        >
          <Box
            p='50px'
            bgImage={pattern}
            bgRepeat='repeat'
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
