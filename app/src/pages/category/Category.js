import React, { useState } from 'react'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
} from '@chakra-ui/react'
import AlertHelper from '../../components/alert/AlertHelper'
import { useAppContext } from '../../context/appContext'
import ListCategories from './ListCategories'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
const Category = () => {
    const {
        isEditing,
        isLoading,
        showAlert,
        displayAlert,
        category_name,
        handleChange,
        clearValues,
        createCategory,
        getCategories,
        editCategory,
        category,
    } = useAppContext()

    // State to hold the match status
    const [isMatched, setIsMatched] = useState(false)

    // Function to check if the category name matches with the database
    const checkCategoryMatch = (inputCategory) => {
        // Replace this with your actual database check logic
        const categoryNames = category.map((item) => item.category_name)
        const inputCategoryLower = inputCategory.toLowerCase()
        const matched = categoryNames.some(
            (categoryName) => categoryName.toLowerCase() === inputCategoryLower
        )
        setIsMatched(matched)
    }

    const handleCateInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
        if (value.trim() !== '') {
            // Check if the input matches with the database only if the input is not empty
            checkCategoryMatch(value)
        } else {
            setIsMatched(false) // Reset the isMatched state if the input is empty
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!category_name) {
            displayAlert()
            return
        }

        if (isEditing) {
            editCategory()
            getCategories()
            return
        }

        createCategory()
        getCategories()
    }
    return (
        <>
            <Grid
                templateColumns={{ base: '1fr', md: '2fr 1fr' }}
                gap={{ base: 4, md: 8 }}
            >
                <Box
                    p={{ base: 4, md: 8 }}
                    bg='gray.100'
                    borderRadius='md'
                    boxShadow='md'
                >
                    <ListCategories />
                </Box>

                <Box
                    p={{ base: 4, md: 8 }}
                    bg='gray.50'
                    boxShadow='md'
                    borderRadius='md'
                >
                    <form onSubmit={handleSubmit}>
                        <Heading mb={4} size='lg'>
                            {isEditing === true ? 'Edit' : 'Add'} Category
                        </Heading>
                        {showAlert && <AlertHelper />}
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel htmlFor='category_name'>
                                    Category Name
                                </FormLabel>
                                <InputGroup>
                                    <Input
                                        id='category_name'
                                        placeholder='Enter new category'
                                        value={category_name}
                                        name='category_name'
                                        onChange={handleCateInput}
                                    />
                                    {/* Conditionally render the icon */}
                                    {category_name.trim() !== '' && (
                                        <InputRightElement
                                            color={
                                                isMatched
                                                    ? 'red.500'
                                                    : 'green.500'
                                            }
                                            pointerEvents='none'
                                        >
                                            {isMatched ? (
                                                <CloseIcon />
                                            ) : (
                                                <CheckIcon />
                                            )}
                                        </InputRightElement>
                                    )}
                                </InputGroup>
                            </FormControl>
                            <Flex
                                flexDirection={{
                                    base: 'column',
                                    md: 'row',
                                }}
                                justifyContent='space-between'
                            >
                                <Button
                                    type='submit'
                                    colorScheme='teal'
                                    isLoading={isLoading}
                                    flex={{ base: '1', md: 'auto' }}
                                    mb={{ base: '4', md: '0' }}
                                    mr={{ md: '2' }}
                                >
                                    Submit
                                </Button>
                                <Button
                                    colorScheme='orange'
                                    type='button'
                                    onClick={clearValues}
                                    flex={{ base: '1', md: 'auto' }}
                                    ml={{ md: '2' }}
                                >
                                    Clear
                                </Button>
                            </Flex>
                        </Stack>
                    </form>
                </Box>
            </Grid>
        </>
    )
}
export { Category }
