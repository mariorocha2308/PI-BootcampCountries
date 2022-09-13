import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { getCountryQuery } from '../utils/queries'
import { MdPushPin, MdGpsFixed, MdLanguage, MdSupervisorAccount, MdLoyalty} from 'react-icons/md'
import { NavLink } from 'react-router-dom';
import { Carousel } from 'antd';
import img1 from './images/undraw_a_moment_to_relax_bbpa.svg'
import img2 from './images/undraw_eiffel_tower_-3-gw8.svg'
import img3 from './images/undraw_departing_re_mlq3.svg'
import img4 from './images/undraw_fall_is_coming_yl-0-x.svg'
import Agree from '../components/Modal/Agree';
import 'antd/dist/antd.css';
import './styles/countryDetail.css'
import { useQuery } from 'react-query';

const URL_DEPLOY = process.env.REACT_APP_DEPLOY

const DetailCountry = () => {

    const { id }= useParams();
    const { data: country } = useQuery(['country', id],() => getCountryQuery(id))
    const [visible, setVisible] = useState()
    const [ok, setOk] = useState()

    const km = country?.area / 1000000

    // useEffect(()=>{
    //     dispatch(getCountryQuery(id))
    // },[dispatch, id, ok])

    const onHandleOpen = () => {
        setVisible(true)
    }

    const onHandleClose = () => {
        setVisible(false)
    }

    const onHandleDeleteActivity = (id) => {
    
    }

    const contentStyle = {
        height: '270px',
        color: '#fff',
        alignSelft: 'center',
        margin: 'auto',
    };

    return ( 
        <div className='pageDetail'>
            <div className='pageDetail--content'>
                <div className='details'>
                    <div className='details--info'>
                        <h1 className='nameDetail'>{country?.name}</h1> 
                        <label className='capitalDetail'>{country?.capital}</label>
                        <label className='detail--maps'><MdLanguage/> continent  <label className='detail--maps-in'>{country?.continent}</label></label>
                        <label className='detail--maps'><MdPushPin/> subregion  <label className='detail--maps-in'>{country?.subregion}</label></label>
                        <label className='detail--maps'><MdGpsFixed/> area  <label className='detail--maps-in'>{km} km2</label></label>
                        <label className='detail--maps'><MdSupervisorAccount/> population  <label className='detail--maps-in'>{country?.population}</label></label>
                        <NavLink to='/home/newActivity' className='btn--create-submit'>
                            <button className='button-green'>
                                Create new activity
                            </button>
                        </NavLink>
                    </div>
                    <div className='slider'>
                        <Carousel autoplay>
                            <div>
                            <img src={img1} style={contentStyle} alt='moment to relax'/>
                            </div>
                            <div>
                            <img src={img2} style={contentStyle} alt='eiffel tower'/>
                            </div>
                            <div>
                            <img src={img3} style={contentStyle} alt='departing'/>
                            </div>
                            <div>
                            <img src={img4} style={contentStyle} alt='fall is comming'/>
                            </div>
                        </Carousel>
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
                                <button className='btn-delete' onClick={onHandleOpen}>Delete</button>
                            </div>
                        ))
                    }
                </div>
                <Agree visible={visible} handleOK={() => onHandleDeleteActivity(id)} handleCancel  ={onHandleClose}/>
            </div>
        </div>
    );
}

export default DetailCountry;