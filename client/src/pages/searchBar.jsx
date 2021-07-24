import {findNameCountry} from '../actions/actions.js'
import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
    const dispatch = useDispatch()

    const[input, setInput]= useState({
        name:"",
    })

    useEffect(()=>{
        dispatch(findNameCountry(input.name))
    },[input.name])

    let handleName = (e)=> setInput({...input, name:e.target.value})

    return ( 
        <div className='filterBar'>
            <div className='filterBar'>
                <select className='selectOption'>
                <option defaulvalue='true'>Order By</option>
                <option value='asc'>ASC</option>
                <option value='desc'>DESC</option>
                <option value='population'>Population</option>
                </select>

                <select className='selectOption'>
                <option defaulvalue='true'>Filter By</option>
                <option value='continent'>Continent</option>
                <option value='tourism'>Tourism</option>
                </select>

            </div> 
            
            <input type="text" placeholder="Search" className='input' onChange={handleName} value={input.name}/>
        </div>
     );
}
 
export default SearchBar;