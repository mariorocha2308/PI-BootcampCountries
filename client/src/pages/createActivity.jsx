import React, { useState, useEffect } from 'react';
import './styles/createTourism.css'
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import Select from 'react-select'
import { getAllCountries} from '../actions/actions.js';
import { Form, Input, Message, Button } from 'semantic-ui-react'
import makeAnimated from 'react-select/animated';
const URL_DEPLOY = process.env.REACT_APP_DEPLOY

function post (input) {
    fetch(`${URL_DEPLOY}/activity`, {
        method: 'POST',
        body: JSON.stringify(input),
        headers:{
          'Content-Type': 'application/json'
        }
    })
}

const CreateActivity = () => {

    const dispatch = useDispatch();
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
    const [isLoad, setIsLoad] = useState()

    useEffect(()=>{
        dispatch(getAllCountries())
    },[dispatch])

    // VALUES FOR REACT SELECT
    const optionDifficult = [
        {value: '', label: 'Difficult'},
        {value: 'Baja', label: 'Baja'},
        {value: 'Media-Baja', label: 'Media-Baja'},
        {value: 'Media', label: 'Media'},
        {value: 'Media-Alta', label: 'Media-Alta'},
        {value: 'Alta', label: 'Alta'},
        {value: 'Extrema', label: 'Extrema'}
    ]

    const optionDuration = [
        {value: '', label: 'Duration'},
        {value: '1 hr aprox', label: '1 hr aprox'},
        {value: '2 hrs aprox', label: '2 hrs aprox'},
        {value: '4 hrs aprox', label: '4 hrs aprox'},
        {value: '6 hrs aprox', label: '6 hrs aprox'},
        {value: '8 hrs aprox', label: '8 hrs aprox'},
        {value: '10 hrs aprox' , label: '10 hrs aprox'},
        {value: 'Dias indefinidos', label: 'Dias indefinidos'}
    ]

    const optionSeason = [
        {value: '', label: 'Season'},
        {value: 'Summer', label: 'Summer'},
        {value: 'Autumn', label: 'Autumn'},
        {value: 'Winter', label: 'Winter'},
        {value: 'Spring', label: 'Spring'},
    ]

    const animatedComponents = makeAnimated();
    let optionsCountry = state.map(function (country) {
        return { value: country.id, label: country.name };
    })

    function handleTitle(e){setInput({...input, name:e.target.value})}
    function handleDifficult(e){setInput({...input, difficult:e.value})}
    function handleDuration(e){setInput({...input, duration:e.value})} 
    function handleSeason(e){setInput({...input, season:e.value})}

    function handleCountries(e){
        setInput({...input, codeCountry: Array.isArray(e) ? e.map((x) => x.value) : []});
    }

    function submitForm(e){
        e.preventDefault()
        
        setIsLoad(true)
        post(input)
        setTimeout(() => {
            setIsLoad(false)
            setInput({
                name:"",
                duration: "",
                season: "",
                difficult: "",
                codeCountry: [],
            })
            history.push('/')
        }, 4000);
    }

    return ( 
        <div className='create_activity'>
            <div className='form__content'>
                <Form onSubmit={submitForm} >
                    <Form.Field
                        id='form-input-control-first-name'
                        control={Input}
                        onChange={handleTitle}
                        placeholder='Title of activity'
                        />

                    <div className='selects'>
                        <Select
                            className='responsive'
                            onChange={handleDifficult} 
                            name='difficult'
                            defaultValue={optionDifficult[0]}
                            options={optionDifficult}
                        />

                        <Select 
                            onChange={handleDuration} 
                            name='duration'
                            className='responsive'
                            defaultValue={optionDuration[0]}
                            options={optionDuration}
                            />

                        <Select
                            className='responsive'
                            onChange={handleSeason} 
                            name='season' 
                            defaultValue={optionSeason[0]}
                            options={optionSeason}
                            />
                    </div>

                    <Select 
                        className='selectStyleCountry'
                        isMulti
                        onChange={handleCountries} 
                        name='codeCountry'
                        options={optionsCountry}
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        placeholder='Select countries..'
                        />

                    {
                        !input.name || !input.difficult || !input.duration || !input.season || input.codeCountry.length === 0 ?
                        <Message negative>
                            <Message.Header>Sorry, there are fields empty</Message.Header>
                            <p>if you need create new country is require all complete fields</p>
                        </Message>
                        : 
                        <Button positive loading={isLoad}>Create</Button>
                    }
                    
                </Form>        
            </div>

        </div> 
    );
}
 
export default CreateActivity;