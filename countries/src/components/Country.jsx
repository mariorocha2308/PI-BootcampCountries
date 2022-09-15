import './styles/Country.css'
import { NavLink } from 'react-router-dom'
import {BsGeoAltFill} from 'react-icons/bs'

const Country = props => {
    
    return (
        <NavLink to={`/home/country/${props.id}`}>
            <section className='card'>
                <img src={props.image} alt={props.name} className='card__image'/>
                <section className='overlay'>
                    <label className='card__title'>{props.name}</label> 
                    <section className='card__continent'>
                        <BsGeoAltFill/>
                        <label>{props.region}</label>
                    </section>
                </section>
            </section>
        </NavLink> 
    );
}

export default Country;