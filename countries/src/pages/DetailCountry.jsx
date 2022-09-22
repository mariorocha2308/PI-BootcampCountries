import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import { getCountryQuery } from '../utils/queries'
import { useQuery } from 'react-query';
import { Button, Badge, Image, Box, Text } from '@chakra-ui/react';
import ListActivities from '../components/Modal/ListActivities'

const DetailCountry = () => {

    const { id }= useParams();
    const { data: country } = useQuery(['country', id],() => getCountryQuery(id))
    const [visible, setVisible] = useState(false)
    
    const km = country?.area / 1000000

    const onHandleOpen = () => {
        setVisible(true)
    }

    const onHandleClose = () => {
        setVisible(false)
    }

    return ( 
        <Box display='flex' justifyContent='space-around' mt='20' alignItems={{base: 'flex-start', sm: 'flex-start', md: 'flex-start'}} flexDirection={['column-reverse', 'column-reverse', 'column-reverse', 'row']}>
            <Box display='flex' flexDirection='column' justifyContent='flex-start' fontFamily='Poppins' fontWeight='bold' mt={{base: 5, sm: 5}}>
                <Text color='blackAlpha.700' fontSize='25'>{country?.name}</Text> 
                <Badge variant='outline' colorScheme='red' alignSelf='self-start' mb='5' mt='2'>{country?.capital}</Badge>
                <Text display='flex' color='blackAlpha.700'>Continent: <Text color='blackAlpha.500' ml='1'>{country?.continent}</Text></Text>
                <Text display='flex' color='blackAlpha.700'>Subregion: <Text color='blackAlpha.500' ml='1'>{country?.subregion}</Text></Text>
                <Text display='flex' color='blackAlpha.700'>Area: <Text color='blackAlpha.500' ml='1'>{km} km2</Text></Text>
                <Text display='flex' color='blackAlpha.700'>Population: <Text color='blackAlpha.500' ml='1'>{country?.population}</Text></Text>
                
                <Button colorScheme='teal' width='200px' marginTop='4' onClick={onHandleOpen}>Show activities</Button>
            </Box>
            <Box width='90%' height='100%' maxW='500px'>
                <Image src={country?.imageFlag} alt={country?.id} objectFit='cover' height='100%' width='100%' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px' borderRadius='10px'/>
            </Box>

            <ListActivities isOpen={visible} onClose={onHandleClose} id={id}/>
        </Box>
    );
}

export default DetailCountry