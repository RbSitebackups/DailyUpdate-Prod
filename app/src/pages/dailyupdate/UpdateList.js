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
    const { isLoading, dailyUpdates } = useAppContext()
    const [checkboxStates, setCheckboxStates] = useState({})
    const [showAddNewMap, setShowAddNewMap] = useState({})
    const [expandedCategories, setExpandedCategories] = useState({
        [dist_categories[0]?.category_id]: true,
    })
    const [expandedAll, setExpandedAll] = useState(false) // State to track overall expand/collapse state for all categories
    const [showLessUpdates, setShowLessUpdates] = useState({})

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

    const [updatesToShow, setUpdatesToShow] = useState({})

    const handleLoadMore = (categoryId) => {
        setCheckboxStates({}) // Reset checkbox states to avoid issues with incorrect updates being checked when loading more.
        setUpdatesToShow((prevState) => ({
            ...prevState,
            [categoryId]: (prevState[categoryId] || 3) + 3,
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
    }
    const handleExpandAll = () => {
        setExpandedAll(true)
    }

    const handleCollapseAll = () => {
        setExpandedAll(false)
    }

    const handleShowLess = (categoryId) => {
        setShowLessUpdates((prevShowLessUpdates) => ({
            ...prevShowLessUpdates,
            [categoryId]: 3, // Show 3 updates when "Show Less" is clicked
        }))
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
                <Button colorScheme='teal' onClick={handleExpandAll}>
                    Expand All
                </Button>
                <Button
                    ml='10px'
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
                    updatesToShow[category.category_id] || 3
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
                            <Input
                                name='add_update'
                                mt={2}
                                mb={2}
                                placeholder='Enter new update...'
                                // Implement the logic to handle adding the new update to the database
                            />
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
                                            colorScheme='green'
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
                                mt={2}
                                variant='outline'
                                colorScheme='teal'
                                onClick={() =>
                                    handleLoadMore(category.category_id)
                                }
                            >
                                Load More
                            </Button>
                        )}
                        {isExpanded &&
                            showLessUpdates[category.category_id] > 0 && (
                                // Show "Show Less" button only if the category is expanded and there are more updates displayed
                                <Button
                                    mt={2}
                                    variant='outline'
                                    colorScheme='teal'
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
