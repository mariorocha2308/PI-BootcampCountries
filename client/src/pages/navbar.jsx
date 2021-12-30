import React from 'react'
import {useHistory} from 'react-router-dom'
import './styles/navbar.css'
import { Image } from 'semantic-ui-react'
import avatar from './images/IMG-20211030-WA0022.jpg'

const Navbar = () => {

    const history = useHistory();

    const navigateHome = () =>{ 
        history.push("/");
    }

    return ( 
        <div className='nav'>
            <div className='nav_content'>
                <span className="nav__title" onClick={navigateHome}>PI-Countries</span>
                <div className='nav__avatar'>
                    <Image src={avatar} avatar size='mini'/>
                    <span className='nav__title-avatar'>Mario Rocha</span>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;