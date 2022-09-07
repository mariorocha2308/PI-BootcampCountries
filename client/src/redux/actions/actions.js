import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCountries, setCountry, setList } from "../reducer/reducerSlice";
const URL_DEPLOY = process.env.REACT_APP_DEPLOY

export const postActivityQuery = (input) => {
  fetch(`${URL_DEPLOY}/activity`, {
    method: 'POST',
    body: JSON.stringify(input),
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

export const getCountriesQuery = createAsyncThunk('reducer/getCountriesQuery', (_, { dispatch }) => {
  try {    
    fetch(`${URL_DEPLOY}/countries`)
    .then(response => response.json())
    .then(result => dispatch(setCountries(result)))
  } catch (error) {
    console.log(error);
  }
})

export const getCountryQuery = createAsyncThunk('reducer/getCountryQuery', (id, { dispatch }) => {
  try {    
    fetch(`${URL_DEPLOY}/countries/${id}`)
    .then(response => response.json())
    .then(result => dispatch(setCountry(result)))
  } catch (error) {
    console.log(error);
  }
})

export const searchCountryQuery = createAsyncThunk('reducer/searchCountryQuery', (name, { dispatch }) => {
  try {   
    fetch(`${URL_DEPLOY}/countries?name=${name}`)
    .then(response => response.json())
    .then(result => dispatch(setList(result)))
  } catch (error) {
    console.log(error);
  }
})