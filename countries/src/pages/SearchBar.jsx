import React, {useEffect, useState} from 'react';
import { searchCountriesQuery, sortCountriesQuery } from '../utils/queries'
import { useQuery, useQueryClient } from 'react-query';
import {NavLink} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import { Button } from '@chakra-ui/react'
import Select from 'react-select'
import './styles/searchBar.css'

const SearchBar = ({setCurrentPage}) => {

    const queryClient = useQueryClient()
    const { data: cacheClient } = queryClient.getQueryState('countries')
    const [input, setInput] = useState({
        name:"",
        order: "",
        continent: "",
        filter: ""
    })
    
    const searchCountries = useQuery(['countries'], () => searchCountriesQuery(input.name), {
        enabled: false
    })
    
    const sortCountries = useQuery(['countries'], () => sortCountriesQuery([input.continent, input.order, input.filter]), {
        enabled: false
    })
    
    useEffect(() => {
        if (input.name || !input.name) {
            setCurrentPage(1)
            searchCountries.refetch()
        } 
    }, [searchCountries.refetch, input.name])

    useEffect(()=>{
        if(input.continent || input.order || input.filter || !input.order || !input.continent || !input.filter) {
            setCurrentPage(1)
            sortCountries.refetch()
        }
    },[sortCountries.refetch, input.order, input.continent, input.filter])

    // VALUES FOR REACT SELECT

    const optionOrder = [
        {value: '', label: 'All Order'},
        {value: 'order=name ASC', label: 'Ascendente'},
        {value: 'order=name DESC', label: 'Descendente'},
        {value: 'order=population DESC', label: 'Major Population'},
        {value: 'order=population ASC', label: 'Menor Population'}
    ]
    
    const optionFilterContinent = [
        {value: '', label: 'All Continents'},
        {value: 'continent=Europe', label: 'Europe'},
        {value: 'continent=Americas', label: 'Americas'},
        {value: 'continent=Asia', label: 'Asia'},
        {value: 'continent=Africa', label: 'Africa'},
        {value: 'continent=Oceania', label: 'Oceania'}
    ]

    const optionsTourism = [
        {value: '', label: 'All Tourism'}
    ]

    cacheClient?.map((country) => {
        return country.activities?.map(activity => {
            return optionsTourism.push({ value: `filter=${activity.name}`, label: activity.name })
        })
    })
    
    const handleInput = (e) => {setInput({...input.name, name: e.target.value})}
    const selectContinent = (selectedOption) => {
        setInput({...input, continent: selectedOption.value })
    }
    const selectOrder = (selectedOption) => {
        setInput({...input, order: selectedOption.value })
    }
    const selectTourism = (selectedOption) => {
        setInput({...input, filter: selectedOption.value })
    }

    return ( 
        <div className='searchbar'>
            <div className='search_content'>
                <div className='search--textfield-content'>
                    <FaSearch className='search__icon-content'/>
                    <input type="text" placeholder="Search a country..." onChange={handleInput} value={input.name} name='name' className='search__input-content'/>
                </div>

                <NavLink to='/home/post/tourism' >
                    <Button colorScheme='blue'>New tourism</Button>
                </NavLink>
            </div>
            
            <div className='filterBar'>
                <Select className='selectStyle'
                    defaultValue={optionFilterContinent[0]}
                    onChange={selectContinent}
                    name="continent"
                    options={optionFilterContinent}/>

                <Select
                    className='selectStyle'
                    defaultValue={optionOrder[0]}
                    onChange={selectOrder}
                    name="order"
                    options={optionOrder}/>

                <Select
                    className='selectStyle'
                    defaultValue={optionsTourism[0]}
                    onChange={selectTourism}
                    name='filter'
                    options={optionsTourism.filter((current,index,options)=>options.findIndex(tourism=>(tourism.value===current.value))===index)}/>
            </div> 
        </div>
    );
}

export default SearchBar;