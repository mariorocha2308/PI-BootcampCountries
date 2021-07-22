export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const NEXT_PAGE = "NEXT_PAGE"
export const PREV_PAGE = "PREV_PAGE"

export const getAllCountries = () => {
    return async function(dispatch){
        const response = await fetch(`http://localhost:3001/countries`);
        const json = await response.json();
        dispatch({
            type: GET_ALL_COUNTRIES,
            payload: json
        });
    }
}

export function findIdCountry(id) {
    return function (dispatch) {
      return fetch(`http://localhost:3001/countries/${id}`)
      .then(response => response.json())
        .then(json => {
          dispatch({
              type: GET_COUNTRY_DETAIL, 
              payload: json            
          }); 
       })
     }
}

export function nextPage(num) {
    return function (dispatch, getState) {
        const {offset} = getState();
        let next = offset + num 
        return fetch(`http://localhost:3001/countries?offset=${next}`)
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: NEXT_PAGE,
                payload: {page: json, offset: next}
            })
        })
    }
}

export function prevPage(num) {
    return function (dispatch, getState) {
        const {offset} = getState();
        let prev = offset - num 
        return fetch(`http://localhost:3001/countries?offset=${prev}`)
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: PREV_PAGE,
                payload: {page: json, offset: prev}
            })
        })
    }
}

