import React, { useState, useEffect } from 'react'
import {
    Box,
    Select,
    Input,
    Button,
    VStack,
    Text,
    Flex,
    Heading,
} from '@chakra-ui/react'
import { useAppContext } from '../../context/appContext'
import UpdateList from './UpdateList'

const Dailyupdate = () => {
    const formattedDate = new Date().toLocaleString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    const [selectedCategory, setSelectedCategory] = useState(null)
    const {
        selectedClient,
        category,
        getCategories,
        getDistinctCategories,
        dist_categories,
        fetchUpdates,
    } = useAppContext()

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        getCategories()
        getDistinctCategories()
        fetchUpdates(selectedClient.ClientID)
    }, [selectedClient.ClientID])

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
                <form onSubmit=''>
                    <Flex align='center'>
                        <Select
                            placeholder='- Select category -'
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            mr={2}
                            width='220px'
                        >
                            {category.map((ind_category) => (
                                <option
                                    key={ind_category._id}
                                    value={ind_category.category_name}
                                >
                                    {ind_category.category_name}
                                </option>
                            ))}
                        </Select>
                        <Input
                            name='updateText'
                            placeholder='Add daily update'
                        />
                        <Button type='submit' colorScheme='teal' hidden={true}>
                            Add Update
                        </Button>
                    </Flex>
                </form>
                {dist_categories !== undefined && (
                    <UpdateList dist_categories={dist_categories} />
                )}
            </VStack>
        </Box>
    )
}
export { Dailyupdate }
