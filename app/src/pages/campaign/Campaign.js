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
  Grid,
} from '@chakra-ui/react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { MdSave } from 'react-icons/md'
import { HiOutlineCalendar } from 'react-icons/hi2'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { FiRefreshCw } from 'react-icons/fi'
import { SlRefresh } from 'react-icons/sl'
import { DialogHelper, AutocompleteHelper, AlertHelper } from '../../components'
import moment from 'moment'

const Campaign = () => {
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
    addCampaign,
    campaigns,
    getIndCampaign,
    totalCampaigns,
    handleDelete,
    showDialog,
    getCampaignSuggestions,
    campaignSuggestions,
    edmSuggestions,
    getEdmSuggestions,
    editCampaign,
    showAlert,
    user,
    getCampaigns,
    setSelectedClient,
    userClient,
    getUCCampaign,
    getClients,
    client,
    getUserlist,
    userlist,
    getCampaignByAssignedId,
    getSocial,
    getSchedule,
    edmSchedule,
    socials,
  } = useAppContext()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDateEdit, setSelectedDateEdit] = useState(new Date())
  const [campaignTitle, setCampaignTitle] = useState()
  const [campaign_desc, setCampaign_desc] = useState()
  const [clientID, setClientID] = useState()
  const [clientIDEdit, setClientIDEdit] = useState()
  const [campaignTitleEdit, setCampaignTitleEdit] = useState()
  const [campaignDescEdit, setCampaignDescEdit] = useState()
  const [editingRowId, setEditingRowId] = useState(null)
  const [isEditingRow, setIsEditingRow] = useState(false)
  const [editedRowId, setEditedRowId] = useState(null)
  const [userClientCond, setUserClientCond] = useState([])
  const [isFirstMenuOpen, setIsFirstMenuOpen] = useState(false)
  const [isSecondMenuOpen, setIsSecondMenuOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const lsUserClient = JSON.parse(localStorage.getItem('userClient'))
  const [visibleRows, setVisibleRows] = useState({})
  const [campaignStartDate, setCampaignStartDate] = useState(null)
  const [campaignEndDate, setCampaignEndDate] = useState(null)
  const [campaignEventDate, setCampaignEventDate] = useState(null)
  const [campaignStartDateEdit, setCampaignStartDateEdit] = useState(null)
  const [campaignEndDateEdit, setCampaignEndDateEdit] = useState(null)
  const [campaignEventDateEdit, setCampaignEventDateEdit] = useState(null)

  const toggleBottomRow = (rowId) => {
    setVisibleRows({
      ...visibleRows,
      [rowId]: !visibleRows[rowId],
    })
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
    getCampaignByAssignedId(user._id)
  }

  const changeClientforCampaign = (cID, cName, all) => {
    setSelectedClient(cID, cName)
    // Check if the user is an admin
    if (user.isAdmin && all === 'all') {
      // Trigger getCampaigns() if the user is an admin
      getCampaigns()
    } else if (!user.isAdmin && all === 'all') {
      // Trigger getUCCampaign() if the user is not an admin
      getUCCampaign(lsUserClient.assUserClient)
    } else if (all !== 'all') {
      // Trigger getIndCampaign() if the user is not an admin
      getIndCampaign()
    }
  }

  const pageLoadData = () => {
    setTimeout(() => {
      // Check if the user is an admin
      if (user.isAdmin) {
        // Trigger getCampaigns() if the user is an admin
        getCampaigns()
      } else {
        // Trigger getUCCampaign(lsUserClient.assUserClient) if the user is not an admin
        getUCCampaign(lsUserClient.assUserClient)
      }
    }, 500)
    getCampaignSuggestions()
    getEdmSuggestions()
    getSocial()
    getSchedule()
  }

  useEffect(() => {
    pageLoadData()
    setSelectedClient('', '')
    getClients()
    getUserlist()
  }, [])

  const initialPageLoad = () => {
    if (user.isAdmin) {
      setUserClientCond(client)
    } else {
      setUserClientCond(lsUserClient.assUserClient)
    }
  }

  useEffect(() => {
    initialPageLoad()
  }, [user, client])

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY [\r\n]hh:mm a')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newSchedule = {
      campaignTitle,
      campaign_desc,
      clientID,
      campaignStartDate,
      campaignEndDate,
      campaignEventDate,
    }

    addCampaign(newSchedule)
    changeClientforCampaign(
      selectedClient.ClientID,
      selectedClient.ClientName,
      selectedClient.ClientID === '' ? 'all' : ''
    )
    getCampaignSuggestions()
    getEdmSuggestions()

    setCampaignTitle('')
    setCampaign_desc('')
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
    } else if (name === 'campaign_desc') {
      setCampaign_desc(value)
    } else if (name === 'clientID') {
      setClientID(value)
    }
  }

  const handleInlineEdit = (row) => {
    setEditingRowId(row._id)
    setIsEditingRow(true)
    setEditedRowId(row._id)
    setCampaignTitleEdit(row.campaign_title)
    setCampaignDescEdit(row.campaign_desc)
    setClientIDEdit(row.client_id)
    setCampaignStartDateEdit(
      row.campaign_startdate && new Date(row.campaign_startdate)
    )
    setCampaignEndDateEdit(
      row.campaign_enddate && new Date(row.campaign_enddate)
    )
    setCampaignEventDateEdit(
      row.campaign_eventdate && new Date(row.campaign_eventdate)
    )
  }

  const handleEditInput = (rowId, field, value) => {
    const rowIndex = campaigns.findIndex((row) => row._id === rowId)
    const updatedCampaigns = [...campaigns]
    updatedCampaigns[rowIndex] = {
      ...updatedCampaigns[rowIndex],
      [field]: value,
    }

    if (field === 'campaignTitle') {
      setCampaignTitleEdit(value)
    } else if (field === 'campaignDescEdit') {
      setCampaignDescEdit(value)
    } else if (field === 'clientIDEdit') {
      setClientIDEdit(value)
    }
  }

  const handleSaveEdit = () => {
    const editedCampaign = {
      _id: editingRowId,
      campaign_title: campaignTitleEdit,
      campaign_desc: campaignDescEdit,
      client_id: clientIDEdit,
      campaignStartDate: campaignStartDateEdit,
      campaignEndDate: campaignEndDateEdit,
      campaignEventDate: campaignEventDateEdit,
    }

    editCampaign(editedCampaign)

    pageLoadData()

    setIsEditingRow(false)
    setEditedRowId(null)
  }

  const i = 0

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
          <Heading>Campaign Management</Heading>
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
                <MenuItem
                  onClick={() => changeClientforCampaign('', '', 'all')}
                >
                  All Clients
                </MenuItem>
                {userClientCond &&
                  userClientCond.map((clientLs) => (
                    <MenuItem
                      key={clientLs._id}
                      onClick={() =>
                        changeClientforCampaign(
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
                  <MenuItem
                    onClick={() => changeClientforCampaign('', '', 'all')}
                  >
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
            <Flex gap={8}>
              {selectedClient.ClientName === '' && (
                <FormControl w='10%'>
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
                <AutocompleteHelper
                  suggestions={campaignSuggestions}
                  mainValue={campaignTitle}
                  callback={setCampaignTitle}
                  placeholder='Enter campaign title'
                  name='campaignTitle'
                />
              </FormControl>

              <FormControl w='15%'>
                <Input
                  type='text'
                  placeholder='Description'
                  name='campaign_desc'
                  value={campaign_desc}
                  onChange={handleInput}
                  borderRadius='2'
                />
              </FormControl>
              <FormControl w='15%'>
                <InputGroup w='100%'>
                  <DatePicker
                    selected={campaignStartDate}
                    onChange={(date) => setCampaignStartDate(date)}
                    dateFormat='dd/MM/yyyy'
                    filterDate={isWeekday}
                    placeholderText='Campaign start date'
                    customInput={
                      <Input
                        onChange={handleInput}
                        borderRadius='2'
                        name='campaign_startdate'
                        w='100%'
                      />
                    }
                  />
                  <InputRightAddon borderRadius='2'>
                    <Icon as={HiOutlineCalendar} />
                  </InputRightAddon>
                </InputGroup>
              </FormControl>

              <FormControl w='15%'>
                <InputGroup w='100%'>
                  <DatePicker
                    selected={campaignEndDate}
                    onChange={(date) => setCampaignEndDate(date)}
                    dateFormat='dd/MM/yyyy'
                    filterDate={isWeekday}
                    placeholderText='Campaign end date'
                    customInput={
                      <Input
                        onChange={handleInput}
                        borderRadius='2'
                        name='campaign_enddate'
                        w='100%'
                      />
                    }
                  />
                  <InputRightAddon borderRadius='2'>
                    <Icon as={HiOutlineCalendar} />
                  </InputRightAddon>
                </InputGroup>
              </FormControl>

              <FormControl w='15%'>
                <InputGroup w='100%'>
                  <DatePicker
                    selected={campaignEventDate}
                    onChange={(date) => setCampaignEventDate(date)}
                    dateFormat='dd/MM/yyyy'
                    filterDate={isWeekday}
                    placeholderText='? Event date'
                    customInput={
                      <Input
                        onChange={handleInput}
                        borderRadius='2'
                        name='campaign_eventdate'
                        w='100%'
                      />
                    }
                  />
                  <InputRightAddon borderRadius='2'>
                    <Icon as={HiOutlineCalendar} />
                  </InputRightAddon>
                </InputGroup>
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
                  <Th w='3%'></Th>
                  <Th
                    w='7%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    Client
                  </Th>

                  <Th
                    w='27%'
                    color='white'
                    fontSize='16px'
                  >
                    Campaign Title
                  </Th>
                  <Th
                    w='27%'
                    color='white'
                    fontSize='16px'
                  >
                    Description
                  </Th>
                  <Th
                    w='10%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    Start Date
                  </Th>
                  <Th
                    w='10%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    End Date
                  </Th>
                  <Th
                    w='10%'
                    color='white'
                    fontSize='16px'
                    whiteSpace='normal'
                  >
                    Event Date
                  </Th>
                  <Th
                    w='6%'
                    whiteSpace='normal'
                  ></Th>
                </Tr>
              </Thead>
              {totalCampaigns > 0 ? (
                <Tbody>
                  {campaigns.map((row, index) => {
                    const hasEdmData = edmSchedule.some(
                      (edm) =>
                        edm.campaign_id === row._id &&
                        edm.client_id === row.client_id
                    )
                    const hasSocialData = socials.some(
                      (social) =>
                        social.campaign_id === row._id &&
                        social.client_id === row.client_id
                    )
                    const shouldDisplayToggle = hasEdmData || hasSocialData
                    return (
                      <>
                        <Tr key={index}>
                          <Td>
                            {shouldDisplayToggle && (
                              <Tooltip
                                label={
                                  visibleRows[row._id]
                                    ? 'Collapse detail'
                                    : 'Expand detail'
                                }
                                placement='top'
                              >
                                <IconButton
                                  size='sm'
                                  borderRadius='2px'
                                  colorScheme='facebook'
                                  variant='outline'
                                  icon={
                                    <Icon
                                      as={
                                        visibleRows[row._id]
                                          ? BsChevronUp
                                          : BsChevronDown
                                      }
                                    />
                                  }
                                  onClick={() => toggleBottomRow(row._id)}
                                />
                              </Tooltip>
                            )}
                          </Td>
                          <Td
                            whiteSpace='normal'
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
                                    (clientFind) =>
                                      clientFind._id === row.client_id
                                  )?.bgcolor || 'gray.300'
                                }`}
                                pt='5px'
                                pb='5px'
                                mb='5px'
                                textAlign='center'
                                borderRadius='100px'
                              >
                                {client.find(
                                  (clientFind) =>
                                    clientFind._id === row.client_id
                                )?.client_initials || 'N/A'}
                              </Text>
                            )}
                          </Td>

                          <Td whiteSpace='normal'>
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

                          <Td whiteSpace='normal'>
                            {isEditingRow && editedRowId === row._id ? (
                              <Input
                                type='text'
                                placeholder='Description'
                                name='campaignDescEdit'
                                borderRadius='2'
                                value={campaignDescEdit}
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
                              row.campaign_desc
                            )}
                          </Td>
                          <Td>
                            {isEditingRow && editedRowId === row._id ? (
                              <DatePicker
                                selected={campaignStartDateEdit}
                                onChange={(date) =>
                                  setCampaignStartDateEdit(date)
                                }
                                dateFormat='dd/MM/yyyy'
                                filterDate={isWeekday}
                                placeholderText='Campaign start date'
                                customInput={
                                  <Input
                                    onChange={handleInput}
                                    borderRadius='2'
                                    name='campaign_startdate'
                                    w='100%'
                                    bg='white'
                                  />
                                }
                              />
                            ) : (
                              row.campaign_startdate &&
                              moment(row.campaign_startdate).format(
                                'DD/MM/YYYY'
                              )
                            )}
                          </Td>
                          <Td>
                            {isEditingRow && editedRowId === row._id ? (
                              <DatePicker
                                selected={campaignEndDateEdit}
                                onChange={(date) =>
                                  setCampaignEndDateEdit(date)
                                }
                                dateFormat='dd/MM/yyyy'
                                filterDate={isWeekday}
                                placeholderText='Campaign end date'
                                customInput={
                                  <Input
                                    onChange={handleInput}
                                    borderRadius='2'
                                    name='campaign_enddate'
                                    w='100%'
                                    bg='white'
                                  />
                                }
                              />
                            ) : (
                              row.campaign_enddate &&
                              moment(row.campaign_enddate).format('DD/MM/YYYY')
                            )}
                          </Td>
                          <Td>
                            {isEditingRow && editedRowId === row._id ? (
                              <DatePicker
                                selected={campaignEventDateEdit}
                                onChange={(date) =>
                                  setCampaignEventDateEdit(date)
                                }
                                dateFormat='dd/MM/yyyy'
                                filterDate={isWeekday}
                                placeholderText='? Event date'
                                customInput={
                                  <Input
                                    onChange={handleInput}
                                    borderRadius='2'
                                    name='campaign_eventdate'
                                    w='100%'
                                    bg='white'
                                  />
                                }
                              />
                            ) : (
                              row.campaign_eventdate &&
                              moment(row.campaign_eventdate).format(
                                'DD/MM/YYYY'
                              )
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
                                    _hover={{
                                      bg: 'blue.100',
                                      color: 'blue.900',
                                    }}
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
                                        'campaign',
                                        pageLoadData
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
                        {visibleRows[row._id] && (
                          <Tr>
                            <Td></Td>
                            <Td colSpan='7'>
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
                                      Type
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
                                      w='29%'
                                      color='white'
                                      fontSize='16px'
                                      whiteSpace='normal'
                                    >
                                      Title
                                    </Th>
                                    <Th
                                      w='25%'
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
                                      w='19%'
                                      color='white'
                                      fontSize='16px'
                                      whiteSpace='normal'
                                    >
                                      Gap from previous
                                    </Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {edmSchedule
                                    .filter(
                                      (edm) =>
                                        edm.campaign_id === row._id &&
                                        edm.client_id === row.client_id
                                    )
                                    .map((edm, index) => (
                                      <Tr key={index}>
                                        <Td>EDM</Td>
                                        <Td>{formatDate(edm.date_to_send)}</Td>
                                        <Td>{edm.edm_title}</Td>
                                        <Td>{edm.audience}</Td>
                                        <Td>{edm.status}</Td>
                                        <Td>
                                          {edmSchedule.map((row2, index) => {
                                            if (row.linked_edm === row2._id) {
                                              const date1 = new Date(
                                                row2.date_to_send
                                              )
                                              const date2 = new Date(
                                                row.date_to_send
                                              )

                                              // Calculate the time difference in milliseconds
                                              const timeDifference =
                                                date2 - date1

                                              // Calculate the calendar days difference
                                              const calendarDaysDifference =
                                                Math.floor(
                                                  timeDifference /
                                                    (1000 * 60 * 60 * 24)
                                                )

                                              // Calculate the business days difference (excluding weekends)

                                              let businessDays = 0
                                              const currentDate = new Date(
                                                date1
                                              )

                                              while (currentDate <= date2) {
                                                const dayOfWeek =
                                                  currentDate.getDay()
                                                if (
                                                  dayOfWeek !== 0 &&
                                                  dayOfWeek !== 6
                                                ) {
                                                  businessDays++
                                                }
                                                currentDate.setDate(
                                                  currentDate.getDate() + 1
                                                )
                                              }

                                              // Calculate the weeks difference
                                              const weeksDifference =
                                                Math.floor(
                                                  calendarDaysDifference / 7
                                                )

                                              return (
                                                <Text key={index}>
                                                  <strong>
                                                    {businessDays} BD |{' '}
                                                    {calendarDaysDifference} CD
                                                    | {weeksDifference} weeks
                                                  </strong>{' '}
                                                  <br />
                                                  <Text
                                                    fontSize='13px'
                                                    color='gray.400'
                                                  >
                                                    [
                                                    {client.find(
                                                      (clientFind) =>
                                                        clientFind._id ===
                                                        row2.client_id
                                                    )?.client_initials || 'N/A'}
                                                    ] {row2.campaign_title} -{' '}
                                                    {row2.edm_title}
                                                  </Text>
                                                </Text>
                                              )
                                            }
                                            return null
                                          })}
                                        </Td>
                                      </Tr>
                                    ))}

                                  {socials
                                    .filter(
                                      (social) =>
                                        social.campaign_id === row._id &&
                                        social.client_id === row.client_id
                                    )
                                    .map((social, index) => (
                                      <Tr key={index}>
                                        <Td>Social</Td>
                                        <Td>
                                          {formatDate(social.date_to_send)}
                                        </Td>
                                        <Td>{social.social_title}</Td>
                                        <Td>{social.audience}</Td>
                                        <Td>{social.status}</Td>
                                        <Td>
                                          {socials.map((row2, index) => {
                                            if (
                                              row.linked_social === row2._id
                                            ) {
                                              const date1 = new Date(
                                                row2.date_to_send
                                              )
                                              const date2 = new Date(
                                                row.date_to_send
                                              )

                                              // Calculate the time difference in milliseconds
                                              const timeDifference =
                                                date2 - date1

                                              // Calculate the calendar days difference
                                              const calendarDaysDifference =
                                                Math.floor(
                                                  timeDifference /
                                                    (1000 * 60 * 60 * 24)
                                                )

                                              // Calculate the business days difference (excluding weekends)

                                              let businessDays = 0
                                              const currentDate = new Date(
                                                date1
                                              )

                                              while (currentDate <= date2) {
                                                const dayOfWeek =
                                                  currentDate.getDay()
                                                if (
                                                  dayOfWeek !== 0 &&
                                                  dayOfWeek !== 6
                                                ) {
                                                  businessDays++
                                                }
                                                currentDate.setDate(
                                                  currentDate.getDate() + 1
                                                )
                                              }

                                              // Calculate the weeks difference
                                              const weeksDifference =
                                                Math.floor(
                                                  calendarDaysDifference / 7
                                                )

                                              return (
                                                <Text key={index}>
                                                  <strong>
                                                    {businessDays} BD |{' '}
                                                    {calendarDaysDifference} CD
                                                    | {weeksDifference} weeks
                                                  </strong>{' '}
                                                  <br />
                                                  <Text
                                                    fontSize='13px'
                                                    color='gray.400'
                                                  >
                                                    [
                                                    {client.find(
                                                      (clientFind) =>
                                                        clientFind._id ===
                                                        row2.client_id
                                                    )?.client_initials || 'N/A'}
                                                    ] {row2.campaign_title} -{' '}
                                                    {row2.social_title}
                                                  </Text>
                                                </Text>
                                              )
                                            }
                                            return null
                                          })}
                                        </Td>
                                      </Tr>
                                    ))}
                                </Tbody>
                              </Table>
                            </Td>
                          </Tr>
                        )}
                      </>
                    )
                  })}
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

export { Campaign }
