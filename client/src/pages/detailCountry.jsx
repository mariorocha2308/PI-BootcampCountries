import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { findIdCountry} from '../actions/actions.js';
import {useParams} from 'react-router-dom';
import Chart from "react-google-charts";
import './styles/countryDetail.css'
import { Button } from 'semantic-ui-react'
import { MdBrightness4, MdPushPin, MdGpsFixed, MdLanguage, MdSupervisorAccount, MdLoyalty} from 'react-icons/md'
import {IoFlagSharp} from 'react-icons/io5'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'

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
        fetch(`http://localhost:3001/delete/activity/${id}`,{
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


    return ( 
        <div className='pageDetail'>
            <div className='countryDetail'>
                <div>
                    <Chart
                        chartType="GeoChart"
                        data={[["Country"], [`${countryDetail.id}`]]}
                        options={{region: `${countryDetail.id}`, tooltip: { trigger: 'none' },  defaultColor: "#92b8fd", datalessRegionColor: 'white', backgroundColor: 'rgb(250, 250, 250)'}}
                        height="85vh"
                    />
                </div>
                <div className='details--info'>
                    <div className='name--time'>
                        <h1 className='nameDetail'>{countryDetail.name} {flag}</h1> 
                        <label className='timezone'><MdBrightness4/> {countryDetail.timezones}</label>
                    </div>
                    <label className='capitalDetail'><IoFlagSharp/> {countryDetail.capital}</label>
                    <NavLink to='/home/newActivity' >
                        <Button inverted color='green'>
                            Create new activity
                        </Button>
                    </NavLink>
                    <hr/>

                    <label className='detail--maps'><MdLanguage/> continent  <label className='detail--maps-in'>{countryDetail.continent}</label></label>

                    <label className='detail--maps'><MdPushPin/> subregion  <label className='detail--maps-in'>{countryDetail.subregion}</label></label>

                    <label className='detail--maps'><MdGpsFixed/> area  <label className='detail--maps-in'>{km} km2</label></label>

                    <label className='detail--maps'><MdSupervisorAccount/> population  <label className='detail--maps-in'>{countryDetail.population}</label></label>
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
        </div>
    );
}
 
export default DetailCountry;