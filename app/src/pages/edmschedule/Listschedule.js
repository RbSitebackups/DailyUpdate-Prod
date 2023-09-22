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
  Select as ChakraSelect,
  Grid,
} from '@chakra-ui/react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { MdSave } from 'react-icons/md'
import { HiOutlineCalendar } from 'react-icons/hi2'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { FiRefreshCw } from 'react-icons/fi'
import {
  DialogHelper,
  AutocompleteHelper,
  AlertHelper,
  CustomSelect,
} from '../../components'
import moment from 'moment'
import Select from 'react-select'
import { SlRefresh } from 'react-icons/sl'

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
    getCampaigns,
    campaigns,
  } = useAppContext()

  const [selectedDate, setSelectedDate] = useState()
  const [selectedDateEdit, setSelectedDateEdit] = useState()
  const [edmTitle, setEdmTitle] = useState()
  const [audience, setAudience] = useState()
  const [clientID, setClientID] = useState()
  const [clientIDEdit, setClientIDEdit] = useState()
  const [campaignIDEdit, setCampaignIDEdit] = useState()
  const [edmTitleEdit, setEdmTitleEdit] = useState()
  const [audienceEdit, setAudienceEdit] = useState()
  const [linkedEdmEdit, setLinkedEdmEdit] = useState()
  const [status, setStatus] = useState()
  const [statusEdit, setStatusEdit] = useState()
  const [editingRowId, setEditingRowId] = useState(null)
  const [isEditingRow, setIsEditingRow] = useState(false)
  const [editedRowId, setEditedRowId] = useState(null)
  const [userClientCond, setUserClientCond] = useState([])
  const [isFirstMenuOpen, setIsFirstMenuOpen] = useState(false)
  const [isSecondMenuOpen, setIsSecondMenuOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [campaignID, setCampaignID] = useState(null)
  const lsUserClient = JSON.parse(localStorage.getItem('userClient'))
  const [filteredCampaigns, setFilteredCampaigns] = useState([])

  // Function to filter campaigns based on client
  const filterCampaignsByClient = (clientIdToFilter) => {
    if (clientIdToFilter) {
      const filtered = campaigns.filter(
        (campaign) => campaign.client_id === clientIdToFilter
      )
      setFilteredCampaigns(filtered)
    } else {
      setFilteredCampaigns(campaigns) // Display all campaigns if no client is selected
    }
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '1px solid #E2E8F0',
      boxShadow: state.isFocused ? '0 0 0 1px #3182ce' : '',
      borderRadius: '2px',
      padding: '0.1rem',
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#1A202C',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      backgroundColor: 'inherit',
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: state.isSelected
        ? '#3182ce'
        : state.isFocused
        ? '#EBF8FF'
        : '',

      padding: '0.5rem 1rem',
    }),
  }

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
    if (cID) {
      filterCampaignsByClient(cID) // Trigger filter function
    }
    // Check if the user is an admin
    if (user.isAdmin && all === 'all') {
      // Trigger getSchedule() if the user is an admin
      getSchedule()
    } else if (!user.isAdmin && all === 'all') {
      // Trigger getUCSchedule() if the user is not an admin
      getUCSchedule(lsUserClient.assUserClient)
    } else if (all !== 'all') {
      // Trigger getIndSchedule() if the user is not an admin
      getIndSchedule()
    }
  }

  const pageLoadData = () => {
    // Check if the user is an admin
    if (user.isAdmin) {
      // Trigger getSchedule() if the user is an admin
      getSchedule()
    } else {
      // Trigger getUCSchedule(lsUserClient.assUserClient) if the user is not an admin
      setTimeout(() => {
        getUCSchedule(lsUserClient.assUserClient)
      }, 500)
    }
    getCampaignSuggestions()
    getEdmSuggestions()
  }

  useEffect(() => {
    pageLoadData()
    setSelectedClient('', '')
    getClients()
    getUserlist()
    getCampaigns()
    setFilteredCampaigns(campaigns)
  }, [])

  useEffect(() => {
    if (user.isAdmin) {
      setUserClientCond(client)
    } else {
      setUserClientCond(lsUserClient.assUserClient)
    }
  }, [user, client])

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY [\r\n]hh:mm a')
  }
  const handleChange = (v) => {
    setCampaignID(v.value)
  }
  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    if (name === 'edmTitle') {
      setEdmTitle(value)
    } else if (name === 'audience') {
      setAudience(value)
    } else if (name === 'clientID') {
      setClientID(value)
      filterCampaignsByClient(value) // Trigger filter function
    } else if (name === 'status') {
      setStatus(value)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const newSchedule = {
      campaignID,
      edmTitle,
      audience,
      date_to_send: selectedDate,
      clientID,
      status,
    }

    addSchedule(newSchedule)
    changeClient(
      selectedClient.ClientID,
      selectedClient.ClientName,
      selectedClient.ClientID === '' ? 'all' : ''
    )
    getCampaignSuggestions()
    getEdmSuggestions()

    setCampaignID('')
    setEdmTitle('')
    setAudience('')
    setClientID('')

    if (isEditing) {
      return
    }
  }

  const handleInlineEdit = (row) => {
    setIsEditingRow(true)
    setEditingRowId(row._id)
    setEditedRowId(row._id)
    setCampaignIDEdit(row.campaign_id)
    setLinkedEdmEdit(row.linked_edm)
    setEdmTitleEdit(row.edm_title)
    setAudienceEdit(row.audience)
    setClientIDEdit(row.client_id)
    setStatusEdit(row.status)
    setSelectedDateEdit(new Date(row.date_to_send))
  }

  const handleChangeEdit = (v) => {
    setCampaignIDEdit(v.value)
  }
  const handleEditInput = (rowId, field, value) => {
    const rowIndex = edmSchedule.findIndex((row) => row._id === rowId)
    const updatedEdmSchedule = [...edmSchedule]
    updatedEdmSchedule[rowIndex] = {
      ...updatedEdmSchedule[rowIndex],
      [field]: value,
    }

    if (field === 'edmTitle') {
      setEdmTitleEdit(value)
    } else if (field === 'audience') {
      setAudienceEdit(value)
    } else if (field === 'linkedEdmEdit') {
      setLinkedEdmEdit(value)
    } else if (field === 'clientIDEdit') {
      setClientIDEdit(value)
    } else if (field === 'statusEdit') {
      setStatusEdit(value)
    }
  }

  const handleSaveEdit = () => {
    const editedSchedule = {
      _id: editingRowId,
      campaign_id: campaignIDEdit,
      edm_title: edmTitleEdit,
      audience: audienceEdit,
      linked_edm: linkedEdmEdit,
      date_to_send: selectedDateEdit,
      client_id: clientIDEdit,
      status: statusEdit,
    }

    editSchedule(editedSchedule)

    pageLoadData()

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
          <Heading>EDM Schedule</Heading>
          <Text>
            <strong>Date: {formattedDate}</strong>
          </Text>
        </Flex>
        <Flex justifyContent='space-between'>
          <Flex>
            <Menu
              isOpen={isFirstMenuOpen}
              onClose={() => setIsFirstMenuOpen(false)}
              onOpen={() => setIsFirstMenuOpen(true)}
            >
              <MenuButton
                rightIcon={
                  isFirstMenuOpen ? <BsChevronUp /> : <BsChevronDown />
                }
                as={Button}
                colorScheme='grey'
                borderColor='black'
                borderRadius='50px'
                variant='outline'
                mr='10px'
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
                  userClientCond.map((clientLs) => (
                    <MenuItem
                      key={clientLs._id}
                      onClick={() =>
                        changeClient(
                          clientLs.client_id !== undefined
                            ? clientLs.client_id
                            : clientLs._id,
                          clientLs.client_name
                        )
                      }
                    >
                      {clientLs.client_initials} - {clientLs.client_name}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
            {!selectedClient.ClientID && user.isAdmin && (
              <Menu
                isOpen={isSecondMenuOpen}
                onClose={() => setIsSecondMenuOpen(false)}
                onOpen={() => setIsSecondMenuOpen(true)}
              >
                <MenuButton
                  rightIcon={
                    isSecondMenuOpen ? <BsChevronUp /> : <BsChevronDown />
                  }
                  as={Button}
                  colorScheme='grey'
                  borderColor='black'
                  borderRadius='50px'
                  variant='outline'
                  mr='10px'
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
            <Tooltip
              label='Reload'
              placement='top'
            >
              <IconButton
                colorScheme='grey'
                borderColor='black'
                borderRadius='50%'
                variant='outline'
                onClick={() => pageLoadData()}
              >
                <SlRefresh />
              </IconButton>
            </Tooltip>
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
            <Flex gap={4}>
              {selectedClient.ClientName === '' && (
                <FormControl w='13%'>
                  <ChakraSelect
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
                  </ChakraSelect>
                </FormControl>
              )}
              <FormControl w='25%'>
                <Select
                  placeholder='Select campaign'
                  isSearchable={true}
                  name='campaignID'
                  options={
                    filteredCampaigns &&
                    filteredCampaigns.map((campaign) => ({
                      label: campaign.campaign_title,
                      value: campaign._id,
                    }))
                  }
                  onChange={handleChange}
                  styles={customStyles}
                />
              </FormControl>
              <FormControl w='25%'>
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
                    placeholderText='EDM Blast Date'
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

              <FormControl w='21%'>
                <AutocompleteHelper
                  suggestions={edmSuggestions}
                  mainValue={edmTitle}
                  callback={setEdmTitle}
                  placeholder='EDM title'
                  name='edmTitle'
                />
              </FormControl>
              <FormControl w='18%'>
                <Input
                  type='text'
                  placeholder='Audience'
                  name='audience'
                  value={audience}
                  onChange={handleInput}
                  borderRadius='2'
                />
              </FormControl>
              <FormControl w='11%'>
                <CustomSelect
                  placeholder='Status'
                  name='status'
                  value={status}
                  options={['EDM Sent', 'EDM Drafted', 'EDM Scheduled']}
                  onValueChange={(value) => setStatus(value)}
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
          <>
            <Table
              variant='striped'
              colorScheme='blackAlpha'
              borderWidth='1px'
            >
              <Thead
                bg='darkslategray'
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
                    w='12%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    Date & Time
                  </Th>
                  <Th
                    w='20%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    Campaign Title
                  </Th>
                  <Th
                    w='15%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    EDM Title
                  </Th>
                  <Th
                    w='15%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    Audience
                  </Th>
                  <Th
                    w='10%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    Status
                  </Th>
                  <Th
                    w='15%'
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
                        align='left'
                      >
                        {isEditingRow && editedRowId === row._id ? (
                          <ChakraSelect
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
                          </ChakraSelect>
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
                          <Text whiteSpace='pre'>
                            {formatDate(row.date_to_send)}
                          </Text>
                        )}
                      </Td>
                      <Td whiteSpace='normal'>
                        {isEditingRow && editedRowId === row._id ? (
                          <Select
                            placeholder='Select campaign'
                            isSearchable={true}
                            name='campaignID'
                            options={campaigns.map((campaign) => ({
                              label: campaign.campaign_title,
                              value: campaign._id,
                            }))}
                            onChange={(selected) => handleChangeEdit(selected)}
                            value={
                              campaigns &&
                              campaigns
                                .map((campaign) => ({
                                  label: campaign.campaign_title,
                                  value: campaign._id,
                                }))
                                .find((opt) => opt.value === campaignIDEdit)
                            }
                          />
                        ) : (
                          <Text>
                            {(campaigns &&
                              campaigns.find(
                                (campaignFind) =>
                                  campaignFind._id === row.campaign_id
                              )?.campaign_title) ||
                              'N/A'}
                          </Text>
                        )}
                      </Td>
                      <Td whiteSpace='normal'>
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
                      <Td whiteSpace='normal'>
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
                      <Td>
                        {isEditingRow && editedRowId === row._id ? (
                          <CustomSelect
                            placeholder='Status'
                            name='statusEdit'
                            value={statusEdit}
                            options={[
                              'EDM Sent',
                              'EDM Drafted',
                              'EDM Scheduled',
                            ]}
                            onValueChange={(value) => setStatusEdit(value)}
                            bg='white'
                          />
                        ) : (
                          row.status && row.status
                        )}
                      </Td>
                      <Td whiteSpace='normal'>
                        {isEditingRow && editedRowId === row._id ? (
                          <ChakraSelect
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
                            <option value='none'>None</option>
                            {edmSchedule
                              .filter((row3) => row._id !== row3._id)
                              .map((row3, index) => (
                                <option
                                  key={index}
                                  value={row3._id}
                                >
                                  [
                                  {client.find(
                                    (clientFind) =>
                                      clientFind._id === row3.client_id
                                  )?.client_initials || 'N/A'}
                                  ] {row3.campaign_title} - {row3.edm_title}
                                </option>
                              ))}
                          </ChakraSelect>
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
                                  <Text key={index}>
                                    <strong>
                                      {businessDays} BD |{' '}
                                      {calendarDaysDifference} CD |{' '}
                                      {weeksDifference} weeks
                                    </strong>{' '}
                                    <br />
                                    <Text
                                      fontSize='13px'
                                      color='gray.400'
                                    >
                                      [
                                      {client.find(
                                        (clientFind) =>
                                          clientFind._id === row2.client_id
                                      )?.client_initials || 'N/A'}
                                      ] {row2.campaign_title} - {row2.edm_title}
                                    </Text>
                                  </Text>
                                )
                              }
                              return null
                            })}
                          </>
                        )}
                      </Td>
                      <Td textAlign='right'>
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
                      colSpan={8}
                      textAlign='center'
                    >
                      <Text>No records found</Text>
                    </Td>
                  </Tr>
                </Tbody>
              )}
            </Table>
          </>
        </Box>
      </VStack>
    </Box>
  )
}

export { Listschedule }
