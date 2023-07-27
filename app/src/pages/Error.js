import { Box, Center, Image } from '@chakra-ui/react'
import notfound from '../assets/images/404.jpg'
const Error = () => {
  return (
    <Center bg='' h='100vh' color='white'>
      <Box boxSize='600px'>
        <Image src={notfound} alt='notfound' />
      </Box>
    </Center>
  )
}
export default Error
