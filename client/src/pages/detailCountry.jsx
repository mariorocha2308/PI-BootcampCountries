import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { findIdCountry} from '../actions/actions.js';
import {useParams} from 'react-router-dom';
import './styles/countryDetail.css'
import { Button } from 'semantic-ui-react'
import { MdPushPin, MdGpsFixed, MdLanguage, MdSupervisorAccount, MdLoyalty} from 'react-icons/md'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import img1 from './images/undraw_a_moment_to_relax_bbpa.svg'
import img2 from './images/undraw_eiffel_tower_-3-gw8.svg'
import img3 from './images/undraw_departing_re_mlq3.svg'
import img4 from './images/undraw_fall_is_coming_yl-0-x.svg'


const URL_DEPLOY = process.env.REACT_APP_DEPLOY

const DetailCountry = () => {
    const dispatch= useDispatch();
    const countryDetail = useSelector(state => state.countryDetail);
    const [flag, setFlag] = useState()
    const [ok, setOk] = useState()

    //*CONVIERTE EL AREA M2 A KM2
    const km = countryDetail.area / 1000000

    const { id }= useParams();

    useEffect(()=>{
        fetch('https://restcountries.com/v3.1/all')
        .then(data => data.json())
        .then(result => {
            result.filter(country => country.cca2 === id ? setFlag(country.flag) : null)
        })
        dispatch(findIdCountry(id))
    },[dispatch, id, ok])

    const handleDeleteActivity = (id) => {
        fetch(`${URL_DEPLOY}/delete/activity/${id}`,{
            method: 'DELETE'
        })
        .then(data => data.json())
        .then(result => result ?
            Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
                ).then(result => setOk(id))
            }
            }) :
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
            })
        )
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
                        <h1 className='nameDetail'>{countryDetail.name} {flag}</h1> 
                        <label className='capitalDetail'>{countryDetail.capital}</label>
                        <label className='detail--maps'><MdLanguage/> continent  <label className='detail--maps-in'>{countryDetail.continent}</label></label>
                        <label className='detail--maps'><MdPushPin/> subregion  <label className='detail--maps-in'>{countryDetail.subregion}</label></label>
                        <label className='detail--maps'><MdGpsFixed/> area  <label className='detail--maps-in'>{km} km2</label></label>
                        <label className='detail--maps'><MdSupervisorAccount/> population  <label className='detail--maps-in'>{countryDetail.population}</label></label>
                        <NavLink to='/home/newActivity' className='btn--create-submit'>
                            <Button inverted color='green'>
                                Create new activity
                            </Button>
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
                <h1 className='nameDetail'><MdLoyalty/> Tourism Activities {countryDetail?.activities?.length}</h1>
                <div className='cardsActivity'>
                    { 
                        countryDetail.activities === undefined || countryDetail?.activities?.length === 0 ? 
                        <label className='loading'>Activities empty</label> : 
                        countryDetail.activities?.map((activity) => (
                            <div key={activity.id} className='cardActivity'>
                                <label className='titleActivity'>{activity.name}</label>
                                <div className='containerActivity'>
                                    <label className='DDSActivity'>Difficult: {activity.difficult}</label>
                                    <label className='DDSActivity'>Duration: {activity.duration}</label>
                                    <label className='DDSActivity'>Season: {activity.season}</label>
                                </div>
                                <button className='btn-delete' onClick={() => handleDeleteActivity(activity.id)}>Delete</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
 
export default DetailCountry;