import React from 'react'
import {useHistory} from 'react-router-dom'
import './styles/navbar.css'
import { SiLinkedin } from 'react-icons/si'
import { Button } from 'antd'

const Navbar = () => {

    const history = useHistory();

    const navigateHome = () =>{ 
        history.push("/");
    }
    const sendLinkedin = () => {
        window.location.href='https://www.linkedin.com/in/mario-de-jesus-rocha/'
    } 

    return ( 
        <div className='nav'>
            <div className='nav_content'>
                <span className="nav__title-content" onClick={navigateHome}>PI-Countries</span>
                <Button type="primary" icon={<SiLinkedin style={{marginRight: '8px'}}/>} onClick={sendLinkedin}>Mario Rocha
                </Button>
            </div>
        </div>
    );
}
 
export default Navbar;