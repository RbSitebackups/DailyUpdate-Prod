import { Outlet } from 'react-router-dom'
import MainSidebar from './MainSidebar'
import { Box, Flex, Grid } from '@chakra-ui/react'
import { useState } from 'react'
import Navbar from './Navbar'

const SharedLayout = () => {
    const [navSize, changeNavSize] = useState(true)
    return (
        <Grid
            templateColumns={{ base: '1fr', md: '250px 1fr' }}
            templateRows={{ base: 'auto', md: '1fr auto' }}
            h='100vh'
        >
            <MainSidebar navSize={navSize} />
            <Flex flexDir='column'>
                <Navbar />
                <Box
                    p='50px'
                    bg='brown'
                    h='100%'
                    gridColumn='2/3'
                    gridRow='2/3'
                >
                    <Outlet />
                </Box>
            </Flex>
        </Grid>
    )
}
export default SharedLayout
