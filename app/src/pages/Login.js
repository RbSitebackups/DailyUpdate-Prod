import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { AlertHelper } from '../components'
import { useAppContext } from '../context/appContext'
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

//
// Component
//
const Login = () => {
  // contss
  const textColor = useColorModeValue('navy.700', 'white')
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600')
  const brandStars = useColorModeValue('brand.500', 'brand.400')

  const navigate = useNavigate()

  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    setupUser,
    setupGoogleUser,
    setupUserClient,
  } = useAppContext()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleClick = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }
    const currentUser = { name, email, password }
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful!',
      })
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created!',
      })
    }
  }

  const handleCredentialResponse = (res) => {
    const details = jwt_decode(res.credential)

    const email = details.email
    const name = details.given_name
    const lastName = details.family_name

    const currentUser = { name, lastName, email }

    if (details.hd === 'resonate.com.au') {
      setupGoogleUser({
        currentUser,
        alertText: 'Login Successful!',
      })
    } else {
      displayAlert()
    }
  }

  const handleFailure = (res) => {
    console.log(res)
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setupUserClient(user)
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  const [values, setValues] = useState(initialState)

  return (
    <Center
      bg='brown'
      h='100vh'
    >
      <form onSubmit={handleClick}>
        <Flex
          alignItems='start'
          justifyContent='center'
          flexDirection='column'
          p='20'
          bg='white'
          borderRadius='10'
        >
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            w='100%'
            mb='20px'
          >
            {showAlert && <AlertHelper />}
          </Flex>
          <Box me='auto'>
            <Heading
              color={textColor}
              fontSize='36px'
              mb='10px'
            >
              {values.isMember ? 'Sign In' : 'Register'}
            </Heading>
          </Box>
          <Flex
            zIndex='2'
            direction='column'
            w={{ base: '100%', md: '420px' }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx={{ base: 'auto', lg: 'unset' }}
            me='auto'
            mb={{ base: '20px', md: 'auto' }}
          >
            <FormControl>
              {!values.isMember && (
                <div>
                  <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'
                  >
                    Name <Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    // isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: '0px', md: '0px' }}
                    type='text'
                    placeholder='Fullname'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    value={values.name}
                    name='name'
                    onChange={handleChange}
                    borderRadius={2}
                  />
                </div>
              )}
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                // isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: '0px', md: '0px' }}
                type='email'
                placeholder='mail@resonate.com'
                mb='24px'
                fontWeight='500'
                size='lg'
                value={values.email}
                name='email'
                onChange={handleChange}
                borderRadius={2}
              />
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                // isRequired={true}
                fontSize='sm'
                placeholder='Password'
                mb='24px'
                size='lg'
                type={'password'}
                variant='auth'
                value={values.password}
                name='password'
                onChange={handleChange}
                borderRadius={2}
              />
              <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'
                type='submit'
                isLoading={isLoading}
                borderRadius={2}
              >
                {values.isMember ? 'Sign In' : 'Register'}
              </Button>

              <GoogleLogin
                onSuccess={handleCredentialResponse}
                onError={() => {
                  console.log('Login Failed')
                }}
              />
            </FormControl>

            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='start'
              maxW='100%'
              mt='0px'
            >
              <Text
                color={textColorDetails}
                fontWeight='400'
                fontSize='14px'
              >
                {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                &nbsp;
                <Button
                  onClick={toggleMember}
                  variant='link'
                >
                  Create an Account
                </Button>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </Center>
  )
}
export default Login
