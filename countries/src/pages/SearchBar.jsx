import React, {useEffect, useState} from 'react';
import { searchCountriesQuery, sortCountriesQuery } from '../utils/queries'
import { optionFilterContinent, optionOrder } from '../utils/selects'
import { useQuery, useQueryClient } from 'react-query';
import PostTourism from '../components/Modal/PostTourism';
import {FaSearch} from 'react-icons/fa'
import { Button } from '@chakra-ui/react'
import Select from 'react-select'
import './styles/searchBar.css'

const SearchBar = ({setCurrentPage}) => {

    const queryClient = useQueryClient()
    const { data: cacheClient } = queryClient.getQueryState('countries')
    const [visible, setVisible] = useState(false)
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
    const onHandleClose = () => {
        setVisible(false)
    }
    const onHandleOpen = () => {
        setVisible(true)
    }
    
    return ( 
        <section className='searchbar'>
            <section className='search_content'>
                <div className='search--textfield-content'>
                    <FaSearch className='search__icon-content'/>
                    <input type="text" placeholder="Search a country..." onChange={handleInput} value={input.name} name='name' className='search__input-content'/>
                </div>

                <Button colorScheme='blue' onClick={onHandleOpen}>New tourism</Button>
            </section>
            
            <section className='filterBar'>
                <Select className='selectStyle' name="continent"
                    defaultValue={optionFilterContinent[0]}
                    onChange={selectContinent}
                    options={optionFilterContinent}/>

                <Select className='selectStyle' name="order"
                    defaultValue={optionOrder[0]}
                    onChange={selectOrder}
                    options={optionOrder}/>

                <Select className='selectStyle' name='filter'
                    defaultValue={optionsTourism[0]}
                    onChange={selectTourism}
                    options={optionsTourism.filter((current,index,options)=>options.findIndex(tourism=>(tourism.value===current.value))===index)}/>
            </section>
            <PostTourism isOpen={visible} onClose={onHandleClose}/> 
        </section>
    );
}

export default SearchBar;