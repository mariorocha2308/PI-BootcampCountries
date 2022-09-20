import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { SiLinkedin } from 'react-icons/si'
import { Button, Box, Text } from '@chakra-ui/react'

const Navbar = () => {

    const navigate = useNavigate();
    const sendLinkedin = () => {
        window.open('https://www.linkedin.com/in/mario-de-jesus-rocha', '_blank')
    }

    return ( 
        <>
            <Box display='flex' justifyContent='space-between' alignItems='center' maxWidth='1200px' width='85%' margin='auto' py='1rem'>
                <Text fontFamily='Poppins' color='#616161' fontWeight='bold' fontSize='lg' onClick={() => navigate('/')} cursor='pointer'>PI-Countries</Text>
                <Button leftIcon={<SiLinkedin/>} colorScheme='linkedin' variant='solid' onClick={sendLinkedin}>
                    Mario Rocha
                </Button>
            </Box>
            <Outlet/>
        </>
    );
}

export default Navbar;