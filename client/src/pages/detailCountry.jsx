import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { findIdCountry} from '../actions/actions.js';
import {useParams} from 'react-router-dom';
import './styles/countryDetail.css'

//TODO: Actividades turísticas con toda su información asociada
//TODO: Área (Mostrarla en km2 o millones de km2)

const DetailCountry = () => {
    const dispatch= useDispatch();
    const countryDetail= useSelector(state => state.countryDetail);

    const { id }= useParams();

    useEffect(()=>{
      dispatch(findIdCountry(id))
    },[dispatch, id])

    return ( 
        <div className='pageDetail'>
            <div className="navBarDetail">
                <h2 className='navTitle'>DETAIL COUNTRY</h2>
            </div> 
                       
            <div className='countryDetail'>
                <img className='imgDetail' src={countryDetail.imageFlag} alt={countryDetail.name}/>
                <div>
                    <h1 className='idDetail'>{countryDetail.id}</h1>
                    <h1 className='nameDetail'>{countryDetail.name}</h1>
                    <h3 className='continentDetail'>continent: {countryDetail.continent}</h3>
                    <h3 className='capitalDetail'>capital: {countryDetail.capital}</h3>
                    <h3 className='subregionDetail'>subregion: {countryDetail.subregion}</h3>
                    <h3 className='areaDetail'>area: {countryDetail.area}</h3>
                    <h3 className='populationDetail'>population: {countryDetail.population}</h3>
                </div>
                
            </div>


            <div>
                {/* //TODO: MAPEAR ACTIVIDADES TURISTICAS */}
            </div>
        </div>
    );
}
 
export default DetailCountry;