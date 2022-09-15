import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Navbar.css'
import { SiLinkedin } from 'react-icons/si'
import { Button } from '@chakra-ui/react'

const Navbar = () => {

    const navigation = useNavigate();

    const navigateHome = () => { 
        navigation('/');
    }

    const sendLinkedin = () => {
        window.open('https://www.linkedin.com/in/mario-de-jesus-rocha', '_blank')
    } 

    return ( 
        <nav className='nav'>
            <div className='nav_content'>
                <label className="nav__title-content" onClick={navigateHome}>PI-Countries</label>
                <Button leftIcon={<SiLinkedin/>} colorScheme='linkedin' variant='solid' onClick={sendLinkedin}>
                    Mario Rocha
                </Button>
            </div>
        </nav>
    );
}

export default Navbar;