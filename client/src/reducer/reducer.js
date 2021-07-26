import {GET_ALL_COUNTRIES, GET_COUNTRY_DETAIL, GET_COUNTRY_NAME, ORDER_BY, FILTER_BY} from '../actions/actions.js'

const initialState = {
    allCountries: [],
    countryDetail:{}
}

export default function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                allCountries: action.payload
            }
        case GET_COUNTRY_DETAIL:
            return{
                ...state,
                countryDetail: action.payload
            }
        case GET_COUNTRY_NAME:
            return{
                ...state,
                allCountries: action.payload
            }
        case ORDER_BY: 
            return {
                ...state,
                allCountries: action.payload
            }
        case FILTER_BY: 
            return {
                ...state,
                allCountries: action.payload
            }
        default:
            return state;
    }
}