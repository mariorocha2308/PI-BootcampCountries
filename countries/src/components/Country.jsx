import '../pages/styles/country.css'
import { NavLink } from 'react-router-dom'
import {BsGeoAltFill} from 'react-icons/bs'

const Country = props => {
    return (
        <NavLink to={`/home/country/${props.id}`}>
            <div className='card'>
                <img src={props.image} alt={props.name} className='card__image'/>
                <div className='overlay'>
                    <label className='card__title'>{props.name}</label> 
                    <div className='card__continent'>
                        <BsGeoAltFill/>
                        <label>{props.region}</label>
                    </div>
                </div>
            </div>
        </NavLink> 
    );
}

export default Country;