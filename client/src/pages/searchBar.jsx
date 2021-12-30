import {findNameCountry, orderBy, filterBy} from '../actions/actions.js'
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FiSearch} from 'react-icons/fi'

const SearchBar = () => {

    let extra = useSelector(state => state.allCountries)
    const dispatch = useDispatch()

    const[input, setInput]= useState({
        name:"",
        order: "",
        continent: "",
        tourism: ""
    })

    useEffect(()=>{

        if (input.name) {
            dispatch(findNameCountry(input.name))
        } else if (input.order){
            dispatch(orderBy(input.order))
        } else if(input.continent || input.tourism) {
            dispatch(filterBy(input.continent, input.tourism))
        }

    },[ dispatch,input.name, input.order, input.continent, input.tourism])

    function handleName (e) {setInput({...input, name:e.target.value})}
    function handleOrder(e) {setInput({...input, order: e.target.value})}
    function handleFilterContinent(e) {setInput({...input, continent:e.target.value})}
    function handleFilterTourism(e) {setInput({...input, tourism:e.target.value})}

    return ( 
        <div className='searchbar'>
            <div className='filterBar'>
                
                <select className='selectOption' onChange={handleOrder} value={input.order}>
                    <option value=''>Order By</option>
                    <option value='ASC'>ASC</option>
                    <option value='DESC'>DESC</option>
                    <option value='Major Population'>Major Population</option>
                    <option value='Menor Population'>Menor Population</option>
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

                <select className='selectOption' onChange={handleFilterTourism} value={input.tourism}>
                    <option value="">Filter By Tourism</option>
                    {
                        extra.map((country) => country.activities?.map(activity => (
                            <option value={activity.name}>{activity.name}</option>
                        )))
                    }
                </select>

            </div> 
            <div className='search_content'>
                <FiSearch className='search__icon'/>
                <input type="text" placeholder="Search..." onChange={handleName} value={input.name} className='search__input'/>
            </div>
        </div>
    );
}

export default SearchBar;