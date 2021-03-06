export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const GET_COUNTRY_NAME = "GET_COUNTRY_NAME"
export const ORDER_BY = "ODER_BY";
const URL_DEPLOY = process.env.REACT_APP_DEPLOY

export const getAllCountries = () => {
    return async function(dispatch){
      const response = await fetch(`${URL_DEPLOY}/countries`);
      const json = await response.json();
      dispatch({
          type: GET_ALL_COUNTRIES,
          payload: json
      });
    }
}

export function findIdCountry(id) {
    return function (dispatch) {
      return fetch(`${URL_DEPLOY}/countries/${id}`)
      .then(response => response.json())
        .then(json => {
          dispatch({
              type: GET_COUNTRY_DETAIL,
              payload: json
          });
      })
    }
}

export function findNameCountry(name) {
    return function (dispatch) {
      return fetch(`${URL_DEPLOY}/countries?name=${name}`)
      .then(response => response.json())
        .then(json => {
          dispatch({
              type: GET_COUNTRY_NAME,
              payload: json
          });
      })
    }
}

export function orderBy(continent, order, tourism) {
    return function (dispatch) {
      dispatch({
        type: ORDER_BY,
        payload: {continent, order, tourism}
      });
    }
}
