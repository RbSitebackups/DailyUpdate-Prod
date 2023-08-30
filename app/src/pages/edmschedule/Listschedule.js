import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker' // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css' // Import DatePicker styles
import {
    Box,
    Select,
    Input,
    Button,
    VStack,
    Text,
    Flex,
    Heading,
    FormControl,
    FormLabel,
    InputGroup,
    InputRightAddon,
    Grid,
    GridItem,
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
} from '@chakra-ui/react'
import { useAppContext } from '../../context/appContext'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { MdSave } from 'react-icons/md'
import { HiOutlineCalendar } from 'react-icons/hi2'
import { BsClock } from 'react-icons/bs'

const Listschedule = () => {
    const formattedDate = new Date().toLocaleString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    const [isFormVisible, setIsFormVisible] = useState(false) // Toggle form visibility
    const {
        selectedClient,
        handleChange,
        isEditing,
        addSchedule,
        edmSchedule,
        getIndSchedule,
        totalEdmSchedules,
    } = useAppContext()
    const [selectedDate, setSelectedDate] = useState(new Date()) // State for selected date
    const [selectedTime, setSelectedTime] = useState(new Date()) // State for selected time
    const [tableData, setTableData] = useState([])

    const [campaignTitle, setCampaignTitle] = useState()
    const [edmTitle, setEdmTitle] = useState()
    const [audience, setAudience] = useState()

    const toggleFormVisibility = () => {
        setIsFormVisible((prevVisible) => !prevVisible) // Toggle visibility state
    }

    useEffect(() => {
        // Fetch individual schedules when the component mounts
        getIndSchedule()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const formattedDateToSend = selectedDate.toLocaleDateString('en-AU')
        const formattedTimeToSend = selectedTime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
        })

        // Create a new schedule object from the form values
        const newSchedule = {
            campaignTitle,
            edmTitle,
            audience,
            date_to_send: formattedDateToSend,
            time_to_send: formattedTimeToSend,
        }

        // Call the addSchedule function with the new schedule object
        if (addSchedule(newSchedule)) {
            getIndSchedule()
        }

        // Clear input fields if needed
        setCampaignTitle('')
        setEdmTitle('')
        setAudience('')

        if (isEditing) {
            // editClient()
            // getClients()
            return
        }
    }

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        // Update the corresponding state variables based on the input name
        if (name === 'campaignTitle') {
            setCampaignTitle(value)
        } else if (name === 'edmTitle') {
            setEdmTitle(value)
        } else if (name === 'audience') {
            setAudience(value)
        }
    }

    return (
        <Box
            p={{ base: 4, md: 8 }}
            bg='gray.50'
            boxShadow='md'
            borderRadius='md'
        >
            <VStack spacing={4} align='stretch'>
                <Flex justify='space-between' w='100%'>
                    <Heading as='h2' mb={4} size='lg'>
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
                                <FaPlus
                                    style={{ transform: 'rotate(45deg)' }}
                                />
                            ) : (
                                <FaPlus />
                            )}
                        </IconButton>
                    </Tooltip>
                </Flex>
                {isFormVisible && (
                    <form onSubmit={handleSubmit}>
                        <Flex gap={5}>
                            <FormControl w='14%'>
                                <InputGroup>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) =>
                                            setSelectedDate(date)
                                        }
                                        dateFormat='dd/mm/yyyy'
                                        popperModifiers={{
                                            preventOverflow: {
                                                enabled: true,
                                            },
                                        }}
                                        customInput={
                                            <Input
                                                onChange={handleInput}
                                                borderRadius='2'
                                                name='date_to_send'
                                            />
                                        }
                                    />
                                    <InputRightAddon>
                                        <Icon as={HiOutlineCalendar} />
                                    </InputRightAddon>
                                </InputGroup>
                            </FormControl>
                            <FormControl w='14%'>
                                <InputGroup>
                                    <DatePicker
                                        selected={selectedTime}
                                        onChange={(time) =>
                                            setSelectedTime(time)
                                        }
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption='Time'
                                        dateFormat='HH:mm' // Set to 24-hour format
                                        timeFormat='HH:mm' // Set to 24-hour format for Time
                                        customInput={
                                            <Input
                                                onChange={handleInput}
                                                borderRadius='2'
                                                name='time_to_send'
                                            />
                                        }
                                    />
                                    <InputRightAddon>
                                        <Icon as={BsClock} />
                                    </InputRightAddon>
                                </InputGroup>
                            </FormControl>

                            <FormControl w='30%'>
                                <Input
                                    type='text'
                                    placeholder='Enter campaign title'
                                    name='campaignTitle'
                                    value={campaignTitle}
                                    onChange={handleInput}
                                    borderRadius='2'
                                />
                            </FormControl>
                            <FormControl w='25%'>
                                <Input
                                    type='text'
                                    placeholder='Enter EDM title'
                                    name='edmTitle'
                                    value={edmTitle}
                                    onChange={handleInput}
                                    borderRadius='2'
                                />
                            </FormControl>
                            <FormControl w='14%'>
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

                <Box mt={4}>
                    <TableContainer>
                        <Table
                            variant='unstyled'
                            colorScheme='gray'
                            borderWidth='1px'
                        >
                            <Thead background='green' color='white'>
                                <Tr>
                                    <Th w='20%'>Campaign Title</Th>
                                    <Th w='20%'>EDM Title</Th>
                                    <Th w='20%'>Audience</Th>
                                    <Th w='20%'>Date</Th>
                                    <Th w='20%'>Time</Th>
                                    <Th w='20%'></Th>
                                </Tr>
                            </Thead>
                            {totalEdmSchedules > 0 ? (
                                <Tbody>
                                    {edmSchedule.map((row, index) => (
                                        <Tr key={index}>
                                            <Td w='20%'>
                                                {row.campaign_title}
                                            </Td>
                                            <Td w='20%'>{row.edm_title}</Td>
                                            <Td w='20%'>{row.audience}</Td>
                                            <Td w='20%'>{row.date_to_send}</Td>
                                            <Td w='20%'>{row.time_to_send}</Td>
                                            <Td w='20%'>
                                                <IconButton
                                                    aria-label='Edit'
                                                    icon={<Icon as={FaEdit} />}
                                                    colorScheme='blue'
                                                    size='sm'
                                                    mr={2}
                                                />
                                                <IconButton
                                                    aria-label='Delete'
                                                    icon={<Icon as={FaTrash} />}
                                                    colorScheme='red'
                                                    size='sm'
                                                />
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            ) : (
                                <Tbody>
                                    <Tr>
                                        <Td colSpan={6} textAlign='center'>
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
