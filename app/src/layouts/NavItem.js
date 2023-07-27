import {
    Flex,
    Icon,
    Menu,
    Link,
    MenuButton,
    Text,
    Grid,
    GridItem,
} from '@chakra-ui/react'
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
                    <MenuButton w='100%'>
                        <Grid templateColumns='20px 1fr 1fr'>
                            <GridItem justifySelf='start'>
                                <Icon as={icon} fontSize='xl' />
                            </GridItem>
                            <GridItem>
                                <Text
                                    ml={5}
                                    display={navSize === true ? 'flex' : 'none'}
                                    align='left'
                                >
                                    {title}
                                </Text>
                            </GridItem>
                            {subNav && (
                                <GridItem justifySelf='end'>
                                    <Icon
                                        mr={0}
                                        alignItems='flex-end'
                                        as={
                                            trigSubnav
                                                ? iconOpened
                                                : trigSubnav
                                                ? null
                                                : iconClosed
                                        }
                                        display={subNav !== null}
                                        fontSize='xl'
                                    />
                                </GridItem>
                            )}
                        </Grid>
                    </MenuButton>
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
                                <MenuButton w='100%' fontSize={12}>
                                    <Grid templateColumns='15px 1fr'>
                                        <GridItem justifySelf='start'>
                                            <Icon
                                                as={item.icon}
                                                fontSize='xl'
                                            />
                                        </GridItem>
                                        <GridItem>
                                            <Text
                                                ml={5}
                                                display={
                                                    navSize === true
                                                        ? 'flex'
                                                        : 'none'
                                                }
                                            >
                                                {item.title}
                                            </Text>
                                        </GridItem>
                                    </Grid>
                                </MenuButton>
                            </Link>
                        )
                    })}
            </Menu>
        </Flex>
    )
}
export default NavItem
