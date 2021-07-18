export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
// export const FIND_COUNTRY = "FIND_COUNTRY";

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

// export function searchCountry(name){
//     return async function(dispatch){
//       const response = await fetch(`http://localhost:3001/countries?name=${name}`);
//         const json = await response.json();
//         dispatch({
//             type: FIND_COUNTRY,
//             payload: json
//         });
//     }
//   }
