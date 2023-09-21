import { Flex, Icon, Menu, Link, Text, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import '../style.css'

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
  const iconCenteredClass = navSize === true ? '' : 'centered-icon'
  const fColor = active ? '#000' : '#fff'

  return (
    <Flex
      flexDir='column'
      w='100%'
      alignItems={navSize === true ? 'flex-start' : 'center'}
    >
      <Menu placement='right'>
        <Tooltip
          label={title} // Set the tooltip label to the title
          isDisabled={navSize === true} // Disable tooltip when navSize is true
          placement='right' // Set the tooltip placement
          fontSize='md'
        >
          <Link
            bg={active ? activeColor : 'transparent'}
            p='3'
            _hover={{
              textDecor: 'none',
              bg: activeColor,
              color: fColor,
            }}
            w={'100%'}
            as={ReactLink}
            to={title === 'Logout' ? '#' : pgLink}
            onClick={
              title === 'Logout' ? logoutUser : item.subNav && showSubnav
            }
          >
            <Flex
              align='center'
              justifyContent={navSize === true ? '' : 'center'}
            >
              <Icon
                as={icon}
                fontSize='xl'
                className={iconCenteredClass}
                color={fColor}
              />
              <Text
                ml={5}
                display={navSize === true ? 'flex' : 'none'}
                align='left'
                color={fColor}
              >
                {title}
              </Text>
              {subNav && (
                <Icon
                  as={trigSubnav ? iconOpened : trigSubnav ? null : iconClosed}
                  display={
                    subNav !== null && navSize === true ? 'flex' : 'none'
                  }
                  fontSize='xl'
                  ml='auto'
                />
              )}
            </Flex>
          </Link>
        </Tooltip>
        {trigSubnav &&
          subNav.map((item, index) => {
            return (
              <Tooltip
                label={item.title} // Set the tooltip label to the sub-menu item title
                isDisabled={navSize === true} // Disable tooltip when navSize is true
                placement='right' // Set the tooltip placement
              >
                <Link
                  bg={active ? activeColor : '#3d3d3d'}
                  p='3'
                  pl='7'
                  _hover={{
                    textDecor: 'none',
                    bg: activeColor,
                  }}
                  as={ReactLink}
                  w={'100%'}
                  to={item.pgLink}
                >
                  <Flex
                    align='center'
                    fontSize={12}
                  >
                    <Icon
                      as={item.icon}
                      fontSize='xl'
                      className={iconCenteredClass}
                    />
                    <Text
                      ml={5}
                      display={navSize === true ? 'flex' : 'none'}
                    >
                      {item.title}
                    </Text>
                  </Flex>
                </Link>
              </Tooltip>
            )
          })}
      </Menu>
    </Flex>
  )
}

export default NavItem
