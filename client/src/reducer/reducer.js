import {GET_ALL_COUNTRIES, GET_COUNTRY_DETAIL, NEXT_PAGE, PREV_PAGE, GET_COUNTRY_NAME} from '../actions/actions.js'

const initialState = {
    allCountries: [],
    countryDetail:{},
    offset: 0,
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
        case NEXT_PAGE: 
            return {
                ...state,
                allCountries: action.payload.page,
                offset: action.payload.offset
            }
        case PREV_PAGE: 
            return {
                ...state,
                allCountries: action.payload.page,
                offset: action.payload.offset
            }
        case GET_COUNTRY_NAME:
            return{
                ...state,
                allCountries: action.payload
            }
        default:
            return state;
    }
}