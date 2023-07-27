import {
    Card,
    CardBody,
    CardFooter,
    Grid,
    GridItem,
    Heading,
    Icon,
    Link,
} from '@chakra-ui/react'
import { MdOutlineGroups } from 'react-icons/md'

const Stats = () => {
    return (
        <Grid gridTemplateColumns='repeat(4, 1fr)' gridColumnGap='20px'>
            <GridItem>
                <Card
                    align='center'
                    bg='#6DACDA'
                    textAlign='center'
                    color='white'
                    borderRadius='3xl'
                >
                    <CardBody>
                        <Icon
                            as={MdOutlineGroups}
                            boxSize='70px'
                            color='white'
                        />
                        <Heading as='h3' size='lg'>
                            4
                        </Heading>
                        <Heading as='h4' size='md'>
                            Clients
                        </Heading>
                    </CardBody>
                    <CardFooter bg='#3D759E' w='100%' textAlign='center'>
                        <Link w='100%'>View all clients</Link>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem>
                <Card
                    align='center'
                    bg='#44DCD5'
                    textAlign='center'
                    color='white'
                    borderRadius='3xl'
                >
                    <CardBody>
                        <Icon
                            as={MdOutlineGroups}
                            boxSize='70px'
                            color='white'
                        />
                        <Heading as='h3' size='lg'>
                            4
                        </Heading>
                        <Heading as='h4' size='md'>
                            Clients
                        </Heading>
                    </CardBody>
                    <CardFooter bg='#259F9A' w='100%' textAlign='center'>
                        <Link w='100%'>View all clients</Link>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem>
                <Card
                    align='center'
                    bg='#E0B87C'
                    textAlign='center'
                    color='white'
                    borderRadius='3xl'
                >
                    <CardBody>
                        <Icon
                            as={MdOutlineGroups}
                            boxSize='70px'
                            color='white'
                        />
                        <Heading as='h3' size='lg'>
                            4
                        </Heading>
                        <Heading as='h4' size='md'>
                            Clients
                        </Heading>
                    </CardBody>
                    <CardFooter bg='#B48F58' w='100%' textAlign='center'>
                        <Link w='100%'>View all clients</Link>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem>
                <Card
                    align='center'
                    bg='#6DACDA'
                    textAlign='center'
                    color='white'
                    borderRadius='3xl'
                >
                    <CardBody>
                        <Icon
                            as={MdOutlineGroups}
                            boxSize='70px'
                            color='white'
                        />
                        <Heading as='h3' size='lg'>
                            4
                        </Heading>
                        <Heading as='h4' size='md'>
                            Clients
                        </Heading>
                    </CardBody>
                    <CardFooter bg='#3D759E' w='100%' textAlign='center'>
                        <Link w='100%'>View all clients</Link>
                    </CardFooter>
                </Card>
            </GridItem>
        </Grid>
    )
}
export default Stats
