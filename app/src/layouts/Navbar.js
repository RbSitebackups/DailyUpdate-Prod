import { Flex, IconButton, Image } from '@chakra-ui/react'
import TopNavBar from './TopNavBar'
import { SearchBar } from './searchbar/SearchBar'
import { FaBars, FaTimes } from 'react-icons/fa'
import resonate from '../assets/images/r-logo.png'
import resonate_ico from '../assets/images/Resonate-icon.png'

const Navbar = ({ navSize, toggleNavSize }) => {
  return (
    <Flex
      bg='blackAlpha.800'
      w='100%'
      h='auto'
      align='center'
      justify='space-between'
      pr={50}
    >
      <Flex>
        <Image
          src={navSize ? resonate : resonate_ico}
          p={5}
          w={navSize ? '220px' : '75px'}
          mr={navSize ? '50px' : '46px'}
        />
        <IconButton
          aria-label='Toggle Navigation Size'
          icon={navSize ? <FaBars /> : <FaTimes />}
          onClick={toggleNavSize}
          colorScheme='whiteAlpha'
          variant='outline'
          borderRadius={2}
          alignSelf='center'
          ml='auto' // Move the button to the right
          // color={colorMode === 'dark' ? 'white' : 'black'}
        />
      </Flex>
      <TopNavBar />
    </Flex>
  )
}

export default Navbar
