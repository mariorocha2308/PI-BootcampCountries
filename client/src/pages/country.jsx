import './styles/country.css'
import { NavLink } from 'react-router-dom'
import {BsGeoAltFill} from 'react-icons/bs'

const Country = (props) => {
    return (
        <NavLink to={`/home/countries/${props.id}`}>
            <div className='card'>
                <div className='image_content'>
                    <img src={props.image} alt={props.name} className='card__image'/>
                </div>
                <label className='card__title'>{props.name}</label>
                <div className='card__continent'>
                    <BsGeoAltFill/>
                    <label>{props.region}</label>
                </div>
            </div>
        </NavLink> 
    );
}
 
export default Country;