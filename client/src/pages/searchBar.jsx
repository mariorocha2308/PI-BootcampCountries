import {findNameCountry, orderBy, filterBy, getAllCountries} from '../actions/actions.js'
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FaSearch} from 'react-icons/fa'
import {NavLink} from 'react-router-dom'
import './styles/searchBar.css'
import { Button, Icon } from 'semantic-ui-react'
import Select from 'react-select'

const SearchBar = () => {
    
    let extra = useSelector(state => state.allCountries)
    const dispatch = useDispatch()
    
    const[input, setInput]= useState({
        name:"",
        order: "",
        continent: "",
        tourism: ""
    })

        
    function handleInput (e) {setInput({...input.name, name: e.target.value})}

    useEffect(()=>{

        if (input.name) {
            dispatch(findNameCountry(input.name))
        } else if (input.order){
            dispatch(orderBy(input.order))
        } else if(input.continent || input.tourism) {
            dispatch(filterBy(input.continent, input.tourism))
        } else{
            dispatch(getAllCountries())
        }

    },[ dispatch,input.name, input.order, input.continent, input.tourism])

    // VALUES FOR REACT SELECT

    const optionOrder = [
        {value: '', label: 'All Order'},
        {value: 'ASC', label: 'Ascendente'},
        {value: 'DESC', label: 'Descendente'},
        {value: 'Major Population', label: 'Major Population'},
        {value: 'Menor Population', label: 'Menor Population'}
    ]

    const optionFilterContinent = [
        {value: '', label: 'All Continents'},
        {value: 'Europe', label: 'Europe'},
        {value: 'Americas', label: 'Americas'},
        {value: 'Asia', label: 'Asia'},
        {value: 'Africa', label: 'Africa'},
        {value: 'Oceania', label: 'Oceania'},
        {value: 'Polar', label: 'Polar'}
    ]

    const defaultFilterTourism = [
        {value: '', label: 'All Tourism'}
    ]
    let optionsTourism = extra.activities?.map(function (activity) {
        return { value: activity.name, label: activity.name };
    })

    const selectContinent = (selectedOption) => {
        setInput({...input.continent, continent: selectedOption.value })
    }
    const selectOrder = (selectedOption) => {
        setInput({...input.order, order: selectedOption.value })
    }
    const selectTourism = (selectedOption) => {
        setInput({...input.tourism, tourism: selectedOption.value })
    }

    return ( 
        <div className='searchbar'>
            <div className='search_content'>
                <div className='search__textfield-content'>
                    <FaSearch className='search__icon-content'/>
                    <input type="text" placeholder="Search a country..." onChange={handleInput} value={input.name} name='name' className='search__input-content'/>
                </div>

                <NavLink to='/home/newActivity' >
                    <Button icon color='twitter'><Icon name='edit'/>  New tourism</Button>
                </NavLink>
            </div>
            
            <div className='filterBar'>

                <Select
                    className='selectStyle'
                    defaultValue={optionFilterContinent[0]}
                    onChange={selectContinent}
                    name="continent"
                    options={optionFilterContinent}
                    />

                <Select
                    className='selectStyle'
                    defaultValue={optionOrder[0]}
                    onChange={selectOrder}
                    name="order"
                    options={optionOrder}
                    />
                <Select
                    className='selectStyle'
                    defaultValue={defaultFilterTourism[0]}
                    onChange={selectTourism}
                    name='tourism'
                    options={optionsTourism}
                    />

            </div> 
        </div>
    );
}

export default SearchBar;