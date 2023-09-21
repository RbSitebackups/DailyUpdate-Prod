import {
  Avatar,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Text,
  Image,
  Link,
  Button,
} from '@chakra-ui/react'
import { MdNotificationsNone, MdInfoOutline } from 'react-icons/md'
import { ThemeEditor } from './ThemeEditor'
import { useAppContext } from '../context/appContext'
import { Link as ReactLink } from 'react-router-dom'

const TopNavBar = ({ location }) => {
  const { user, logoutUser } = useAppContext()

  const navbarIcon = useColorModeValue('gray.400', 'white')
  let menuBg = useColorModeValue('white', 'navy.800')
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const textColorBrand = useColorModeValue('brand.700', 'brand.400')
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)')
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
  )

  const activeColor = '#E0B87C'
  const fColor = '#fff'
  const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200')
  return (
    <Flex
      alignItems='center'
      alignContent='center'
    >
      <Link
        as={ReactLink}
        to='/'
        bg={location.pathname === '/' ? activeColor : 'transparent'}
        p='3'
        color='white'
        _hover={{
          textDecor: 'none',
          bg: activeColor,
          color: fColor,
        }}
      >
        Dashboard
      </Link>

      <Link
        as={ReactLink}
        to='/campaigns'
        bg={location.pathname === '/campaigns' ? activeColor : 'transparent'}
        p='3'
        color='white'
        _hover={{
          textDecor: 'none',
          bg: activeColor,
          color: fColor,
        }}
      >
        Campaigns
      </Link>

      <Link
        as={ReactLink}
        to='/listschedule'
        bg={location.pathname === '/listschedule' ? activeColor : 'transparent'}
        p='3'
        color='white'
        _hover={{
          textDecor: 'none',
          bg: activeColor,
          color: fColor,
        }}
      >
        EDMs
      </Link>

      <Link
        as={ReactLink}
        to='/social'
        bg={location.pathname === '/social' ? activeColor : 'transparent'}
        p='3'
        color='white'
        _hover={{
          textDecor: 'none',
          bg: activeColor,
          color: fColor,
        }}
      >
        Social
      </Link>
      {/* <Menu>
                <MenuButton p='0px'>
                    <Icon
                        mt='6px'
                        as={MdNotificationsNone}
                        color={navbarIcon}
                        w='18px'
                        h='18px'
                        me='10px'
                    />
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p='20px'
                    borderRadius='20px'
                    bg={menuBg}
                    border='none'
                    mt='22px'
                    me={{ base: '30px', md: 'unset' }}
                    minW={{ base: 'unset', md: '400px', xl: '450px' }}
                    maxW={{ base: '360px', md: 'unset' }}
                >
                    <Flex jusitfy='space-between' w='100%' mb='20px'>
                        <Text fontSize='md' fontWeight='600' color={textColor}>
                            Notifications
                        </Text>
                        <Text
                            fontSize='sm'
                            fontWeight='500'
                            color={textColorBrand}
                            ms='auto'
                            cursor='pointer'
                        >
                            Mark all read
                        </Text>
                    </Flex>
                    <Flex flexDirection='column'>
                        <MenuItem
                            _hover={{ bg: 'none' }}
                            _focus={{ bg: 'none' }}
                            px='0'
                            borderRadius='8px'
                            mb='10px'
                        >
                            <h4>test</h4>
                        </MenuItem>
                        <MenuItem
                            _hover={{ bg: 'none' }}
                            _focus={{ bg: 'none' }}
                            px='0'
                            borderRadius='8px'
                            mb='10px'
                        >
                            <h4>test</h4>
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>

            <Menu>
                <MenuButton p='0px'>
                    <Icon
                        mt='6px'
                        as={MdInfoOutline}
                        color={navbarIcon}
                        w='18px'
                        h='18px'
                        me='10px'
                    />
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p='20px'
                    me={{ base: '30px', md: 'unset' }}
                    borderRadius='20px'
                    bg={menuBg}
                    border='none'
                    mt='22px'
                    minW={{ base: 'unset' }}
                    maxW={{ base: '360px', md: 'unset' }}
                >
                    <Image src='' borderRadius='16px' mb='28px' />
                    <Flex flexDirection='column'>
                        <Link w='100%' href='https://horizon-ui.com/pro'>
                            <Button w='100%' h='44px' mb='10px' variant='brand'>
                                Buy Horizon UI PRO
                            </Button>
                        </Link>
                        <Link
                            w='100%'
                            href='https://horizon-ui.com/documentation/docs/introduction'
                        >
                            <Button
                                w='100%'
                                h='44px'
                                mb='10px'
                                border='1px solid'
                                bg='transparent'
                                borderColor={borderButton}
                            >
                                See Documentation
                            </Button>
                        </Link>
                        <Link
                            w='100%'
                            href='https://github.com/horizon-ui/horizon-ui-chakra'
                        >
                            <Button
                                w='100%'
                                h='44px'
                                variant='no-hover'
                                color={textColor}
                                bg='transparent'
                            >
                                Try Horizon Free
                            </Button>
                        </Link>
                    </Flex>
                </MenuList>
            </Menu>

            <ThemeEditor navbarIcon={navbarIcon} /> */}

      <Menu>
        <MenuButton
          p='0px'
          ml='40px'
        >
          <Avatar
            _hover={{ cursor: 'pointer' }}
            color='white'
            name={user.user}
            bg='#11047A'
            size='sm'
            w='40px'
            h='40px'
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='0px'
          mt='10px'
          borderRadius='20px'
          bg={menuBg}
          border='none'
        >
          <Flex
            w='100%'
            mb='0px'
          >
            <Text
              ps='20px'
              pt='16px'
              pb='10px'
              w='100%'
              borderBottom='1px solid'
              borderColor={borderColor}
              fontSize='sm'
              fontWeight='700'
              color={textColor}
            >
              👋&nbsp; Hey, {user.displayName}
            </Text>
          </Flex>
          <Flex
            flexDirection='column'
            p='10px'
          >
            {/* <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              borderRadius='8px'
              px='14px'
              as={ReactLink}
              to='/profile'
            >
              <Text fontSize='sm'>Profile Settings</Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              borderRadius='8px'
              px='14px'
            >
              <Text fontSize='sm'>Newsletter Settings</Text> 
            </MenuItem>*/}
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              color='red.400'
              borderRadius='8px'
              px='14px'
              onClick={logoutUser}
            >
              <Text fontSize='sm'>Log out</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  )
}
export default TopNavBar
