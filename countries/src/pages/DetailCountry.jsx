import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import { getCountryQuery, deleteActivityQuery } from '../utils/queries'
import { MdLoyalty} from 'react-icons/md'
import { NavLink } from 'react-router-dom';
import Agree from '../components/Modal/Agree';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import './styles/countryDetail.css'
import { Button, Badge } from '@chakra-ui/react';

const DetailCountry = () => {

    const { id }= useParams();
    const queryClient = useQueryClient()
    const { data: country } = useQuery(['country', id],() => getCountryQuery(id))
    const { mutate, isError, error, isLoading } = useMutation(deleteActivityQuery, {
        onSuccess: () => {
            queryClient.invalidateQueries(['country', id])
            onHandleClose()
        }
    })
    const [visible, setVisible] = useState()
    const [target, setId] = useState()

    const km = country?.area / 1000000

    const onHandleOpen = (value) => {
        setVisible(true)
        setId(value)
    }

    const onHandleClose = () => {
        setVisible(false)
    }

    return ( 
        <div className='pageDetail'>
            <div className='pageDetail--content'>
                <div className='details'>
                    <div className='details--info'>
                        <h1 className='nameDetail'>{country?.name}</h1> 
                        <Badge variant='outline' colorScheme='red' alignSelf='self-start' marginY='3'>{country?.capital}</Badge>
                        <label className='detail--maps'>Continent: <label className='detail--maps-in'>{country?.continent}</label></label>
                        <label className='detail--maps'>Subregion: <label className='detail--maps-in'>{country?.subregion}</label></label>
                        <label className='detail--maps'>Area: <label className='detail--maps-in'>{km} km2</label></label>
                        <label className='detail--maps'>Population: <label className='detail--maps-in'>{country?.population}</label></label>
                        <NavLink to='/home/post/tourism' className='btn--create-submit'>
                            <Button colorScheme='green'>
                                Create new activity
                            </Button>
                        </NavLink>
                    </div>
                    <div style={{width: '40%', height: '100%'}}>
                        <img src={country?.imageFlag} alt={country?.id} style={{objectFit: 'cover', borderRadius: '10px'}}/>
                    </div>
                </div>
                <hr/>
                <h1 className='nameDetail'><MdLoyalty/> Tourism Activities {country?.activities?.length}</h1>
                <div className='cardsActivity'>
                    { 
                        country?.activities === undefined || country?.activities?.length === 0 ? 
                        <label className='loading'>Activities empty</label> : 
                        country?.activities?.map((activity) => (
                            <div key={activity.id} className='cardActivity'>
                                <label className='titleActivity'>{activity.name}</label>
                                <div className='containerActivity'>
                                    <label className='DDSActivity'>Difficult: {activity.difficult}</label>
                                    <label className='DDSActivity'>Duration: {activity.duration}</label>
                                    <label className='DDSActivity'>Season: {activity.season}</label>
                                </div>
                                <button className='btn-delete' onClick={() => onHandleOpen(activity.id)}>Delete</button>
                            </div>
                        ))
                    }
                </div>
                <Agree isOpen={visible} handleAgree={() => mutate(target)} handleClose={onHandleClose}/>
            </div>
        </div>
    );
}

export default DetailCountry;