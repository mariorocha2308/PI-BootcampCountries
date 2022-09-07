import {findNameCountry, orderBy, getAllCountries} from '../actions/actions.js'
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FaSearch} from 'react-icons/fa'
import {NavLink} from 'react-router-dom'
import './styles/searchBar.css'
import { Button } from 'antd'
import Select from 'react-select'

const SearchBar = ({setCurrentPage}) => {
    
    const { allCountries } = useSelector(state => state.reducerSlice)
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
            setCurrentPage(1)
            dispatch(findNameCountry(input.name))
        } else {
            setCurrentPage(1)
            dispatch(getAllCountries())
        }
        
        if(input.continent || input.order || input.tourism) {
            setCurrentPage(1)
            dispatch(orderBy({continent: input.continent, order: input.order, tourism: input.tourism}))
        }else{
            setCurrentPage(1)
            dispatch(orderBy({continent: input.continent, order: input.order, tourism: input.tourism}))
        }

    },[ dispatch,input.name, input.order, input.continent, input.tourism, setCurrentPage])

    // VALUES FOR REACT SELECT

    const optionOrder = [
        {value: '', label: 'All Order'},
        {value: 'name ASC', label: 'Ascendente'},
        {value: 'name DESC', label: 'Descendente'},
        {value: 'population DESC', label: 'Major Population'},
        {value: 'population ASC', label: 'Menor Population'}
    ]

    const optionFilterContinent = [
        {value: '', label: 'All Continents'},
        {value: 'Europe', label: 'Europe'},
        {value: 'Americas', label: 'Americas'},
        {value: 'Asia', label: 'Asia'},
        {value: 'Africa', label: 'Africa'},
        {value: 'Oceania', label: 'Oceania'}
    ]

    let optionsTourism = [
        {value: '', label: 'All Tourism'}
    ]
    
    allCountries?.map((country) => {
        return country.activities?.map(activity => {
            return optionsTourism.push({ value: activity.name, label: activity.name })
        })
    })

    const selectContinent = (selectedOption) => {
        setInput({...input, continent: selectedOption.value })
    }
    const selectOrder = (selectedOption) => {
        setInput({...input, order: selectedOption.value })
    }
    const selectTourism = (selectedOption) => {
        setInput({...input, tourism: selectedOption.value })
    }

    return ( 
        <div className='searchbar'>
            <div className='search_content'>
                <div className='search__textfield-content'>
                    <FaSearch className='search__icon-content'/>
                    <input type="text" placeholder="Search a country..." onChange={handleInput} value={input.name} name='name' className='search__input-content'/>
                </div>

                <NavLink to='/home/newActivity' >
                    <Button type='primary'>New tourism</Button>
                </NavLink>
            </div>
            
            <div className='filterBar'>

                <Select
                    className='selectStyle'
                    defaultValue={optionFilterContinent[0]}
                    onChange={selectContinent}
                    name="continent"
                    options={optionFilterContinent}
                    isDisabled={input.tourism}
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
                    defaultValue={optionsTourism[0]}
                    onChange={selectTourism}
                    name='tourism'
                    options={optionsTourism.filter((current,index,options)=>options.findIndex(tourism=>(tourism.value===current.value))===index)}
                    isDisabled={input.continent}
                />
            </div> 
        </div>
    );
}

export default SearchBar;