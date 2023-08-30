import { Flex, Icon, Menu, Link, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const NavItem = ({
    navSize,
    active,
    item,
    title,
    pgLink,
    icon,
    subNav,
    iconClosed,
    iconOpened,
}) => {
    const { logoutUser } = useAppContext()
    const [trigSubnav, setTrigSubnav] = useState(false)
    const showSubnav = () => setTrigSubnav(!trigSubnav)
    const activeColor = '#E0B87C'
    return (
        <Flex
            flexDir='column'
            w='100%'
            alignItems={navSize === true ? 'flex-start' : 'center'}
        >
            <Menu placement='right'>
                <Link
                    backgroundColor={active && activeColor}
                    p='3'
                    _hover={{
                        textDecor: 'none',
                        backgroundColor: activeColor,
                    }}
                    w={navSize === true && '100%'}
                    as={ReactLink}
                    to={title === 'Logout' ? '#' : pgLink}
                    onClick={
                        title === 'Logout'
                            ? logoutUser
                            : item.subNav && showSubnav
                    }
                >
                    <Flex align='center'>
                        <Icon as={icon} fontSize='xl' />
                        <Text
                            ml={5}
                            display={navSize === true ? 'flex' : 'none'}
                            align='left'
                        >
                            {title}
                        </Text>
                        {subNav && (
                            <Icon
                                as={
                                    trigSubnav
                                        ? iconOpened
                                        : trigSubnav
                                        ? null
                                        : iconClosed
                                }
                                display={subNav !== null}
                                fontSize='xl'
                                ml='auto'
                            />
                        )}
                    </Flex>
                </Link>
                {trigSubnav &&
                    subNav.map((item, index) => {
                        return (
                            <Link
                                backgroundColor={active && activeColor}
                                p='3'
                                pl='7'
                                _hover={{
                                    textDecor: 'none',
                                    backgroundColor: activeColor,
                                }}
                                as={ReactLink}
                                w={navSize === true && '100%'}
                                to={item.pgLink}
                            >
                                <Flex align='center' fontSize={12}>
                                    <Icon as={item.icon} fontSize='xl' />
                                    <Text
                                        ml={5}
                                        display={
                                            navSize === true ? 'flex' : 'none'
                                        }
                                    >
                                        {item.title}
                                    </Text>
                                </Flex>
                            </Link>
                        )
                    })}
            </Menu>
        </Flex>
    )
}
export default NavItem
