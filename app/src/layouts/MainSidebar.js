import { Flex, Image } from '@chakra-ui/react'
import React from 'react'

import NavItem from './NavItem'

import linkitems from './linkitems'
import userlinkitems from './userlinkitems'
import { useAppContext } from '../context/appContext'

const MainSidebar = ({ navSize }) => {
  const { logoutUser, user } = useAppContext()

  return (
    <Flex
      pos='sticky'
      left='0'
      boxShadow='0 4px 12px 0 rgba(0,0,0,0.5)'
      w={navSize === true ? '250px' : '75px'}
      flexDir='column'
      justifyContent='space-between'
      bg='blackAlpha.800'
      color='white'
    >
      <Flex
        flexDir='column'
        alignItems='start'
        as='nav'
      >
        {user.isAdmin ? (
          linkitems.length > 0 ? (
            linkitems.map((item, index) => {
              const { title, icon, pgLink, iconOpened, iconClosed, subNav } =
                item
              return (
                <NavItem
                  navSize={navSize}
                  icon={icon}
                  title={title}
                  pgLink={pgLink}
                  item={item}
                  key={index}
                  iconOpened={iconOpened}
                  iconClosed={iconClosed}
                  subNav={subNav}
                  logoutUser={logoutUser}
                />
              )
            })
          ) : (
            <p>No items to display</p>
          )
        ) : userlinkitems.length > 0 ? (
          userlinkitems.map((item, index) => {
            const { title, icon, pgLink, iconOpened, iconClosed, subNav } = item
            return (
              <NavItem
                navSize={navSize}
                icon={icon}
                title={title}
                pgLink={pgLink}
                item={item}
                key={index}
                iconOpened={iconOpened}
                iconClosed={iconClosed}
                subNav={subNav}
                logoutUser={logoutUser}
              />
            )
          })
        ) : (
          <p>No items to display</p>
        )}
      </Flex>
      <Flex
        p='5%'
        flexDir='column'
        w='100%'
        alignItems={navSize === true ? 'flex-start' : 'center'}
        mb='4'
      >
        {/* <Divider display={navSize === true ? 'flex' : 'none'} />
                <Flex mt={4} align='center'>
                    <Avatar size='sm' />
                    <Flex
                        flexDir='column'
                        ml={4}
                        display={navSize === true ? 'flex' : 'none'}
                    >
                        <Heading as='h2' size='sm'>
                            {user.displayName}
                        </Heading>
                        <Text>{user.isAdmin === true ? 'Admin' : 'User'}</Text>
                    </Flex>
                </Flex> */}
      </Flex>
    </Flex>
  )
}
export default MainSidebar
