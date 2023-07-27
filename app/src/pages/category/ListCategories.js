import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import Loading from '../../components/Loading'
import CategoryBox from './CategoryBox'
import { Box, Center, Flex, Heading } from '@chakra-ui/react'

const ListCategories = () => {
    const { category, isLoading, totalCategories, getCategories } =
        useAppContext()

    useEffect(() => {
        getCategories()
    }, [])

    if (isLoading) {
        return <Loading />
    }
    if (totalCategories === 0) {
        return (
            <Center>
                <h2>No categories to display...</h2>
            </Center>
        )
    }
    let custom_ind = 0
    return (
        <>
            <Box padding='1rem'>
                <Flex justify='space-between' align='center' mb='20px'>
                    <Heading as='h2' flex='1'>
                        Categories
                    </Heading>
                    <Heading as='h5' size='sm' style={{ flex: '0 0 auto' }}>
                        {totalCategories} Categor
                        {totalCategories > 1 ? 'ies' : 'y'} found
                    </Heading>
                    {/* <IconButton
                        icon={<AddIcon />}
                        aria-label='Edit'
                        colorScheme='green'
                        marginRight='0.5rem'
                        ml={2}
                        onClick={() => setIsFormActive(!isFormActive)}
                    /> */}
                </Flex>
                {category.map((ind_category) => (
                    <CategoryBox
                        key={ind_category._id}
                        category={ind_category}
                        totalCategories={totalCategories}
                        custom_ind={custom_ind++}
                    />
                ))}
            </Box>
        </>
    )
}
export default ListCategories
