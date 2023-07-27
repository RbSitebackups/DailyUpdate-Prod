import React from 'react'
import {
    Box,
    Button,
    Flex,
    IconButton,
    Text,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useAppContext } from '../../context/appContext'

const CategoryBox = ({ category, totalCategories, custom_ind }) => {
    const { setEditCategory, delCategory } = useAppContext()
    const {
        isOpen: isOpenAlert,
        onOpen: onOpenAlert,
        onClose: onCloseAlert,
    } = useDisclosure() // Renamed to avoid conflict

    const handleDeleteClick = () => {
        onOpenAlert() // Open the AlertDialog
    }
    const cancelRef = React.useRef()

    return (
        <Box
            borderWidth='1px'
            borderBottomWidth={totalCategories === custom_ind + 1 ? '1px' : '0'}
            overflow='hidden'
            width='100%'
        >
            <Flex align='center' justify='space-between' padding='10px'>
                <Text fontSize='sm' fontWeight='normal'>
                    {category.category_name}
                </Text>
                <Flex>
                    <IconButton
                        icon={<EditIcon />}
                        aria-label='Edit'
                        colorScheme='orange'
                        marginRight='0.5rem'
                        onClick={() => setEditCategory(category._id)}
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        aria-label='Delete'
                        colorScheme='red'
                        onClick={handleDeleteClick}
                    />
                </Flex>
            </Flex>
            <AlertDialog // Remove isOpen prop from this component
                leastDestructiveRef={cancelRef}
                onClose={onCloseAlert} // Use the onClose prop from useDisclosure
                isOpen={isOpenAlert} // Use the isOpen prop from useDisclosure
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Category
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete{' '}
                            {category.category_name}? <br />
                            You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseAlert}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme='red'
                                onClick={() => delCategory(category._id)}
                                value={category._id}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    )
}

export default CategoryBox
