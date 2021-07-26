import {findNameCountry, orderBy, filterBy} from '../actions/actions.js'
import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';

//* [ ] Botones/Opciones para filtrar por continente y por tipo de actividad turística

const SearchBar = () => {
    const dispatch = useDispatch()

    const[input, setInput]= useState({
        name:"",
        order: "",
        continent: ""
    })

    useEffect(()=>{
        if (input.name) {
            dispatch(findNameCountry(input.name))
        } else if (input.order){
            dispatch(orderBy(input.order))
        } else if(input.continent) {
            dispatch(filterBy(input.continent))
        }
        
    },[input.name, input.order, input.continent])

    function handleName (e) {setInput({...input, name:e.target.value})}
    function handleOrder(e) {setInput({...input, order:e.target.value})}
    function handleFilterContinent(e) {setInput({...input, continent:e.target.value})}

    return ( 
        <div className='filterBar'>
            <div className='filterBar'>
                <select className='selectOption' onChange={handleOrder} value={input.order}>
                <option value=''>Order By</option>
                <option value='ASC'>ASC</option>
                <option value='DESC'>DESC</option>
                <option value='population DESC'>Major Population</option>
                <option value='population ASC'>Menor Population</option>
                </select>
                
                <select className='selectOption' onChange={handleFilterContinent} value={input.continent}>
                    <option value="">Filter By Continent</option>
                    <option value="Europe">Europe</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Polar">Polar</option>
                </select>

                {/* TODO: FUNCTION SIN COMPLETAR AUN */}
                <select className='selectOption'>
                    <option value="">Filter By Tourism</option>
                </select>

            </div> 
            
            <input type="text" placeholder="Search" className='input' onChange={handleName} value={input.name}/>
        </div>
     );
}
 
export default SearchBar;