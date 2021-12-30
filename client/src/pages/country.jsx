import './styles/country.css'
import { NavLink } from 'react-router-dom'
import { CgArrowLongRight } from "react-icons/cg";
import {MdLabel} from 'react-icons/md' 
import {BiWorld} from 'react-icons/bi'
const Country = (props) => {
    return ( 
        <div className='card'>
            <div className='image_content'>
                <img src={props.image} alt={props.name} className='card__image'/>
            </div>
            <label className='card__title'><MdLabel/> {props.name}</label>
            <label className='card__continent'><BiWorld/> {props.region}</label>
            <div className='detail_content'>
                <NavLink to={`/home/countries/${props.id}`} className='card__more' >view detail <CgArrowLongRight/></NavLink>
            </div>
        </div> 
    );
}
 
export default Country;