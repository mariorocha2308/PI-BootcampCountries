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
        <Box maxWidth='1200px' width='85%' margin='auto' py='1.5rem'>
            <Box display='flex' justifyContent='space-between' alignItems='center' >
                <Text fontFamily='Poppins' color='#616161' fontWeight='bold' fontSize={['sm', 'lg']} onClick={() => navigate('/')} cursor='pointer'>PI-Countries</Text>
                <Button leftIcon={<SiLinkedin/>} colorScheme='linkedin' variant='solid' size={['sm', 'md']} onClick={sendLinkedin}>
                    Mario Rocha
                </Button>
            </Box>
            <Outlet/>
        </Box>
    );
}

export default Navbar;