import { Grid, GridItem } from '@chakra-ui/react'
import TopNavBar from './TopNavBar'
import { SearchBar } from './searchbar/SearchBar'

const Navbar = () => {
    return (
        <Grid
            bg='blackAlpha.800'
            w='100%'
            h='auto'
            pt='5'
            pb='5'
            templateColumns='400px 1fr'
        >
            <GridItem pl={50} alignSelf='center'>
                <SearchBar borderRadius='30px' />
            </GridItem>
            <GridItem justifySelf='end' pr={50}>
                <TopNavBar />
            </GridItem>
        </Grid>
    )
}
export default Navbar
