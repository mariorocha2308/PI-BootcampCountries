import React from 'react';
import image from '../pages/images/undraw_camping_noc8.svg';
import { Box, Text, Image } from '@chakra-ui/react'

const Landing = () => {

    return ( 
        <Box display='flex' justifyContent='space-between' alignItems='center' py={{base:'2rem', xl:'5rem'}}
        flexDirection={['column', 'column','column', 'row']}>
            <Text fontFamily='Poppins' fontWeight='bold' color='#616161' 
            fontSize={{base:'30', sm:'40', xl:'50'}}  
            width={['300px', '380px', '380px', '480px']} 
            mb={{base: '2rem'}}>
                Find, order countries & create tourism activities
            </Text>
            <Image src={image} alt="undraw world map" 
            width={['450px', '400px', '450px', '450px', '550px']}/>
        </Box> 
    );
}

export default Landing;