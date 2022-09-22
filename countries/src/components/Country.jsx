import React from 'react';
import { NavLink } from 'react-router-dom'
import {BsGeoAltFill} from 'react-icons/bs'
import { Box, Container, GridItem, Image, Text } from '@chakra-ui/react'

const Country = props => {
    
    return (
        <NavLink to={`/home/country/${props.id}`}>
            <GridItem w='100%' h='100%' position='relative' fontFamily='Poppins'>
                <Image src={props.image} alt={props.name} objectFit='cover' width='100%' height='100%' borderRadius='10px'/>
                <Box className='overlay'>
                    <Text display='flex' justifyContent='center' fontWeight='bold' color='white' fontSize='19'>{props.name}</Text> 
                    <Container display='flex' alignItems='center' color='blue.400' fontWeight='bold'>
                        <BsGeoAltFill/>
                        <Text ml='1.5'>{props.region}</Text>
                    </Container>
                </Box>
            </GridItem>
        </NavLink> 
    );
}

export default Country;