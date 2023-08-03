import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import Loading from '../../components/Loading'
import moment from 'moment'

import {
    Box,
    Button,
    VStack,
    Text,
    Flex,
    Checkbox,
    Input,
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

const UpdateList = ({ dist_categories }) => {
    const { isLoading, dailyUpdates, addUpdate, fetchUpdates, selectedClient } =
        useAppContext()
    const [checkboxStates, setCheckboxStates] = useState({})
    const [showAddNewMap, setShowAddNewMap] = useState({})
    const [expandedCategories, setExpandedCategories] = useState({
        [dist_categories[0]?.category_id]: true,
    })
    const [expandedAll, setExpandedAll] = useState(false) // State to track overall expand/collapse state for all categories
    const [showLessUpdates, setShowLessUpdates] = useState({})
    const [checkAllVisible, setCheckAllVisible] = useState(false)
    const [updatesToShow, setUpdatesToShow] = useState({})
    const defaultNoUpdates = 3

    useEffect(() => {
        if (dailyUpdates) {
            // Initialize checkbox states based on dailyUpdates
            const initialStates = dailyUpdates.reduce((acc, update) => {
                acc[update._id] = update.checked || false
                return acc
            }, {})
            setCheckboxStates(initialStates)
        }
    }, [dailyUpdates])

    const handleCheckboxToggle = (updateId) => {
        setCheckboxStates((prevState) => ({
            ...prevState,
            [updateId]: !prevState[updateId],
        }))
    }

    const handleLoadMore = (categoryId) => {
        setUpdatesToShow((prevState) => ({
            ...prevState,
            [categoryId]:
                (prevState[categoryId] || defaultNoUpdates) + defaultNoUpdates,
        }))
        setShowLessUpdates((prevState) => ({
            ...prevState,
            [categoryId]: prevState[categoryId] || defaultNoUpdates,
        }))
    }
    const handleAddNewToggle = (categoryId) => {
        setShowAddNewMap((prevState) => ({
            ...prevState,
            [categoryId]: !prevState[categoryId],
        }))
    }
    const handleExpandToggle = (categoryId) => {
        setExpandedCategories((prevState) => ({
            ...prevState,
            [categoryId]: !prevState[categoryId],
        }))

        // Update the expandedAll state based on whether all categories are expanded
        const allCategoriesExpanded = dist_categories.every(
            (category) => expandedCategories[category.category_id]
        )
        setExpandedAll(allCategoriesExpanded)
    }
    const handleExpandAll = () => {
        setExpandedAll(true)
        setExpandedCategories((prevState) => {
            const updatedExpandedCategories = {}
            dist_categories.forEach((category) => {
                updatedExpandedCategories[category.category_id] = true
            })
            return updatedExpandedCategories
        })
    }

    const handleCollapseAll = () => {
        setExpandedAll(false)
        setExpandedCategories((prevState) => {
            const updatedExpandedCategories = {}
            dist_categories.forEach((category) => {
                updatedExpandedCategories[category.category_id] = false
            })
            return updatedExpandedCategories
        })
    }

    const handleShowLess = (categoryId) => {
        const updatesToShowValue =
            (updatesToShow[categoryId] || defaultNoUpdates) - defaultNoUpdates
        if (updatesToShowValue > defaultNoUpdates) {
            setUpdatesToShow((prevState) => ({
                ...prevState,
                [categoryId]: updatesToShowValue,
            }))
        } else {
            setUpdatesToShow((prevState) => ({
                ...prevState,
                [categoryId]: defaultNoUpdates, // Always show at least 2 updates
            }))
        }
    }

    // Add a new state to hold the text of the new update
    const [newUpdateText, setNewUpdateText] = useState({})

    const handleNewUpdateChange = (categoryId, text) => {
        setNewUpdateText((prevState) => ({
            ...prevState,
            [categoryId]: text,
        }))
    }

    const handleAddUpdate = (e, categoryId) => {
        e.preventDefault()
        // Here you can call the addUpdate function from the appContext and pass the category id and the new update text
        const newText = newUpdateText[categoryId]
        if (newText && newText.trim() !== '') {
            addUpdate(categoryId, newText)
            fetchUpdates(selectedClient.ClientID)
            handleAddNewToggle(categoryId) // Hide the input field after adding the update
        }
    }

    const handleCheckAllToggle = (e) => {
        const isChecked = e.target.checked

        setCheckAllVisible(isChecked)
        // Update the state of all visible checkboxes to the value of the "Check All" checkbox
        const visibleUpdates = dailyUpdates.filter((update) => {
            const categoryId = update.category_id
            return (
                expandedAll ||
                expandedCategories[categoryId] ||
                showLessUpdates[categoryId] > 0
            )
        })

        const allVisibleUpdatesIds = visibleUpdates.map((update) => update._id)
        setCheckboxStates((prevState) => {
            const updatedStates = { ...prevState }
            allVisibleUpdatesIds.forEach((updateId) => {
                updatedStates[updateId] = isChecked
            })
            return updatedStates
        })
    }

    if (isLoading || dailyUpdates === undefined) {
        return <Loading />
    }

    if (dailyUpdates.length === 0) {
        return <Text>No updates for the selected category.</Text>
    }

    return (
        <VStack spacing={4} align='stretch'>
            {/* Add Expand All and Collapse All buttons */}
            <Flex justify='' w='100%'>
                <Checkbox
                    colorScheme='teal'
                    borderRadius={2}
                    onChange={handleCheckAllToggle}
                    isVisible={checkAllVisible}
                >
                    Check All
                </Checkbox>
                <Button
                    ml='10px'
                    colorScheme='teal'
                    borderRadius={2}
                    onClick={handleExpandAll}
                >
                    Expand All
                </Button>
                <Button
                    ml='10px'
                    borderRadius={2}
                    colorScheme='teal'
                    onClick={handleCollapseAll}
                >
                    Collapse All
                </Button>
            </Flex>
            {dist_categories.map((category) => {
                const updates = dailyUpdates.filter(
                    (update) => update.category_id === category.category_id
                )
                const updatesToShowValue =
                    updatesToShow[category.category_id] || defaultNoUpdates
                const isExpanded =
                    expandedAll || expandedCategories[category.category_id]

                return (
                    <Box key={category.category_id} mt={4}>
                        <Flex align='center' mb='20px'>
                            <Button
                                size='xs'
                                colorScheme='dark'
                                variant='ghost'
                                leftIcon={
                                    isExpanded ? <MinusIcon /> : <AddIcon />
                                }
                                onClick={() =>
                                    handleExpandToggle(category.category_id)
                                }
                            >
                                <Text fontSize='xl' fontWeight='bold' mb={2}>
                                    {category.category_name}:
                                </Text>
                            </Button>

                            <Button
                                size='xs'
                                ml='20px'
                                borderRadius={2}
                                colorScheme='teal'
                                variant='outline'
                                leftIcon={
                                    showAddNewMap[category.category_id] ? (
                                        <MinusIcon />
                                    ) : (
                                        <AddIcon />
                                    )
                                }
                                onClick={() =>
                                    handleAddNewToggle(category.category_id)
                                }
                            >
                                {showAddNewMap[category.category_id]
                                    ? 'Cancel'
                                    : 'Add new'}
                            </Button>
                        </Flex>
                        {showAddNewMap[category.category_id] && (
                            <form
                                onSubmit={(e) =>
                                    handleAddUpdate(e, category.category_id)
                                }
                            >
                                <Input
                                    name='add_update'
                                    mb={2}
                                    placeholder='Enter new update...'
                                    value={
                                        newUpdateText[category.category_id] ||
                                        ''
                                    }
                                    onChange={(e) =>
                                        handleNewUpdateChange(
                                            category.category_id,
                                            e.target.value
                                        )
                                    }
                                />
                                <Button
                                    type='submit'
                                    mt={2}
                                    borderRadius={2}
                                    hidden={true}
                                    colorScheme='teal'
                                >
                                    Add Update
                                </Button>
                            </form>
                        )}
                        {isExpanded &&
                            updates
                                .sort(
                                    (a, b) =>
                                        new Date(b.createdAt) -
                                        new Date(a.createdAt)
                                )
                                .slice(0, updatesToShowValue)
                                .map((update) => (
                                    <Flex key={update._id} align='center'>
                                        <Checkbox
                                            pt='5px'
                                            pb='5px'
                                            pr='15px'
                                            mb='5px'
                                            size='lg'
                                            colorScheme='teal'
                                            isChecked={
                                                checkboxStates[update._id] ||
                                                false
                                            }
                                            onChange={() =>
                                                handleCheckboxToggle(update._id)
                                            }
                                        />
                                        <Text
                                            bg='gray.300'
                                            pt='5px'
                                            pb='5px'
                                            mb='5px'
                                            width='200px'
                                            textAlign='center'
                                            borderRadius='100px'
                                        >
                                            {moment(update.createdAt).format(
                                                'ddd, D MMM YY, h:mm A'
                                            )}
                                        </Text>
                                        <Text pb='5px' pl='15px' pr='15px'>
                                            {update.d_update}
                                        </Text>
                                    </Flex>
                                ))}
                        {isExpanded && updates.length > updatesToShowValue && (
                            <Button
                                size='xs'
                                mt={2}
                                mr={2}
                                variant='outline'
                                colorScheme='teal'
                                borderRadius={2}
                                onClick={() =>
                                    handleLoadMore(category.category_id)
                                }
                            >
                                Load More
                            </Button>
                        )}
                        {isExpanded && updatesToShowValue > 3 && (
                            // Show "Show Less" button only if the category is expanded and there are more updates displayed
                            <Button
                                size='xs'
                                mt={2}
                                variant='outline'
                                colorScheme='teal'
                                borderRadius={2}
                                onClick={() =>
                                    handleShowLess(category.category_id)
                                }
                            >
                                Show Less
                            </Button>
                        )}
                    </Box>
                )
            })}
        </VStack>
    )
}

export default UpdateList
