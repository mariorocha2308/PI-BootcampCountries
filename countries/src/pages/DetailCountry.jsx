import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import { getCountryQuery } from '../utils/queries'
import { useQuery } from 'react-query';
import './styles/countryDetail.css'
import { Button, Badge, Image, Box } from '@chakra-ui/react';
import ListActivities from '../components/Modal/ListActivities'

const DetailCountry = () => {

    const { id }= useParams();
    const { data: country } = useQuery(['country', id],() => getCountryQuery(id))
    const [visible, setVisible] = useState(false)
    
    const km = country?.area / 1000000

    const onHandleOpen = () => {
        setVisible(true)
    }

    const onHandleClose = () => {
        setVisible(false)
    }

    return ( 
        <div className='pageDetail'>
            <div className='pageDetail--content'>
                <div className='details'>
                    <div className='details--info'>
                        <label className='nameDetail'>{country?.name}</label> 
                        <Badge variant='outline' colorScheme='red' alignSelf='self-start' marginBottom='5'>{country?.capital}</Badge>
                        <label className='detail--maps'>Continent: <label className='detail--maps-in'>{country?.continent}</label></label>
                        <label className='detail--maps'>Subregion: <label className='detail--maps-in'>{country?.subregion}</label></label>
                        <label className='detail--maps'>Area: <label className='detail--maps-in'>{km} km2</label></label>
                        <label className='detail--maps'>Population: <label className='detail--maps-in'>{country?.population}</label></label>
                        
                        <Button colorScheme='teal' width='200px' marginTop='4' onClick={onHandleOpen}>Show activities</Button>
                    </div>
                    <Box width='90%' height='100%' maxW='500px'>
                        <Image src={country?.imageFlag} alt={country?.id} objectFit='cover' height='100%' width='100%' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px' borderRadius='10px'/>
                    </Box>
                </div>
                <ListActivities isOpen={visible} onClose={onHandleClose} id={id}/>
            </div>
        </div>
    );
}

export default DetailCountry