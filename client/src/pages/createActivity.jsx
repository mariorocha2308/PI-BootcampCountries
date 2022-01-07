import React, { useState } from 'react';
import './styles/createTourism.css'
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import image from './images/undraw_eiffel_tower_-3-gw8.svg'

function post (input) {
    fetch('http://localhost:3001/activity', {
        method: 'POST',
        body: JSON.stringify(input),
        headers:{
          'Content-Type': 'application/json'
        }
    })
}

const CreateActivity = () => {

    const history = useHistory();

    let state = useSelector(state => state.allCountries)

    //* LOGICA EL ESTADO DEL FORM 
    const [input, setInput]= useState({
        name:"",
        duration: "",
        season: "",
        difficult: "",
        codeCountry: [],
    })

    function handleTitle(e){setInput({...input, name:e.target.value})}
    function handleDifficult(e){setInput({...input, difficult:e.target.value})}
    function handleDuration(e){setInput({...input, duration:e.target.value})} 
    function handleSeason(e){setInput({...input, season:e.target.value})}
    function handleCountries(e){setInput({...input, codeCountry:input.codeCountry.concat(e.target.value)})}

    function submitForm(e){
        e.preventDefault()
        
            if (!input.name) {
                alert('Title is required')
            } else if(!input.difficult){
                alert('Difficult is required')
            } else if(!input.duration){
                alert('Duration is required')
            } else if(!input.season){
                alert('Season is required')
            } else if(input.codeCountry.length === 0){
                alert('CodeCountry is required')
            } else {
                post(input)
                stateReset()
                alert('Actividad Agregada') 
                history.push("/");
            }    
    }

    
    function stateReset(){
        setInput({
            name:"",
            duration: "",
            season: "",
            difficult: "",
            codeCountry: [],
        })
    }

    return ( 
        <div className='create_activity'>
            <div className='form__content'>
                <label className='create__title'>Create activity</label>
                <form onSubmit={submitForm} className='container_create' >
                    <div >
                        <label className='titleCreate'>Title</label>
                        <input type="text" onChange={handleTitle} value={input.name}/>     
                    </div>
                    <div>

                    <select onChange={handleDifficult} value={input.difficult} className='selectCreate'>
                        <option value='default'>Select difficult</option>
                        <option value="Baja">Baja</option>
                        <option value="Media-Baja">Media-Baja</option>
                        <option value="Media">Media</option>
                        <option value="Media-Alta">Media-Alta</option>
                        <option value="Alta">Alta</option>
                        <option value="Extrema">Extrema</option>
                    </select>

                    <select onChange={handleDuration} value={input.duration} className='selectCreate'>
                        <option value='default'>Select duration</option>
                        <option value="1 hr aprox">1 hr aprox</option>
                        <option value="2 hrs aprox">2 hrs aprox</option>
                        <option value="4 hrs aprox">4 hrs aprox</option>
                        <option value="6 hrs aprox">6 hrs aprox</option>
                        <option value="8 hrs aprox">8 hrs aprox</option>
                        <option value="10 hrs aprox">10 hrs aprox</option>
                        <option value="Dias indefinidos">Dias indefinidos</option>
                    </select>

                    <select onChange={handleSeason} value={input.season} className='selectCreate'>
                        <option value='default'>Select season</option>
                        <option value='Summer'>Summer</option>
                        <option value='Autumn'>Autumn</option>
                        <option value='Winter'>Winter</option>
                        <option value='Spring'>Spring</option>
                    </select>
                    
                    <select onChange={handleCountries} value={input.codeCountry}className='listCreate'>
                        <option value="">Select Country</option>
                        {
                            state.map((country) =>( 
                                <option value={country.id} key={country.id}>
                                {country.name} </option>
                        
                            ))
                        }
                    </select>
                    </div>

                    <button className='activity_button'>
                        Create
                    </button>
                </form>        
            </div>
            <img src={image} alt="" className='image-create'/>

        </div> 
    );
}
 
export default CreateActivity;