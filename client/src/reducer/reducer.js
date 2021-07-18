import {GET_ALL_COUNTRIES, FIND_COUNTRY } from '../actions/actions.js'

const initialState = {
    allCountries: [],
    countrySearched: []
}

export default function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                allCountries: action.payload
            }
        //TODO: COMPLETAR ESTA ACTION PARA SU DISPATCH
        // case FIND_COUNTRY:
        //     return{
        //         ...state,
        //         countrySearched: action.payload
        //     }  
    
        default:
            return state;
    }
}