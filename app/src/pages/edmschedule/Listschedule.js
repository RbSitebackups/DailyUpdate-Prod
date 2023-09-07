import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../style.css'
import { useAppContext } from '../../context/appContext'
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Flex,
  Heading,
  FormControl,
  InputGroup,
  InputRightAddon,
  Tooltip,
  IconButton,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
} from '@chakra-ui/react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { MdSave } from 'react-icons/md'
import { HiOutlineCalendar } from 'react-icons/hi2'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { FiRefreshCw } from 'react-icons/fi'
import { DialogHelper, AutocompleteHelper, AlertHelper } from '../../components'
import moment from 'moment'

const Listschedule = () => {
  const formattedDate = new Date().toLocaleString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const [isFormVisible, setIsFormVisible] = useState(false)
  const {
    selectedClient,
    isEditing,
    addSchedule,
    edmSchedule,
    getIndSchedule,
    totalEdmSchedules,
    handleDelete,
    showDialog,
    getCampaignSuggestions,
    campaignSuggestions,
    edmSuggestions,
    getEdmSuggestions,
    editSchedule,
    showAlert,
    user,
    getSchedule,
    setSelectedClient,
    userClient,
    getUCSchedule,
    getClients,
    client,
    getUserlist,
    userlist,
    getSchedulesByAssignedId,
  } = useAppContext()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDateEdit, setSelectedDateEdit] = useState(new Date())
  const [campaignTitle, setCampaignTitle] = useState()
  const [edmTitle, setEdmTitle] = useState()
  const [audience, setAudience] = useState()
  const [clientID, setClientID] = useState()
  const [clientIDEdit, setClientIDEdit] = useState()
  const [campaignTitleEdit, setCampaignTitleEdit] = useState()
  const [edmTitleEdit, setEdmTitleEdit] = useState()
  const [audienceEdit, setAudienceEdit] = useState()
  const [linkedEdmEdit, setLinkedEdmEdit] = useState()
  const [editingRowId, setEditingRowId] = useState(null)
  const [isEditingRow, setIsEditingRow] = useState(false)
  const [editedRowId, setEditedRowId] = useState(null)
  const [userClientCond, setUserClientCond] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const toggleFormVisibility = () => {
    setIsFormVisible((prevVisible) => !prevVisible)
  }

  function isWeekday(date) {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }
  const handleMenuItemClick = (user) => {
    setSelectedUser(user)
    getSchedulesByAssignedId(user._id)
  }

  const changeClient = (cID, cName, all) => {
    setSelectedClient(cID, cName)
    // Check if the user is an admin
    if (user.isAdmin && all === 'all') {
      // Trigger getSchedule() if the user is an admin
      getSchedule()
    } else if (!user.isAdmin && all === 'all') {
      // Trigger getUCSchedule() if the user is not an admin
      getUCSchedule()
    } else if (all !== 'all') {
      // Trigger getIndSchedule() if the user is not an admin
      getIndSchedule()
    }
  }

  useEffect(() => {
    // Check if the user is an admin
    if (user.isAdmin) {
      // Trigger getSchedule() if the user is an admin
      getSchedule()
    } else {
      // Trigger getIndSchedule() if the user is not an admin
      getUCSchedule()
    }
    getCampaignSuggestions()
    getEdmSuggestions()
    setSelectedClient('', '')
    getClients()
    getUserlist()
  }, [])

  useEffect(() => {
    if (user.isAdmin) {
      setUserClientCond(client)
    } else {
      setUserClientCond(userClient.assUserClient)
    }
  }, [])

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY - hh:mm a')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newSchedule = {
      campaignTitle,
      edmTitle,
      audience,
      date_to_send: selectedDate,
      clientID,
    }

    addSchedule(newSchedule)
    changeClient(
      selectedClient.ClientID,
      selectedClient.ClientName,
      selectedClient.ClientID === '' ? 'all' : ''
    )
    getCampaignSuggestions()
    getEdmSuggestions()

    setCampaignTitle('')
    setEdmTitle('')
    setAudience('')
    setClientID('')

    if (isEditing) {
      return
    }
  }

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    if (name === 'campaignTitle') {
      setCampaignTitle(value)
    } else if (name === 'edmTitle') {
      setEdmTitle(value)
    } else if (name === 'audience') {
      setAudience(value)
    } else if (name === 'clientID') {
      setClientID(value)
    }
  }

  const handleInlineEdit = (row) => {
    setEditingRowId(row._id)
    setIsEditingRow(true)
    setEditedRowId(row._id)
    setCampaignTitleEdit(row.campaign_title)
    setLinkedEdmEdit(row.linked_edm)
    setEdmTitleEdit(row.edm_title)
    setAudienceEdit(row.audience)
    setClientIDEdit(row.client_id)
    setSelectedDateEdit(new Date(row.date_to_send))
  }

  const handleEditInput = (rowId, field, value) => {
    const rowIndex = edmSchedule.findIndex((row) => row._id === rowId)
    const updatedEdmSchedule = [...edmSchedule]
    updatedEdmSchedule[rowIndex] = {
      ...updatedEdmSchedule[rowIndex],
      [field]: value,
    }

    if (field === 'campaignTitle') {
      setCampaignTitleEdit(value)
    } else if (field === 'edmTitle') {
      setEdmTitleEdit(value)
    } else if (field === 'audience') {
      setAudienceEdit(value)
    } else if (field === 'linkedEdmEdit') {
      setLinkedEdmEdit(value)
    } else if (field === 'clientIDEdit') {
      setClientIDEdit(value)
    }
  }

  const handleSaveEdit = () => {
    const editedSchedule = {
      _id: editingRowId,
      campaign_title: campaignTitleEdit,
      edm_title: edmTitleEdit,
      audience: audienceEdit,
      linked_edm: linkedEdmEdit,
      date_to_send: selectedDateEdit,
      client_id: clientIDEdit,
    }

    editSchedule(editedSchedule)

    // Check if the user is an admin
    if (user.isAdmin) {
      // Trigger getSchedule() if the user is an admin
      getSchedule()
    } else {
      // Trigger getIndSchedule() if the user is not an admin
      getIndSchedule()
    }
    getCampaignSuggestions()
    getEdmSuggestions()

    setIsEditingRow(false)
    setEditedRowId(null)
  }

  return (
    <Box
      p={{ base: 4, md: 8 }}
      bg='gray.50'
      boxShadow='md'
      borderRadius='md'
    >
      {showDialog && <DialogHelper />}
      <VStack
        spacing={4}
        align='stretch'
      >
        <Flex
          justify='space-between'
          w='100%'
        >
          <>
            <Menu
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onOpen={() => setIsOpen(true)}
            >
              <MenuButton
                as={Button}
                rightIcon={isOpen ? <BsChevronUp /> : <BsChevronDown />}
                size='lg'
                fontSize='22px'
                p={0}
                variant='unstyled'
              >
                {selectedClient && selectedClient.ClientName
                  ? selectedClient.ClientName
                  : user.isAdmin
                  ? 'All Clients'
                  : 'My Clients'}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => changeClient('', '', 'all')}>
                  All Clients
                </MenuItem>
                {userClientCond &&
                  userClientCond.map((client) => (
                    <MenuItem
                      key={client._id}
                      onClick={() =>
                        changeClient(
                          client.client_id !== undefined
                            ? client.client_id
                            : client._id,
                          client.client_name
                        )
                      }
                    >
                      {client.client_initials} - {client.client_name}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
          </>
          <Text>
            <strong>Date: {formattedDate}</strong>
          </Text>
        </Flex>
        <Flex justifyContent='space-between'>
          <Flex>
            {!selectedClient.ClientID && user.isAdmin && (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<BsChevronDown />}
                  colorScheme='grey'
                  borderColor='black'
                  borderRadius='50px'
                  variant='outline'
                >
                  {selectedUser
                    ? `${selectedUser.name} ${selectedUser.lastName}`
                    : 'All Account Manager'}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => changeClient('', '', 'all')}>
                    All Account Manager
                  </MenuItem>
                  {userlist &&
                    userlist.map((user) => (
                      <MenuItem
                        key={user._id}
                        onClick={() => handleMenuItemClick(user)}
                      >
                        {user.name} {user.lastName}
                      </MenuItem>
                    ))}
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Flex>
            <Tooltip
              label={isFormVisible ? 'Cancel' : 'Add New'}
              placement='top'
            >
              <IconButton
                onClick={toggleFormVisibility}
                colorScheme='grey'
                borderColor='black'
                borderRadius='50%'
                variant='outline'
                w='28px'
                h='38px'
                size='md'
              >
                {isFormVisible ? (
                  <FaPlus style={{ transform: 'rotate(45deg)' }} />
                ) : (
                  <FaPlus />
                )}
              </IconButton>
            </Tooltip>
          </Flex>
        </Flex>
        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            <Flex gap={8}>
              {selectedClient.ClientName === '' && (
                <FormControl w='20%'>
                  <Select
                    placeholder='Select Client'
                    onChange={handleInput}
                    name='clientID'
                    value={clientID}
                    borderRadius='2'
                  >
                    {userClientCond &&
                      userClientCond.map((client) => (
                        <option
                          key={client.client_id || client._id}
                          value={client.client_id || client._id}
                        >
                          {client.client_initials} - {client.client_name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              )}
              <FormControl w='20%'>
                <InputGroup w='100%'>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    showTimeSelect
                    dateFormat='dd/MM/yyyy hh:mm'
                    timeIntervals={15}
                    timeCaption='Time'
                    filterDate={isWeekday}
                    borderRadius='2'
                    customInput={
                      <Input
                        onChange={handleInput}
                        borderRadius='2'
                        name='date_to_send'
                        w='100%'
                      />
                    }
                  />
                  <InputRightAddon borderRadius='2'>
                    <Icon as={HiOutlineCalendar} />
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl w='30%'>
                <AutocompleteHelper
                  suggestions={campaignSuggestions}
                  mainValue={campaignTitle}
                  callback={setCampaignTitle}
                  placeholder='Enter campaign title'
                  name='campaignTitle'
                />
              </FormControl>
              <FormControl w='25%'>
                <AutocompleteHelper
                  suggestions={edmSuggestions}
                  mainValue={edmTitle}
                  callback={setEdmTitle}
                  placeholder='Enter EDM title'
                  name='edmTitle'
                />
              </FormControl>
              <FormControl w='25%'>
                <Input
                  type='text'
                  placeholder='Enter audience'
                  name='audience'
                  value={audience}
                  onChange={handleInput}
                  borderRadius='2'
                />
              </FormControl>
              <FormControl w='3%'>
                <Button
                  type='submit'
                  colorScheme='teal'
                  borderRadius='2'
                >
                  <Icon as={MdSave} />
                </Button>
              </FormControl>
            </Flex>
          </form>
        )}
        {showAlert && <AlertHelper />}
        <Box mb={4}>
          <TableContainer>
            <Table
              variant='striped'
              colorScheme='blackAlpha'
              borderWidth='1px'
            >
              <Thead
                background='green'
                color='white'
              >
                <Tr>
                  <Th
                    w='5%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    Client
                  </Th>
                  <Th
                    w='15%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    Date & Time
                  </Th>
                  <Th
                    w='15%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    Campaign Title
                  </Th>
                  <Th
                    w='20%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    EDM Title
                  </Th>
                  <Th
                    w='20%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    Audience
                  </Th>
                  <Th
                    w='20%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    Gap from previous
                  </Th>
                  <Th
                    w='5%'
                    whiteSpace='normal'
                  ></Th>
                </Tr>
              </Thead>
              {totalEdmSchedules > 0 ? (
                <Tbody>
                  {edmSchedule.map((row, index) => (
                    <Tr key={index}>
                      <Td
                        whiteSpace='normal'
                        w='5%'
                        align='left'
                      >
                        {isEditingRow && editedRowId === row._id ? (
                          <Select
                            placeholder='Select Client'
                            onChange={handleInput}
                            name='clientIDEdit'
                            value={clientIDEdit}
                            borderRadius='2'
                            background='white'
                            width='100px'
                          >
                            {userClientCond &&
                              userClientCond.map((client) => (
                                <option
                                  key={client.client_id || client._id}
                                  value={client.client_id || client._id}
                                >
                                  {client.client_initials}
                                </option>
                              ))}
                          </Select>
                        ) : (
                          <Text
                            bg={`#${
                              client.find(
                                (clientFind) => clientFind._id === row.client_id
                              )?.bgcolor || 'gray.300'
                            }`}
                            pt='5px'
                            pb='5px'
                            mb='5px'
                            textAlign='center'
                            borderRadius='100px'
                          >
                            {client.find(
                              (clientFind) => clientFind._id === row.client_id
                            )?.client_initials || 'N/A'}
                          </Text>
                        )}
                      </Td>
                      <Td
                        w='15%'
                        align='left'
                        whiteSpace='normal'
                      >
                        {isEditingRow && editedRowId === row._id ? (
                          <DatePicker
                            selected={selectedDateEdit}
                            onChange={(date) => setSelectedDateEdit(date)}
                            showTimeSelect
                            dateFormat='dd/MM/yyyy hh:mm'
                            timeIntervals={15}
                            timeCaption='Time'
                            filterDate={isWeekday}
                            customInput={
                              <Input
                                onChange={handleInput}
                                borderRadius='2'
                                name='date_to_send'
                                w='100%'
                                bg='white'
                              />
                            }
                          />
                        ) : (
                          <strong>{formatDate(row.date_to_send)}</strong>
                        )}
                      </Td>
                      <Td
                        w='15%'
                        whiteSpace='normal'
                      >
                        {isEditingRow && editedRowId === row._id ? (
                          <Input
                            type='text'
                            placeholder='Enter Campaign title'
                            name='campaignTitle'
                            borderRadius='2'
                            value={campaignTitleEdit}
                            bg='white'
                            onChange={(e) =>
                              handleEditInput(
                                row._id,
                                e.target.name,
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          row.campaign_title
                        )}
                      </Td>
                      <Td
                        w='20%'
                        whiteSpace='normal'
                      >
                        {isEditingRow && editedRowId === row._id ? (
                          <Input
                            type='text'
                            placeholder='Enter EDM title'
                            name='edmTitle'
                            borderRadius='2'
                            value={edmTitleEdit}
                            bg='white'
                            onChange={(e) =>
                              handleEditInput(
                                row._id,
                                e.target.name,
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          row.edm_title
                        )}
                      </Td>
                      <Td
                        w='20%'
                        whiteSpace='normal'
                      >
                        {isEditingRow && editedRowId === row._id ? (
                          <Input
                            type='text'
                            placeholder='Enter audience'
                            name='audience'
                            borderRadius='2'
                            value={audienceEdit}
                            bg='white'
                            onChange={(e) =>
                              handleEditInput(
                                row._id,
                                e.target.name,
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          row.audience
                        )}
                      </Td>
                      <Td
                        w='20%'
                        whiteSpace='normal'
                      >
                        {isEditingRow && editedRowId === row._id ? (
                          <Select
                            bg='white'
                            placeholder='Select option'
                            name='linkedEdmEdit'
                            value={linkedEdmEdit}
                            onChange={(e) =>
                              handleEditInput(
                                row._id,
                                e.target.name,
                                e.target.value
                              )
                            }
                          >
                            <option value='null'>None</option>
                            {edmSchedule
                              .filter((row3) => row._id !== row3._id) // Filter out rows with the same _id
                              .map((row3, index) => (
                                <option
                                  key={index}
                                  value={row3._id}
                                >
                                  {row3.campaign_title} - {row3.edm_title}
                                </option>
                              ))}
                          </Select>
                        ) : (
                          <>
                            {edmSchedule.map((row2, index) => {
                              if (row.linked_edm === row2._id) {
                                const date1 = new Date(row2.date_to_send)
                                const date2 = new Date(row.date_to_send)

                                // Calculate the time difference in milliseconds
                                const timeDifference = date2 - date1

                                // Calculate the calendar days difference
                                const calendarDaysDifference = Math.floor(
                                  timeDifference / (1000 * 60 * 60 * 24)
                                )

                                // Calculate the business days difference (excluding weekends)

                                let businessDays = 0
                                const currentDate = new Date(date1)

                                while (currentDate <= date2) {
                                  const dayOfWeek = currentDate.getDay()
                                  if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                                    businessDays++
                                  }
                                  currentDate.setDate(currentDate.getDate() + 1)
                                }

                                // Calculate the weeks difference
                                const weeksDifference = Math.floor(
                                  calendarDaysDifference / 7
                                )

                                return (
                                  <span key={index}>
                                    <strong>
                                      {businessDays} BD |{' '}
                                      {calendarDaysDifference} CD |{' '}
                                      {weeksDifference} weeks
                                    </strong>{' '}
                                    <br />
                                    {row2.campaign_title} - {row2.edm_title}
                                  </span>
                                )
                              }
                              return null
                            })}
                          </>
                        )}
                      </Td>
                      <Td
                        w='5%'
                        textAlign='right'
                      >
                        {isEditingRow && editedRowId === row._id ? (
                          <>
                            <Tooltip
                              label='Save'
                              placement='top'
                            >
                              <IconButton
                                colorScheme='teal'
                                size='sm'
                                onClick={handleSaveEdit}
                              >
                                <Icon as={MdSave} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              label='Cancel'
                              placement='top'
                            >
                              <IconButton
                                colorScheme='whatsapp'
                                size='sm'
                                variant='outline'
                                onClick={() => {
                                  setIsEditingRow(false)
                                  setEditedRowId(null)
                                }}
                                ml={2}
                              >
                                <Icon as={FiRefreshCw} />
                              </IconButton>
                            </Tooltip>
                          </>
                        ) : (
                          <Menu>
                            <MenuButton
                              as={Button}
                              rightIcon={<BsChevronDown />}
                              colorScheme='blue'
                              size='xs'
                              variant='outline'
                            >
                              Actions
                            </MenuButton>
                            <MenuList>
                              <MenuItem
                                _hover={{ bg: 'blue.100', color: 'blue.900' }}
                                onClick={() => handleInlineEdit(row)}
                              >
                                <Icon
                                  as={FaEdit}
                                  mr='10px'
                                />{' '}
                                Edit
                              </MenuItem>
                              <MenuItem
                                _hover={{ bg: 'red.100', color: 'red.900' }}
                                onClick={() =>
                                  handleDelete(
                                    row._id,
                                    'schedule',
                                    getIndSchedule
                                  )
                                }
                              >
                                <Icon
                                  mr='10px'
                                  as={FaTrash}
                                />{' '}
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              ) : (
                <Tbody>
                  <Tr>
                    <Td
                      colSpan={6}
                      textAlign='center'
                    >
                      <Text>No records found</Text>
                    </Td>
                  </Tr>
                </Tbody>
              )}
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </Box>
  )
}

export { Listschedule }
