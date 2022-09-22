import React, {useEffect, useState} from 'react';
import { searchCountriesQuery, sortCountriesQuery } from '../utils/queries'
import { optionFilterContinent, optionOrder } from '../utils/selects'
import { useQuery, useQueryClient } from 'react-query';
import PostTourism from '../components/Modal/PostTourism';
import {FaSearch, FaFilter} from 'react-icons/fa'
import { Box, Button, Input, InputGroup, InputRightElement, InputLeftElement, Icon, IconButton, Popover, PopoverContent, PopoverTrigger, PopoverBody, PopoverHeader, PopoverCloseButton, Stack } from '@chakra-ui/react'
import Select from 'react-select'

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
        <Box display='flex' justifyContent='center'>
            <InputGroup size='md' mr='3'
            w={['100%','70%', '60%', '40%']} >
                <InputLeftElement pointerEvents='none'
                    children={<Icon as={FaSearch} color='gray.500' />}/>

                <Input type='text' onChange={handleInput} value={input.name} name='name' placeholder='Search a country' fontFamily='Poppins' variant='filled' />

                <InputRightElement width='5em'>
                    <Button size='sm' colorScheme='teal' onClick={onHandleOpen}>Create</Button>
                </InputRightElement>
            </InputGroup>

            <Popover>
                <PopoverTrigger>
                    <IconButton
                    variant='ghost'
                    icon={<Icon as={FaFilter} color='gray.500' />}
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverCloseButton />
                    <PopoverHeader>Filter and sort</PopoverHeader>
                    <PopoverBody display='flex' flexDirection='column'>
                        <Stack spacing='2'>
                            <Select name="continent"
                                defaultValue={optionFilterContinent[0]}
                                onChange={selectContinent}
                                options={optionFilterContinent}/>
                
                            <Select name="order"
                                defaultValue={optionOrder[0]}
                                onChange={selectOrder}
                                options={optionOrder}/>
                
                            <Select name='filter'
                                defaultValue={optionsTourism[0]}
                                onChange={selectTourism}
                                options={optionsTourism.filter((current,index,options)=>options.findIndex(tourism=>(tourism.value===current.value))===index)}/>
                        </Stack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>

            <PostTourism isOpen={visible} onClose={onHandleClose}/> 
        </Box>
    );
}

export default SearchBar;