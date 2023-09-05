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
import { BsChevronDown } from 'react-icons/bs'
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
  } = useAppContext()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDateEdit, setSelectedDateEdit] = useState(new Date())
  const [campaignTitle, setCampaignTitle] = useState()
  const [edmTitle, setEdmTitle] = useState()
  const [audience, setAudience] = useState()
  const [campaignTitleEdit, setCampaignTitleEdit] = useState()
  const [edmTitleEdit, setEdmTitleEdit] = useState()
  const [audienceEdit, setAudienceEdit] = useState()
  const [linkedEdmEdit, setLinkedEdmEdit] = useState()
  const [editingRowId, setEditingRowId] = useState(null)
  const [isEditingRow, setIsEditingRow] = useState(false)
  const [editedRowId, setEditedRowId] = useState(null)
  const [campaignTitleInput, setCampaignTitleInput] = useState('')

  const toggleFormVisibility = () => {
    setIsFormVisible((prevVisible) => !prevVisible)
  }

  function isWeekday(date) {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }

  useEffect(() => {
    getIndSchedule()
    getCampaignSuggestions()
    getEdmSuggestions()
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
    }

    addSchedule(newSchedule)
    getIndSchedule()
    getCampaignSuggestions()
    getEdmSuggestions()

    setCampaignTitle('')
    setEdmTitle('')
    setAudience('')

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
    }

    editSchedule(editedSchedule)

    getIndSchedule()
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
          <Heading
            as='h2'
            mb={4}
            size='lg'
          >
            {selectedClient.ClientName}
          </Heading>
          <Text>
            <strong>Date: {formattedDate}</strong>
          </Text>
        </Flex>
        <Flex justify='flex-end'>
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
        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            <Flex gap={8}>
              <FormControl w='30%'>
                <InputGroup w='100%'>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
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
                      />
                    }
                  />
                  <InputRightAddon>
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
                    w='15%'
                    color='white'
                    fontSize='16px'
                  >
                    Date & Time
                  </Th>
                  <Th
                    w='20%'
                    color='white'
                    fontSize='16px'
                  >
                    Campaign Title
                  </Th>
                  <Th
                    w='20%'
                    color='white'
                    fontSize='16px'
                  >
                    EDM Title
                  </Th>
                  <Th
                    w='20%'
                    color='white'
                    fontSize='16px'
                  >
                    Audience
                  </Th>
                  <Th
                    w='15%'
                    color='white'
                    fontSize='16px'
                  >
                    Gap from previous
                  </Th>
                  <Th w='10%'></Th>
                </Tr>
              </Thead>
              {totalEdmSchedules > 0 ? (
                <Tbody>
                  {edmSchedule.map((row, index) => (
                    <Tr key={index}>
                      <Td
                        w='15%'
                        align='left'
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
                      <Td w='20%'>
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
                      <Td w='20%'>
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
                      <Td w='20%'>
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
                      <Td w='15%'>
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
                        w='10%'
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
