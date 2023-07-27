import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Checkbox,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    Image,
    Input,
    Stack,
    Text,
    useBoolean,
} from '@chakra-ui/react'
import { useState } from 'react'
import AlertHelper from '../../components/alert/AlertHelper'
import { useAppContext } from '../../context/appContext'

const Profile = () => {
    const { user, updateUser, displayAlert, showAlert, isLoading } =
        useAppContext()
    const [flag, setFlag] = useBoolean()
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [lastName, setLastName] = useState(user?.lastName)
    const [displayName, setDisplayName] = useState(user?.displayName)
    const [isAdmin, setIsAdmin] = useState(user?.isAdmin)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !email || !lastName || !displayName || !isAdmin) {
            displayAlert()
            return
        }
        updateUser({ name, email, lastName, displayName, isAdmin })
    }

    const imgg =
        'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    return (
        <>
            <Heading mb={10}>Profile</Heading>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={50}>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    w='100%'
                >
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '350px' }}
                        src={user.image === '' ? '' : imgg}
                        alt={user.name}
                    />

                    <Stack>
                        <CardBody>
                            <Heading size='md'>
                                {user.name} {user.lastName}
                            </Heading>
                            <Text py='2'>{user.displayName}</Text>
                            <Text py='2'>{user.email}</Text>
                            <Text py='2'>
                                {user.isAdmin === true ? 'Admin' : 'User'}
                            </Text>
                        </CardBody>
                        <CardFooter>
                            <Button
                                variant='solid'
                                colorScheme='blue'
                                onClick={setFlag.toggle}
                            >
                                Edit Profile
                            </Button>
                        </CardFooter>
                    </Stack>
                </Card>

                <Box
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    w='100%'
                    sx={{ display: flag ? 'block' : 'none' }}
                    bg='white'
                    p={10}
                >
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <FormControl>
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                <Input
                                    id='name'
                                    placeholder='Enter your name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='lastName'>
                                    Last Name
                                </FormLabel>
                                <Input
                                    id='lastName'
                                    placeholder='Enter your last name'
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='displayName'>
                                    Display Name
                                </FormLabel>
                                <Input
                                    id='displayName'
                                    placeholder='Enter your display name'
                                    value={displayName}
                                    onChange={(e) =>
                                        setDisplayName(e.target.value)
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input
                                    id='email'
                                    placeholder='Enter your display name'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <Checkbox
                                    id='isAdmin'
                                    isChecked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.value)}
                                >
                                    Is Admin?
                                </Checkbox>
                            </FormControl>
                            <Button
                                colorScheme='teal'
                                type='submit'
                                isLoading={isLoading}
                                mb={20}
                            >
                                Submit
                            </Button>
                        </Stack>
                        {showAlert && <AlertHelper />}
                    </form>
                </Box>
            </Grid>
        </>
    )
}
export default Profile
