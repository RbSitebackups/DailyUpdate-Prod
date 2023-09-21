import React, { useState } from 'react'

import { Heading, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

const DropdownHeading = ({ selectedClient, allClients, onSelectClient }) => {
  const allClientsData = allClients.assUserClient
  console.log(allClientsData)
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectClient = (client) => {
    onSelectClient(client)
    setIsOpen(false)
  }

  return (
    <>
      <Menu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <MenuButton
          as={Heading}
          size='lg'
          mb={4}
        >
          {selectedClient.ClientName
            ? selectedClient.ClientName
            : 'All Clients'}
        </MenuButton>
        <MenuList>
          <MenuItem
            key=''
            onClick={() => handleSelectClient({})}
          >
            All Clients
          </MenuItem>
          {allClientsData.map((client) => (
            <MenuItem
              key={client._id}
              onClick={() => handleSelectClient(client)}
            >
              {client.client_initials}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {allClientsData.map((client) => client.client_initials)}
    </>
  )
}

export default DropdownHeading
