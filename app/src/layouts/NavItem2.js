import { Flex, Icon, Link, Menu, MenuButton, Text } from '@chakra-ui/react'
import React from 'react'

const NavItem = ({ navSize, icon, title, active, pgLink }) => {
    return (
        <Flex
            flexDir='column'
            w='100%'
            alignItems={navSize === true ? 'flex-start' : 'center'}
        >
            <Menu placement='right'>
                <Link
                    backgroundColor={active && '#336699'}
                    p='3'
                    _hover={{
                        textDecor: 'none',
                        backgroundColor: '#336699',
                    }}
                    w={navSize === true && '100%'}
                    href={pgLink}
                >
                    <MenuButton w='100%'>
                        <Flex>
                            <Icon as={icon} fontSize='xl' />
                            <Text
                                ml={5}
                                display={navSize === true ? 'flex' : 'none'}
                            >
                                {title}
                            </Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}
export default NavItem
